import React, { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection, addDoc, getDocs, deleteDoc, updateDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { motion as Motion } from 'framer-motion';
import { LogIn, LogOut, Send, Trash2, BookHeart } from 'lucide-react';
import toast from 'react-hot-toast';
import { auth, googleProvider, db, OWNER_EMAIL } from '../firebase';
import SEO from '../components/SEO';
import '../styles/Guestbook.css';

export default function Guestbook() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const isOwner = user?.email === OWNER_EMAIL;

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, 'guestbook'));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setEntries(list);
    } catch (e) {
      console.error('Load guestbook failed:', e);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const signIn = () =>
    signInWithPopup(auth, googleProvider).catch(() => toast.error('Sign-in failed.'));

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user || busy) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        uid: user.uid,
        name: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
        message: message.trim().slice(0, 500),
        createdAt: serverTimestamp(),
      });
      toast.success('Signed the guestbook! 🎉');
      setMessage('');
      load();
    } catch (err) {
      console.error('Guestbook submit failed:', err);
      toast.error("Couldn't post. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, 'guestbook', id));
      load();
    } catch {
      toast.error('Delete failed.');
    }
  };

  const sendReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      await updateDoc(doc(db, 'guestbook', id), { reply: replyText.trim().slice(0, 500) });
      toast.success('Reply posted.');
      setReplyTo(null);
      setReplyText('');
      load();
    } catch {
      toast.error('Reply failed.');
    }
  };

  const fmt = (ts) =>
    ts?.seconds
      ? new Date(ts.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';

  return (
    <section className="guestbook-page section section-lg">
      <SEO title="Guestbook | Shagun Tyagi" desc="Sign Shagun Tyagi's guestbook and leave a note." path="/guestbook" />
      <div className="container">
        <div className="section-title">
          <h2><BookHeart size={26} style={{ verticalAlign: '-4px' }} /> Guestbook</h2>
          <p>Drop a note, say hi, or share some love. 💜</p>
        </div>

        <div className="guestbook-compose">
          {!user ? (
            <button className="btn btn-primary btn-lg" onClick={signIn}>
              <LogIn size={16} /> Sign in with Google to sign
            </button>
          ) : (
            <form className="guestbook-form" onSubmit={submit}>
              <div className="gb-user">
                {user.photoURL && <img src={user.photoURL} alt="" />}
                <span>{user.displayName}</span>
                <button type="button" className="gb-signout" onClick={() => signOut(auth)} aria-label="Sign out">
                  <LogOut size={14} />
                </button>
              </div>
              <textarea
                placeholder="Leave a message…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={500}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? 'Signing…' : <>Sign guestbook <Send size={15} /></>}
              </button>
            </form>
          )}
        </div>

        <div className="guestbook-wall">
          {entries.length === 0 && <p className="gb-empty">No entries yet — be the first to sign! ✍️</p>}
          {entries.map((e, i) => (
            <Motion.div
              key={e.id}
              className="gb-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            >
              <div className="gb-card-head">
                {e.photoURL ? (
                  <img src={e.photoURL} alt="" />
                ) : (
                  <div className="gb-avatar">{(e.name || '?').charAt(0).toUpperCase()}</div>
                )}
                <div>
                  <span className="gb-name">{e.name}</span>
                  <span className="gb-date">{fmt(e.createdAt)}</span>
                </div>
                {(user?.email === OWNER_EMAIL || user?.uid === e.uid) && (
                  <button className="gb-del" onClick={() => remove(e.id)} aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="gb-message">{e.message}</p>

              {e.reply && (
                <div className="comment-reply">
                  <span className="comment-reply-label">↳ Shagun replied</span>
                  <p>{e.reply}</p>
                </div>
              )}

              {isOwner && !e.reply && (
                replyTo === e.id ? (
                  <div className="gb-reply-box">
                    <input
                      value={replyText}
                      onChange={(ev) => setReplyText(ev.target.value)}
                      placeholder="Write a reply…"
                      maxLength={500}
                    />
                    <div className="gb-reply-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => sendReply(e.id)}>Reply</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setReplyTo(null); setReplyText(''); }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button className="gb-reply-btn" onClick={() => { setReplyTo(e.id); setReplyText(''); }}>
                    Reply
                  </button>
                )
              )}
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
