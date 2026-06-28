import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Eye, Heart } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import '../styles/Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(collection(db, 'blogs'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const getMs = (dateVal) => {
        if (!dateVal) return 0;
        if (dateVal.seconds) return dateVal.seconds * 1000;
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? 0 : d.getTime();
      };

      const sorted = data.sort((a, b) => getMs(b.createdAt) - getMs(a.createdAt));
      setBlogs(Array.isArray(sorted) ? sorted : []);
    } catch (error) {
      console.error('❌ Failed to load blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const allTags = ['all', ...new Set(blogs.flatMap(blog => {
    if (typeof blog.tags === 'string') {
      return blog.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    return Array.isArray(blog.tags) ? blog.tags : [];
  }))];

  const filteredBlogs = selectedTag === 'all'
    ? blogs
    : blogs.filter(blog => {
        if (typeof blog.tags === 'string') {
          return blog.tags.split(',').map(tag => tag.trim()).includes(selectedTag);
        }
        return Array.isArray(blog.tags) ? blog.tags.includes(selectedTag) : false;
      });

  const formatDate = (date) => {
    if (!date) return '';
    const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ✅ FIXED: RELATIVE NAVIGATION FOR NESTED ROUTE
  const handleReadMore = (blogId) => {
    navigate(blogId); // <-- THIS IS THE FIX
  };

  if (loading) {
    return (
      <section className="blog-page section section-lg">
        <div className="container">
          <div className="blog-header">
            <h1 className="blog-title">Blog &amp; Articles</h1>
            <p className="blog-subtitle">
              Thoughts, tutorials, and insights on development, AI/ML, and technology
            </p>
          </div>
          <div className="blog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="skeleton-card">
                <div className="skeleton" style={{ height: 200, borderRadius: 0 }} />
                <div style={{ padding: '1.5rem' }}>
                  <div className="skeleton skeleton-line" style={{ width: '40%' }} />
                  <div className="skeleton skeleton-line" style={{ width: '90%', height: '1.2rem' }} />
                  <div className="skeleton skeleton-line" style={{ width: '100%' }} />
                  <div className="skeleton skeleton-line" style={{ width: '80%' }} />
                  <div className="skeleton skeleton-line" style={{ width: '35%', height: '2.4rem', marginTop: '1rem', borderRadius: 50 }} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-page section section-lg">
      <div className="blog-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="container">

        <div className="blog-header">
          <h1 className="blog-title">Blog & Articles</h1>
          <p className="blog-subtitle">
            Thoughts, tutorials, and insights on development, IoT, and technology
          </p>
        </div>

        {allTags.length > 1 && (
          <div className="blog-filters">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`filter-tag ${selectedTag === tag ? 'active' : ''}`}
              >
                {tag === 'all' ? 'All Posts' : tag}
              </button>
            ))}
          </div>
        )}

        <div className="blog-grid">
          {filteredBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className="blog-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {blog.imageUrl && (
                <div className="blog-image">
                  <img src={blog.imageUrl} alt={blog.title} loading="lazy" decoding="async" />
                  <div className="blog-image-overlay"></div>
                </div>
              )}

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">
                    <Calendar size={14} />
                    {formatDate(blog.createdAt)}
                  </span>
                  {blog.readTime && (
                    <span className="blog-read-time">
                      <Clock size={14} />
                      {blog.readTime} min read
                    </span>
                  )}
                  {typeof blog.views === 'number' && (
                    <span className="blog-views">
                      <Eye size={14} />
                      {blog.views}
                    </span>
                  )}
                  {typeof blog.likes === 'number' && (
                    <span className="blog-likes">
                      <Heart size={14} />
                      {blog.likes}
                    </span>
                  )}
                </div>

                <h2 className="blog-card-title">{blog.title}</h2>

                <p className="blog-excerpt">
                  {blog.excerpt}
                </p>

                <button
                  className="blog-read-more"
                  onClick={() => handleReadMore(blog.slug || blog.id)}
                >
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;
