import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { db } from '../firebase';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <motion.div 
          className="blog-detail-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading blog post...
          </motion.p>
        </motion.div>
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
              <motion.button
                className="share-btn"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
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
            {blog.readMoreContent}
          </motion.div>

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