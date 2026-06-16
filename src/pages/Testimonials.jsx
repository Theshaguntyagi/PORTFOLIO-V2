import React, { useState, useEffect, useCallback } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import TestimonialForm from '../components/TestimonialForm';
import '../styles/Testimonials.css';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    id: 0,
    testimonial:
      "Shagun's work on our IoT project was exceptional. The solution was innovative and perfectly executed.",
    by: 'Rajesh Kumar, CTO at TechVision',
    imgSrc: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 1,
    testimonial:
      'Outstanding Python developer with deep knowledge of cloud platforms. Highly recommend!',
    by: 'Priya Sharma, Lead Engineer',
    imgSrc:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    testimonial:
      'Working with Shagun was a pleasure. His full-stack expertise made our project a success.',
    by: 'Amit Patel, Product Manager',
    imgSrc:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    testimonial:
      'Excellent problem-solving skills and attention to detail. Delivered beyond expectations.',
    by: 'Neha Verma, Tech Lead',
    imgSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 4,
    testimonial:
      "Shagun's AWS expertise helped us scale our infrastructure seamlessly. Great work!",
    by: 'Vikram Singh, DevOps Lead',
    imgSrc:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 5,
    testimonial:
      'Professional, knowledgeable, and always delivers on time. A true asset to any team.',
    by: 'Sneha Reddy, Engineering Manager',
    imgSrc:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 6,
    testimonial:
      'His data analytics skills with PowerBI transformed our business insights.',
    by: 'Rahul Mehta, Data Analyst',
    imgSrc: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 7,
    testimonial:
      'Creative solutions and excellent communication throughout the project lifecycle.',
    by: 'Kavita Joshi, Project Lead',
    imgSrc: 'https://i.pravatar.cc/150?img=8'
  }
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <Motion.div
      onClick={() => handleMove(position)}
      className={`testimonial-card ${isCenter ? 'is-center' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: `calc(-50% + ${(cardSize / 1.5) * position}px)`,
        y: isCenter
          ? 'calc(-50% - 65px)'
          : position % 2
          ? 'calc(-50% + 15px)'
          : 'calc(-50% - 15px)',
        rotate: isCenter ? 0 : position % 2 ? 2.5 : -2.5
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={!isCenter ? { scale: 1.05 } : {}}
      style={{ width: cardSize, height: cardSize }}
    >
      <img
        src={testimonial.imgSrc}
        alt={`Photo of ${testimonial.by.split(',')[0]}`}
        className="testimonial-img"
      />
      <h3 className="testimonial-quote">"{testimonial.testimonial}"</h3>
      <p className="testimonial-author">- {testimonial.by}</p>
    </Motion.div>
  );
};

const Testimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = useCallback(
    (steps) => {
      const newList = [...testimonialsList];

      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = newList.shift();
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = 0; i < Math.abs(steps); i++) {
          const item = newList.pop();
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      setTestimonialsList(newList);
    },
    [testimonialsList]
  );

  useEffect(() => {
    const updateSize = () => {
      const isSmall = window.matchMedia('(max-width: 640px)').matches;
      setCardSize(isSmall ? 290 : 365);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Pull APPROVED visitor-submitted recommendations and append them.
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'testimonials'), where('approved', '==', true))
        );
        const fetched = snap.docs.map((d) => {
          const x = d.data();
          return {
            id: 'fs-' + d.id,
            testimonial: x.message,
            by: x.role ? `${x.name}, ${x.role}` : x.name,
            imgSrc:
              x.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(x.name || '?')}&background=7c3aed&color=fff`,
          };
        });
        if (fetched.length) setTestimonialsList((prev) => [...prev, ...fetched]);
      } catch (e) {
        console.error('Load testimonials failed:', e);
      }
    })();
  }, []);

  return (
    <Motion.div className="testimonials-page">
      {/* Cards */}
      <div className="testimonials-stage">
        {testimonialsList.map((testimonial, index) => {
          const centerIndex = Math.floor(testimonialsList.length / 2);
          const position = index - centerIndex;
          if (Math.abs(position) > 3) return null;

          return (
            <TestimonialCard
              key={testimonial.tempId || testimonial.id}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
      </div>

      {/* Arrows */}
      <div className="testimonials-nav">
        <button onClick={() => handleMove(-1)} aria-label="Previous testimonial">
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => handleMove(1)} aria-label="Next testimonial">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Visitor-submitted recommendation form */}
      <TestimonialForm />
    </Motion.div>
  );
};

export default Testimonials;
