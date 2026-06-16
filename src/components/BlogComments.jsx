import React, { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../firebase';

// Firestore-backed comments for a blog post. Public post + read; the owner
// moderates (deletes) from /admin. Sorted client-side to avoid a composite index.
export default function BlogComments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(query(collection(db, 'comments'), where('blogId', '==', blogId)));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setComments(list);
    } catch (e) {
      console.error('Load comments failed:', e);
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => { load(); }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || busy) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'comments'), {
        blogId,
        name: name.trim().slice(0, 60),
        message: message.trim().slice(0, 1000),
        createdAt: serverTimestamp(),
      });
      toast.success('Comment posted!');
      setName('');
      setMessage('');
      load();
    } catch (err) {
      console.error('Post comment failed:', err);
      toast.error("Couldn't post your comment. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const fmt = (ts) => {
    if (!ts?.seconds) return '';
    return new Date(ts.seconds * 1000).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  return (
    <section className="blog-comments">
      <h3 className="blog-comments-title">
        <MessageCircle size={18} /> Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      <form className="comment-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
        />
        <textarea
          placeholder="Share your thoughts…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={1000}
          required
        />
        <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
          {busy ? 'Posting…' : <>Post comment <Send size={14} /></>}
        </button>
      </form>

      <div className="comment-list">
        {loading && <p className="comment-empty">Loading comments…</p>}
        {!loading && comments.length === 0 && (
          <p className="comment-empty">Be the first to comment.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar">{(c.name || '?').charAt(0).toUpperCase()}</div>
            <div className="comment-body">
              <div className="comment-head">
                <span className="comment-name">{c.name}</span>
                <span className="comment-date">{fmt(c.createdAt)}</span>
              </div>
              <p className="comment-text">{c.message}</p>
              {c.reply && (
                <div className="comment-reply">
                  <span className="comment-reply-label">↳ Shagun replied</span>
                  <p>{c.reply}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
