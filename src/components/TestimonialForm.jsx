import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Quote, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { resizeAndCompressImage } from '../utils/image';
import '../styles/TestimonialForm.css';

// Public "leave a recommendation" form. Submissions are stored with
// approved:false and only appear in the carousel after the owner approves
// them in /admin.
export default function TestimonialForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', message: '', avatar: '' });
  const [busy, setBusy] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const base64 = await resizeAndCompressImage(file, 150, 150, 0.7);
      setForm((prev) => ({ ...prev, avatar: base64 }));
      toast.success('Photo processed successfully');
    } catch (err) {
      console.error(err);
      toast.error('Photo processing failed');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim() || busy) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'testimonials'), {
        name: form.name.trim().slice(0, 80),
        role: form.role.trim().slice(0, 120),
        message: form.message.trim().slice(0, 1000),
        avatar: form.avatar.trim(),
        approved: false,
        createdAt: serverTimestamp(),
      });
      toast.success('Thank you! Your recommendation is pending review.');
      setForm({ name: '', role: '', message: '', avatar: '' });
      setOpen(false);
    } catch (err) {
      console.error('Testimonial submit failed:', err);
      toast.error("Couldn't submit right now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <div className="testimonial-cta">
        <button className="btn btn-outline" onClick={() => setOpen(true)}>
          <Quote size={16} /> Leave a recommendation
        </button>
      </div>
    );
  }

  return (
    <form className="testimonial-form" onSubmit={submit}>
      <h4>Leave a recommendation</h4>
      <div className="tf-row">
        <input name="name" placeholder="Your name *" value={form.name} onChange={change} maxLength={80} required />
        <input name="role" placeholder="Role / Company" value={form.role} onChange={change} maxLength={120} />
      </div>
      <div className="tf-file-upload-block">
        <label className="tf-file-label">
          <span>{uploadingAvatar ? 'Processing Photo…' : 'Upload Photo (Optional)'}</span>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>
        {form.avatar && (
          <div className="tf-avatar-preview-wrapper">
            <img src={form.avatar} alt="Avatar preview" className="tf-avatar-preview" />
          </div>
        )}
      </div>
      <textarea
        name="message"
        placeholder="What was it like working with Shagun? *"
        value={form.message}
        onChange={change}
        rows={4}
        maxLength={1000}
        required
      />
      <div className="tf-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Cancel</button>
        <button type="submit" className="btn btn-primary btn-sm" disabled={busy || uploadingAvatar}>
          {busy ? 'Submitting…' : <>Submit <Send size={14} /></>}
        </button>
      </div>
      <p className="tf-note">Your recommendation appears after a quick review.</p>
    </form>
  );
}
