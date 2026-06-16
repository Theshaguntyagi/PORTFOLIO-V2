import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // Only show success AFTER the write actually succeeds.
      setIsSubmitted(true);
      toast.success('Message sent! I’ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Contact form submit failed:', err);
      const msg = "Couldn't send your message. Please try again or email theshaguntyagi@gmail.com.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationCoords = {
    lat: 28.4799,
    lng: 77.0886
  };

  const contactInfo = [
    {
      icon: <Mail className="contact-info-icon" />,
      title: 'Email',
      value: 'theshaguntyagi@gmail.com',
      link: 'mailto:theshaguntyagi@gmail.com'
    },
    {
      icon: <Phone className="contact-info-icon" />,
      title: 'Phone',
      value: '+91 8445692029',
      link: 'tel:+918445692029'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="social-icon-svg" />,
      url: 'https://github.com/theshaguntyagi',
      label: 'GitHub'
    },
    {
      icon: <Linkedin className="social-icon-svg" />,
      url: 'https://linkedin.com/in/theshaguntyagi',
      label: 'LinkedIn'
    },
    {
      icon: <Twitter className="social-icon-svg" />,
      url: 'https://twitter.com/shaguntyagi',
      label: 'Twitter'
    }
  ];

  return (
    <div className="contact-page section section-lg">
      <div className="container">

        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </div>

        <div className="contact-grid">

          <div className="contact-info-section">
            <div className="contact-info-cards">

              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="contact-info-card card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-content">
                    <div className="contact-icon-wrapper">
                      {info.icon}
                    </div>
                    <h4 className="contact-title">{info.title}</h4>

                    {info.link ? (
                      <a href={info.link} className="contact-value">
                        {info.value}
                      </a>
                    ) : (
                      <p className="contact-value">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="contact-info-card location-card card">
                <div className="map-container">
                  <iframe
                    title="Location Map"
                    src={`https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div className="map-overlay">
                    <div className="map-info">
                      <div className="contact-icon-wrapper">
                        <MapPin className="contact-info-icon" />
                      </div>
                      <h4 className="contact-title">Location</h4>
                      <p className="contact-value">
                        Delhi, India
                      </p>

                      <a
                        href={`https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="social-links-card card">
              <div className="card-content">
                <h4 className="social-title">Connect With Me</h4>

                <a
                  href={import.meta.env.VITE_CALENDLY_URL || 'mailto:theshaguntyagi@gmail.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginBottom: '1.25rem' }}
                >
                  <Calendar className="btn-icon-left" />
                  <span>Book a Call</span>
                </a>

                <div className="social-links-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-btn"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="contact-form card">
              <div className="card-content">

                {isSubmitted && (
                  <div className="success-message">
                    <CheckCircle className="success-icon" />
                    <h3 className="success-title">Message Sent!</h3>
                    <p>Thank you for reaching out. I’ll get back to you soon.</p>
                    <button
                      className="btn btn-outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                )}

                {!isSubmitted && (
                  <>
                    <h3 className="form-title">Send Message</h3>

                    {submitError && (
                      <p className="form-error" role="alert" style={{ color: '#ef4444', marginBottom: '1rem' }}>
                        {submitError}
                      </p>
                    )}

                    <form
                      onSubmit={handleSubmit}
                      className="contact-form-fields"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />

                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            Send Message <Send className="btn-icon-right" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
