import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
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

      const q = query(
        collection(db, 'blogs'),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setBlogs(Array.isArray(data) ? data : []);
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

  if (loading) return null;

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
                  <img src={blog.imageUrl} alt={blog.title} />
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
                </div>

                <h2 className="blog-card-title">{blog.title}</h2>

                <p className="blog-excerpt">
                  {blog.excerpt}
                </p>

                <button
                  className="blog-read-more"
                  onClick={() => handleReadMore(blog.id)}
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
