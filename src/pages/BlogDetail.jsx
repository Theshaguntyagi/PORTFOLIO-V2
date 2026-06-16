import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Eye, Heart, Sparkles, List } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { db } from '../firebase';
import { geminiGenerate, geminiConfigured } from '../services/api';
import BlogComments from '../components/BlogComments';
import '../styles/BlogDetail.css';

const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const childText = (children) =>
  React.Children.toArray(children).map((c) => (typeof c === 'string' ? c : '')).join('');

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

  // Table of contents from the markdown's ## / ### headings.
  const toc = useMemo(() => {
    const md = blog?.readMoreContent || '';
    const items = [];
    md.split('\n').forEach((line) => {
      const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line.trim());
      if (m) items.push({ level: m[1].length, text: m[2], id: slugify(m[2]) });
    });
    return items;
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

        const ref = doc(db, 'blogs', id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const blogData = { id: snap.id, ...snap.data() };
          setBlog(blogData);
          setLikes(blogData.likes || 0);
          setLiked(localStorage.getItem(`liked-${id}`) === '1');

          // Count a view once per browser session per post.
          const viewKey = `viewed-${id}`;
          if (!sessionStorage.getItem(viewKey)) {
            sessionStorage.setItem(viewKey, '1');
            updateDoc(ref, { views: increment(1) }).catch(() => {});
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

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((n) => n + 1);
    localStorage.setItem(`liked-${id}`, '1');
    try {
      await updateDoc(doc(db, 'blogs', id), { likes: increment(1) });
    } catch {
      // Roll back optimistic UI if the write fails.
      setLiked(false);
      setLikes((n) => Math.max(0, n - 1));
      localStorage.removeItem(`liked-${id}`);
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
              {blog.createdAt && (
                <motion.span 
                  className="meta-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar size={16} />
                  {formatDate(blog.createdAt)}
                </motion.span>
              )}
              {blog.readTime && (
                <motion.span 
                  className="meta-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <Clock size={16} />
                  {blog.readTime} min read
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
              <motion.button
                className="share-btn"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Share this post"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      url: window.location.href
                    });
                  }
                }}
              >
                <Share2 size={16} />
              </motion.button>
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
            <ReactMarkdown
              components={{
                h2: ({ children }) => <h2 id={slugify(childText(children))}>{children}</h2>,
                h3: ({ children }) => <h3 id={slugify(childText(children))}>{children}</h3>,
              }}
            >
              {blog.readMoreContent || ''}
            </ReactMarkdown>
          </motion.div>

          {/* Comments */}
          <BlogComments blogId={id} />

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