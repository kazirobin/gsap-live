import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router';
import animations from '../../data/animations.json';

export default function Animations() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Stagger entrance
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      }
    );

    // Hover effect
    cardsRef.current.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -20, scale: 1.05, duration: 0.5, ease: 'power3.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
          GSAP Showcase
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {animations.map((anim, i) => (
            <Link
              key={anim.id}
              to={`/animations/${anim.id}`}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/30 to-cyan-900/20 border border-white/10 backdrop-blur-md shadow-2xl cursor-pointer"
              onClick={() => {
                // Full card expand animation before navigating
                gsap.to(el, {
                  scale: 1.1,
                  rotation: 4,
                  duration: 0.6,
                  ease: 'power3.inOut',
                });
              }}
            >
              <div className="p-10 h-80 flex flex-col justify-end relative z-10">
                <h3 className="text-3xl font-bold mb-3">{anim.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{anim.description}</p>
                <span className="text-cyan-400 text-sm font-semibold">{anim.category}</span>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}