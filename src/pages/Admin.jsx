import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, setDoc, doc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import {
  LogOut, Trash2, Plus, ShieldAlert, Mail, Newspaper, MessageSquareQuote,
  FileText, Check, CircleDot, MessageSquare, CornerDownRight, BookHeart, BarChart2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { auth, googleProvider, db, OWNER_EMAIL } from '../firebase';
import Analytics from './Analytics';
import { resizeAndCompressImage } from '../utils/image';
import '../styles/Admin.css';

const EMPTY = { title: '', excerpt: '', readMoreContent: '', imageUrl: '', tags: '', readTime: '' };
const STATUS_OPTIONS = [
  { value: 'available', label: '🟢 Available for opportunities' },
  { value: 'open', label: '🟣 Open to freelance work' },
  { value: 'busy', label: '🟠 Heads-down building' },
  { value: 'hidden', label: '⚫ Hide the badge' },
];

const fmtDate = (ts) =>
  ts?.seconds ? new Date(ts.seconds * 1000).toLocaleString() : '';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [tab, setTab] = useState('blog');

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [comments, setComments] = useState([]);
  const [guestbook, setGuestbook] = useState([]);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [status, setStatus] = useState({ status: 'available', text: '' });

  const isOwner = user?.email === OWNER_EMAIL;

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setAuthReady(true); }), []);

  const loadAll = useCallback(async () => {
    try {
      const sortByDate = (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      const grab = async (name) =>
        (await getDocs(collection(db, name))).docs.map((d) => ({ id: d.id, ...d.data() })).sort(sortByDate);

      const [blogs, c, n, t, cm, gb] = await Promise.all([
        getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')))
          .then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() })))
          .catch(() => []),
        grab('contacts').catch(() => []),
        grab('newsletter').catch(() => []),
        grab('testimonials').catch(() => []),
        grab('comments').catch(() => []),
        grab('guestbook').catch(() => []),
      ]);
      setPosts(blogs);
      setContacts(c);
      setSubscribers(n);
      setTestimonials(t);
      setComments(cm);
      setGuestbook(gb);

      const s = await getDoc(doc(db, 'settings', 'site')).catch(() => null);
      if (s && s.exists()) setStatus({ status: s.data().status || 'available', text: s.data().text || '' });
    } catch (e) {
      console.error('Load admin data failed:', e);
    }
  }, []);

  useEffect(() => { if (isOwner) loadAll(); }, [isOwner, loadAll]);

  const signIn = () => signInWithPopup(auth, googleProvider).catch(() => toast.error('Sign-in failed.'));
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleBlogImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const base64 = await resizeAndCompressImage(file, 800, 600, 0.7);
      setForm((prev) => ({ ...prev, imageUrl: base64 }));
      toast.success('Image processed successfully');
    } catch (err) {
      console.error(err);
      toast.error('Image processing failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // ── Blog ──
  const submitPost = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || saving) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'blogs'), {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        readMoreContent: form.readMoreContent,
        imageUrl: form.imageUrl.trim(),
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        readTime: form.readTime ? Number(form.readTime) : null,
        views: 0, likes: 0,
        createdAt: serverTimestamp(),
      });
      toast.success('Post published!');
      setForm(EMPTY);
      loadAll();
    } catch (err) {
      console.error(err);
      toast.error('Could not save. Check your Firestore rules.');
    } finally {
      setSaving(false);
    }
  };
  const del = async (name, id, label) => {
    if (!window.confirm(`Delete this ${label}?`)) return;
    try { await deleteDoc(doc(db, name, id)); toast.success('Deleted.'); loadAll(); }
    catch { toast.error('Delete failed.'); }
  };

  // ── Testimonials ──
  const approveTestimonial = async (id) => {
    try { await updateDoc(doc(db, 'testimonials', id), { approved: true }); toast.success('Approved — now live.'); loadAll(); }
    catch { toast.error('Approve failed.'); }
  };

  // ── Replies (comments + guestbook) ──
  const sendReply = async (coll, id) => {
    const text = (replyDrafts[id] || '').trim();
    if (!text) return;
    try {
      await updateDoc(doc(db, coll, id), { reply: text.slice(0, 1000) });
      toast.success('Reply posted.');
      setReplyDrafts((d) => ({ ...d, [id]: '' }));
      loadAll();
    } catch { toast.error('Reply failed.'); }
  };

  // ── Status ──
  const saveStatus = async () => {
    try {
      await setDoc(doc(db, 'settings', 'site'), { status: status.status, text: status.text || '', updatedAt: serverTimestamp() }, { merge: true });
      toast.success('Status updated.');
    } catch { toast.error('Could not save status.'); }
  };

  if (!authReady) return <section className="admin-page section"><div className="container" /></section>;

  const pendingT = testimonials.filter((t) => !t.approved);

  const TABS = [
    { id: 'blog', label: 'Blog', icon: FileText, count: posts.length },
    { id: 'messages', label: 'Messages', icon: Mail, count: contacts.length },
    { id: 'newsletter', label: 'Newsletter', icon: Newspaper, count: subscribers.length },
    { id: 'testimonials', label: 'Recommendations', icon: MessageSquareQuote, count: pendingT.length },
    { id: 'comments', label: 'Comments', icon: MessageSquare, count: comments.length },
    { id: 'guestbook', label: 'Guestbook', icon: BookHeart, count: guestbook.length },
    { id: 'status', label: 'Status', icon: CircleDot },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <section className="admin-page section section-lg">
      <div className="container admin-inner">
        <div className="admin-head">
          <h2>Owner Dashboard</h2>
          {user && (
            <button className="btn btn-ghost btn-sm" onClick={() => signOut(auth)}>
              <LogOut size={14} /> Sign out
            </button>
          )}
        </div>

        {!user && (
          <div className="admin-gate">
            <p>Sign in to manage your site.</p>
            <button className="btn btn-primary btn-lg" onClick={signIn}>Sign in with Google</button>
          </div>
        )}

        {user && !isOwner && (
          <div className="admin-gate">
            <ShieldAlert size={40} className="admin-warn" />
            <p>Signed in as <b>{user.email}</b> — not authorized.</p>
            <button className="btn btn-outline" onClick={() => signOut(auth)}>Sign out</button>
          </div>
        )}

        {isOwner && (
          <>
            <div className="admin-tabs">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`admin-tab ${tab === t.id ? 'active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  <t.icon size={15} /> {t.label}
                  {typeof t.count === 'number' && t.count > 0 && <span className="admin-tab-badge">{t.count}</span>}
                </button>
              ))}
            </div>

            {/* BLOG */}
            {tab === 'blog' && (
              <>
                <form className="admin-form" onSubmit={submitPost}>
                  <input name="title" value={form.title} onChange={change} placeholder="Title *" required />
                  <input name="excerpt" value={form.excerpt} onChange={change} placeholder="Excerpt (Short summary shown on listing page) *" required />
                  <div className="admin-file-upload-block">
                    <label className="admin-file-label">
                      <span>{uploadingImage ? 'Processing Cover Image…' : 'Upload Cover Image *'}</span>
                      <input type="file" accept="image/*" onChange={handleBlogImageChange} required={!form.imageUrl} />
                    </label>
                    {form.imageUrl && (
                      <div className="admin-image-preview-wrapper">
                        <img src={form.imageUrl} alt="Blog preview" className="admin-image-preview" />
                      </div>
                    )}
                  </div>
                  <div className="admin-row">
                    <input name="tags" value={form.tags} onChange={change} placeholder="Tags (comma separated)" />
                    <input name="readTime" value={form.readTime} onChange={change} placeholder="Read time (min)" type="number" />
                  </div>
                  <textarea name="readMoreContent" value={form.readMoreContent} onChange={change} rows={8} placeholder="Full content (Markdown supported)" />
                   <button className="btn btn-primary btn-lg" disabled={saving || uploadingImage}>
                    <Plus size={16} /> {saving ? 'Publishing…' : 'Publish Post'}
                  </button>
                </form>
                <h3 className="admin-list-title">Existing posts ({posts.length})</h3>
                <ul className="admin-list">
                  {posts.map((p) => (
                    <li key={p.id}>
                      <span>{p.title}</span>
                      <button className="admin-del" onClick={() => del('blogs', p.id, 'post')} aria-label="Delete post"><Trash2 size={16} /></button>
                    </li>
                  ))}
                  {posts.length === 0 && <li className="admin-empty">No posts yet.</li>}
                </ul>
              </>
            )}

            {/* MESSAGES */}
            {tab === 'messages' && (
              <div className="admin-cards">
                {contacts.length === 0 && <p className="admin-empty">No messages yet.</p>}
                {contacts.map((m) => (
                  <div key={m.id} className="admin-card">
                    <div className="admin-card-head">
                      <strong>{m.name}</strong>
                      <a href={`mailto:${m.email}`}>{m.email}</a>
                      <span className="admin-card-date">{fmtDate(m.createdAt)}</span>
                      <button className="admin-del" onClick={() => del('contacts', m.id, 'message')}><Trash2 size={15} /></button>
                    </div>
                    {m.subject && <p className="admin-card-subj">{m.subject}</p>}
                    <p className="admin-card-msg">{m.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* NEWSLETTER */}
            {tab === 'newsletter' && (
              <ul className="admin-list">
                {subscribers.length === 0 && <li className="admin-empty">No subscribers yet.</li>}
                {subscribers.map((s) => (
                  <li key={s.id}>
                    <span>{s.email}</span>
                    <span className="admin-card-date">{fmtDate(s.createdAt)}</span>
                    <button className="admin-del" onClick={() => del('newsletter', s.id, 'subscriber')}><Trash2 size={15} /></button>
                  </li>
                ))}
              </ul>
            )}

            {/* TESTIMONIALS */}
            {tab === 'testimonials' && (
              <div className="admin-cards">
                <h3 className="admin-list-title">Pending ({pendingT.length})</h3>
                {pendingT.length === 0 && <p className="admin-empty">No pending recommendations.</p>}
                {pendingT.map((t) => (
                  <div key={t.id} className="admin-card">
                    <div className="admin-card-head">
                      <strong>{t.name}</strong>
                      {t.role && <span className="admin-card-role">{t.role}</span>}
                      <span className="admin-card-date">{fmtDate(t.createdAt)}</span>
                    </div>
                    <p className="admin-card-msg">"{t.message}"</p>
                    <div className="admin-card-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => approveTestimonial(t.id)}><Check size={14} /> Approve</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => del('testimonials', t.id, 'recommendation')}><Trash2 size={14} /> Reject</button>
                    </div>
                  </div>
                ))}
                <h3 className="admin-list-title" style={{ marginTop: '1.5rem' }}>
                  Live ({testimonials.filter((t) => t.approved).length})
                </h3>
                <ul className="admin-list">
                  {testimonials.filter((t) => t.approved).map((t) => (
                    <li key={t.id}>
                      <span>{t.name} — "{(t.message || '').slice(0, 50)}…"</span>
                      <button className="admin-del" onClick={() => del('testimonials', t.id, 'recommendation')}><Trash2 size={15} /></button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* COMMENTS */}
            {tab === 'comments' && (
              <div className="admin-cards">
                {comments.length === 0 && <p className="admin-empty">No comments yet.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="admin-card">
                    <div className="admin-card-head">
                      <strong>{c.name}</strong>
                      <span className="admin-card-role">on post {c.blogId}</span>
                      <span className="admin-card-date">{fmtDate(c.createdAt)}</span>
                      <button className="admin-del" onClick={() => del('comments', c.id, 'comment')}><Trash2 size={15} /></button>
                    </div>
                    <p className="admin-card-msg">{c.message}</p>
                    {c.reply ? (
                      <div className="comment-reply">
                        <span className="comment-reply-label">↳ You replied</span>
                        <p>{c.reply}</p>
                      </div>
                    ) : (
                      <div className="admin-reply-box">
                        <input
                          value={replyDrafts[c.id] || ''}
                          onChange={(e) => setReplyDrafts((d) => ({ ...d, [c.id]: e.target.value }))}
                          placeholder="Write a reply…"
                          maxLength={1000}
                        />
                        <button className="btn btn-primary btn-sm" onClick={() => sendReply('comments', c.id)}>
                          <CornerDownRight size={14} /> Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* GUESTBOOK */}
            {tab === 'guestbook' && (
              <div className="admin-cards">
                {guestbook.length === 0 && <p className="admin-empty">No guestbook entries yet.</p>}
                {guestbook.map((g) => (
                  <div key={g.id} className="admin-card">
                    <div className="admin-card-head">
                      <strong>{g.name}</strong>
                      <span className="admin-card-date">{fmtDate(g.createdAt)}</span>
                      <button className="admin-del" onClick={() => del('guestbook', g.id, 'entry')}><Trash2 size={15} /></button>
                    </div>
                    <p className="admin-card-msg">{g.message}</p>
                    {g.reply ? (
                      <div className="comment-reply">
                        <span className="comment-reply-label">↳ You replied</span>
                        <p>{g.reply}</p>
                      </div>
                    ) : (
                      <div className="admin-reply-box">
                        <input
                          value={replyDrafts[g.id] || ''}
                          onChange={(e) => setReplyDrafts((d) => ({ ...d, [g.id]: e.target.value }))}
                          placeholder="Write a reply…"
                          maxLength={500}
                        />
                        <button className="btn btn-primary btn-sm" onClick={() => sendReply('guestbook', g.id)}>
                          <CornerDownRight size={14} /> Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* STATUS */}
            {tab === 'status' && (
              <div className="admin-status">
                <h3 className="admin-list-title">Availability badge</h3>
                <p className="admin-hint">Shown on your homepage hero.</p>
                <label className="admin-field">
                  <span>Status</span>
                  <select value={status.status} onChange={(e) => setStatus((s) => ({ ...s, status: e.target.value }))}>
                    {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </label>
                <label className="admin-field">
                  <span>Custom text (optional)</span>
                  <input
                    value={status.text}
                    onChange={(e) => setStatus((s) => ({ ...s, text: e.target.value }))}
                    placeholder="Leave blank for the default text"
                    maxLength={60}
                  />
                </label>
                <button className="btn btn-primary" onClick={saveStatus}>Save status</button>
              </div>
            )}

            {/* ANALYTICS */}
            {tab === 'analytics' && (
              <Analytics isNested={true} />
            )}
          </>
        )}
      </div>
    </section>
  );
}
