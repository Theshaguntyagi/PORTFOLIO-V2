import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import '../styles/Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'newsletter'), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });
      toast.success('Subscribed! Thanks for joining.');
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup failed:', err);
      toast.error("Couldn't subscribe right now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="newsletter" onSubmit={subscribe}>
      <h4 className="newsletter-title">
        <Mail size={16} /> Stay in the loop
      </h4>
      <p className="newsletter-sub">New posts &amp; updates — no spam.</p>
      <div className="newsletter-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
        />
        <button type="submit" disabled={!valid || busy} aria-label="Subscribe">
          <Send size={16} />
        </button>
      </div>
    </form>
  );
}
