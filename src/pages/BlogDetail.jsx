import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment, query, collection, where, limit, getDocs } from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Eye, Heart, Sparkles, List, Linkedin, Link } from 'lucide-react';
import toast from 'react-hot-toast';
// Async-light build + explicit language registration instead of `Prism` (which
// bundles ~200 languages, ~600KB) — this is the single biggest contributor to
// the oversized BlogDetail chunk. Add a `SyntaxHighlighter.registerLanguage`
// call below if a post ever needs a language not listed here.
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', jsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('yaml', yaml);
import ReactMarkdown from 'react-markdown';
import { autoLinkText } from '../utils/internalLinks';
import { db } from '../firebase';
import { geminiGenerate, geminiConfigured } from '../services/api';
import BlogComments from '../components/BlogComments';
import '../styles/BlogDetail.css';

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const childText = (children) =>
  React.Children.toArray(children).map((c) => (typeof c === 'string' ? c : '')).join('');

// Wraps a fenced code block with a copy-to-clipboard button, reusing the same
// visual language as the existing share/copy-link button (.share-icon-btn.copy-btn)
// so it matches the site's established pattern rather than introducing a new one.
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Failed to copy code.');
    }
  };

  return (
    <div className="code-block-wrapper">
      <button
        type="button"
        className="code-copy-btn"
        onClick={handleCopy}
        aria-label="Copy code"
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter PreTag="div" language={language} style={oneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  // New CMS states
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  // Table of contents from the markdown's ## / ### headings.
  // Tracks which project names have already been auto-linked so only the
  // FIRST mention of each project in the whole post becomes a link — resets
  // whenever a different post loads.
  const linkedTermsRef = useRef(new Set());
  useMemo(() => { linkedTermsRef.current = new Set(); }, [blog?.id]);

  const toc = useMemo(() => {
    const md = blog?.readMoreContent || '';
    const items = [];
    md.split('\n').forEach((line) => {
      const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line.trim());
      if (m) items.push({ level: m[1].length, text: m[2], id: slugify(m[2]) });
    });
    return items;
  }, [blog]);

  // Falls back to a word-count estimate (200 wpm, the commonly-cited average
  // for technical reading) when the post has no manually-entered readTime —
  // previously the "X min read" meta item just silently disappeared for any
  // post the admin didn't fill that field in for.
  const estimatedReadTime = useMemo(() => {
    if (blog?.readTime) return blog.readTime;
    const text = blog?.readMoreContent || '';
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words === 0) return null;
    return Math.max(1, Math.round(words / 200));
  }, [blog]);

  // Reading-progress bar.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [blog]);

  const handleTldr = async () => {
    if (summarizing) return;
    if (summary) { setSummary(''); return; } // toggle off
    setSummarizing(true);
    try {
      const text = (blog.readMoreContent || blog.excerpt || '').slice(0, 6000);
      const out = await geminiGenerate(
        `Write a concise TL;DR (2-3 sentences, plain text, no markdown) of this blog post:\n\n${text}`
      );
      setSummary(out || 'No summary available.');
    } catch {
      setSummary('Could not generate a summary right now. Please try again later.');
    } finally {
      setSummarizing(false);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        let blogData = null;
        let docRef = null;

        // 1. Try fetching by Document ID
        const ref = doc(db, 'blogs', id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          blogData = { id: snap.id, ...snap.data() };
          docRef = ref;
        } else {
          // 2. Fallback: Try fetching by Slug
          const q = query(collection(db, 'blogs'), where('slug', '==', id), limit(1));
          const qSnap = await getDocs(q);
          if (!qSnap.empty) {
            const docSnap = qSnap.docs[0];
            blogData = { id: docSnap.id, ...docSnap.data() };
            docRef = docSnap.ref;
          }
        }

        if (blogData) {
          setBlog(blogData);
          setLikes(blogData.likes || 0);
          setLiked(localStorage.getItem(`liked-${blogData.id}`) === '1');

          // Count a view once per browser session per post.
          const viewKey = `viewed-${blogData.id}`;
          if (!sessionStorage.getItem(viewKey)) {
            sessionStorage.setItem(viewKey, '1');
            updateDoc(docRef, { views: increment(1) }).catch(() => {});
          }
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Dynamic Metadata and JSON-LD Schema Injection
  useEffect(() => {
    if (blog) {
      // Clean up previous schemas
      const existing = document.querySelectorAll('script[data-schema="blog"]');
      existing.forEach(el => el.remove());

      const canonicalUrl = `https://shaguntyagi.tech/blog/${blog.slug || blog.id}`;

      const schemasToInject = [];
      if (blog.schemas) {
        if (blog.schemas.blogPosting) schemasToInject.push(blog.schemas.blogPosting);
        if (blog.schemas.article) schemasToInject.push(blog.schemas.article);
        if (blog.schemas.breadcrumbs) schemasToInject.push(blog.schemas.breadcrumbs);
        if (blog.schemas.faq) schemasToInject.push(blog.schemas.faq);
      }
      // Fallback BreadcrumbList when the post wasn't authored with one in Admin.
      if (!blog.schemas?.breadcrumbs) {
        schemasToInject.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://shaguntyagi.tech/" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://shaguntyagi.tech/blog" },
            { "@type": "ListItem", position: 3, name: blog.title, item: canonicalUrl },
          ],
        });
      }
      // Speakable — lets voice assistants read the title + excerpt.
      schemasToInject.push({
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: canonicalUrl,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".blog-detail-title"],
        },
      });

      if (schemasToInject.length > 0) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'blog');
        script.text = JSON.stringify(schemasToInject.length === 1 ? schemasToInject[0] : {
          "@context": "https://schema.org",
          "@graph": schemasToInject
        });
        document.head.appendChild(script);
      }

      // Update Meta Tags
      document.title = blog.seo?.metaTitle || blog.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', blog.seo?.metaDescription || blog.excerpt || '');
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', blog.seo?.metaTitle || blog.title);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', blog.seo?.metaDescription || blog.excerpt || '');
      
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', blog.social?.ogImage || blog.imageUrl || '');
      
      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute('content', blog.social?.twitterImage || blog.imageUrl || '');

      // BUG FIX: canonical link was never updated here, so every blog post
      // inherited the static index.html canonical (the homepage URL). That
      // told Google every post was a duplicate of "/", which can suppress
      // individual posts from ranking entirely. Also clear any stale
      // noindex a previous route (e.g. /admin) may have left behind.
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl);

      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large');
    }
    return () => {
      const existing = document.querySelectorAll('script[data-schema="blog"]');
      existing.forEach(el => el.remove());
      // Restore the default canonical/robots so navigating away (e.g. to a
      // page with no per-route override yet) doesn't leak this post's URL.
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) canonicalLink.setAttribute('href', 'https://shaguntyagi.tech/');
    };
  }, [blog]);

  // Fetch Related, Previous, and Next Articles
  useEffect(() => {
    const fetchRelatedAndNav = async () => {
      if (!blog) return;

      // 1. Related Posts — manual links from Admin take priority; if none were
      // set, fall back to an algorithmic match by shared tags (same collection,
      // scored by tag overlap, excluding the current post), so posts published
      // without manual linking still get related content.
      if (blog.links?.relatedArticles?.length > 0) {
        try {
          const fetched = await Promise.all(
            blog.links.relatedArticles.slice(0, 3).map(async (relatedId) => {
              const snap = await getDoc(doc(db, 'blogs', relatedId));
              return snap.exists() ? { id: snap.id, ...snap.data() } : null;
            })
          );
          setRelatedPosts(fetched.filter(Boolean));
        } catch (e) {
          console.error("Failed fetching related posts:", e);
        }
      } else {
        try {
          const parseTags = (t) =>
            typeof t === 'string' ? t.split(',').map((x) => x.trim()).filter(Boolean)
              : Array.isArray(t) ? t : [];
          const currentTags = parseTags(blog.tags);

          if (currentTags.length > 0) {
            const snapshot = await getDocs(collection(db, 'blogs'));
            const scored = snapshot.docs
              .filter((d) => d.id !== blog.id)
              .map((d) => {
                const data = d.data();
                const tags = parseTags(data.tags);
                const overlap = tags.filter((t) => currentTags.includes(t)).length;
                return { id: d.id, ...data, __overlap: overlap };
              })
              .filter((p) => p.__overlap > 0)
              .sort((a, b) => b.__overlap - a.__overlap)
              .slice(0, 3);
            setRelatedPosts(scored);
          } else {
            setRelatedPosts([]);
          }
        } catch (e) {
          console.error("Failed computing algorithmic related posts:", e);
          setRelatedPosts([]);
        }
      }

      // 2. Nav Posts
      try {
        if (blog.links?.previousArticle) {
          const snap = await getDoc(doc(db, 'blogs', blog.links.previousArticle));
          if (snap.exists()) setPrevPost({ id: snap.id, ...snap.data() });
        } else {
          setPrevPost(null);
        }

        if (blog.links?.nextArticle) {
          const snap = await getDoc(doc(db, 'blogs', blog.links.nextArticle));
          if (snap.exists()) setNextPost({ id: snap.id, ...snap.data() });
        } else {
          setNextPost(null);
        }
      } catch (e) {
        console.error("Failed fetching navigation posts:", e);
      }
    };

    fetchRelatedAndNav();
  }, [blog]);

  const handleLike = async () => {
    if (liked || !blog) return;
    setLiked(true);
    setLikes((n) => n + 1);
    localStorage.setItem(`liked-${blog.id}`, '1');
    try {
      await updateDoc(doc(db, 'blogs', blog.id), { likes: increment(1) });
    } catch {
      // Roll back optimistic UI if the write fails.
      setLiked(false);
      setLikes((n) => Math.max(0, n - 1));
      localStorage.removeItem(`liked-${blog.id}`);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  if (loading) {
    return (
      <section className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="skeleton" style={{ width: 120, height: 40, borderRadius: 50, marginBottom: '2rem' }} />
          <div className="blog-detail-article">
            <div className="skeleton skeleton-line" style={{ width: '70%', height: '2.5rem', margin: '0 auto 1.5rem' }} />
            <div className="skeleton skeleton-line" style={{ width: '40%', height: '1rem', margin: '0 auto 2rem' }} />
            <div className="skeleton" style={{ width: '100%', height: 320, borderRadius: 16, marginBottom: '2rem' }} />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton skeleton-line" style={{ width: i % 3 === 2 ? '60%' : '100%' }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="blog-detail-page">
        <motion.div 
          className="blog-detail-error"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Oops!</h2>
          <p>{error || 'Blog post not found'}</p>
          <motion.button 
            className="blog-back-btn" 
            onClick={() => navigate('/blog')}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <motion.section 
      className="blog-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Reading progress bar */}
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />

      <div className="blog-detail-background">
        <motion.div 
          className="gradient-blob blob-1"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="gradient-blob blob-2"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="blog-detail-container">
        <motion.button
          className="blog-back-btn"
          onClick={() => navigate('/blog')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} />
          Back to Blog
        </motion.button>

        <motion.article 
          className="blog-detail-article"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header 
            className="blog-detail-header"
            variants={itemVariants}
          >
            <motion.h1 
              className="blog-detail-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {blog.title}
            </motion.h1>

            <motion.div 
              className="blog-detail-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {blog.category && (
                <span className="meta-badge-cat">
                  🏷️ {blog.category}
                </span>
              )}
              {blog.difficulty && (
                <span className={`meta-badge-diff ${blog.difficulty.toLowerCase()}`}>
                  📚 {blog.difficulty}
                </span>
              )}
              {blog.createdAt && (
                <motion.span 
                  className="meta-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar size={16} />
                  {formatDate(blog.createdAt)}
                </motion.span>
              )}
              {estimatedReadTime && (
                <motion.span 
                  className="meta-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock size={16} />
                  {estimatedReadTime} min read
                </motion.span>
              )}
              {typeof blog.views === 'number' && (
                <span className="meta-item">
                  <Eye size={16} /> {blog.views} views
                </span>
              )}
              <motion.button
                className={`like-btn ${liked ? 'liked' : ''}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                aria-label={liked ? 'Liked' : 'Like this post'}
                aria-pressed={liked}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {likes}
              </motion.button>
              <div className="share-group">
                <motion.a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-icon-btn x-btn"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share on X"
                >
                  <XIcon />
                </motion.a>
                <motion.a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-icon-btn linkedin-btn"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={14} />
                </motion.a>
                <motion.button
                  className="share-icon-btn copy-btn"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard! 📋");
                    } catch {
                      toast.error("Failed to copy link.");
                    }
                  }}
                  aria-label="Copy post link"
                  type="button"
                >
                  <Link size={14} />
                </motion.button>
              </div>
            </motion.div>
          </motion.header>

          {/* AI TL;DR */}
          {geminiConfigured() && (
            <div className="blog-tldr">
              <button className="tldr-btn" onClick={handleTldr} disabled={summarizing}>
                <Sparkles size={15} />
                {summarizing ? 'Summarizing…' : summary ? 'Hide TL;DR' : 'TL;DR — summarize with AI'}
              </button>
              {summary && <p className="tldr-text">{summary}</p>}
            </div>
          )}

          {/* Table of contents */}
          {toc.length > 1 && (
            <nav className="blog-toc" aria-label="Table of contents">
              <p className="blog-toc-title"><List size={15} /> On this page</p>
              <ul>
                {toc.map((h) => (
                  <li key={h.id} className={`toc-l${h.level}`}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {blog.imageUrl && (
            <motion.div 
              className="blog-detail-image-wrapper"
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="blog-detail-image"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.div 
                className="image-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}

          <motion.div
            className="blog-detail-content"
            variants={itemVariants}
          >
            {blog.links?.seriesName && (
              <div className="blog-series-badge">
                📖 Part of the <b>{blog.links.seriesName}</b> series
              </div>
            )}
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 id={slugify(childText(children))}>{children}</h2>,
                h3: ({ children }) => <h3 id={slugify(childText(children))}>{children}</h3>,
                p: ({ children }) => {
                  // Only auto-link plain-text paragraphs (a single string
                  // child) — a paragraph with existing bold/italic/links is
                  // left untouched rather than risk mangling nested markdown.
                  if (typeof children !== 'string') return <p>{children}</p>;
                  const parts = autoLinkText(children, linkedTermsRef.current);
                  return (
                    <p>
                      {parts.map((part, i) =>
                        typeof part === 'string' ? (
                          <React.Fragment key={i}>{part}</React.Fragment>
                        ) : (
                          <RouterLink key={i} to={part.path}>{part.term}</RouterLink>
                        )
                      )}
                    </p>
                  );
                },
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <CodeBlock
                      code={String(children).replace(/\n$/, '')}
                      language={match[1]}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {blog.readMoreContent || ''}
            </ReactMarkdown>
          </motion.div>

          {/* Previous / Next Navigation */}
          {(prevPost || nextPost) && (
            <div className="blog-navigation-wrapper">
              {prevPost ? (
                <div className="blog-nav-card prev" onClick={() => navigate(`/blog/${prevPost.slug || prevPost.id}`)}>
                  <span className="blog-nav-label">← Previous Post</span>
                  <span className="blog-nav-title">{prevPost.title}</span>
                </div>
              ) : <div className="blog-nav-spacer" />}
              
              {nextPost ? (
                <div className="blog-nav-card next" onClick={() => navigate(`/blog/${nextPost.slug || nextPost.id}`)}>
                  <span className="blog-nav-label">Next Post →</span>
                  <span className="blog-nav-title">{nextPost.title}</span>
                </div>
              ) : <div className="blog-nav-spacer" />}
            </div>
          )}

          {/* Related Articles list */}
          {relatedPosts.length > 0 && (
            <div className="blog-related-section">
              <h4>Related Articles</h4>
              <div className="blog-related-grid">
                {relatedPosts.map(post => (
                  <div key={post.id} className="blog-related-card" onClick={() => navigate(`/blog/${post.slug || post.id}`)}>
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} loading="lazy" decoding="async" />}
                    <div className="related-card-content">
                      <h5>{post.title}</h5>
                      <span className="related-category">{post.category || 'Development'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {blog.faq && (
            <div className="blog-faq-section">
              <h4>Frequently Asked Questions</h4>
              <div className="blog-faq-list">
                <ReactMarkdown>{blog.faq}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Comments */}
          <BlogComments blogId={blog.id} />

          <motion.div 
            className="blog-detail-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              className="back-to-blogs-btn"
              onClick={() => navigate('/blog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to All Posts
            </motion.button>
          </motion.div>
        </motion.article>
      </div>
    </motion.section>
  );
};

export default BlogDetail;