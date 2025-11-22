import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import animations from '../../data/animations.json';

// Simple live previews (you can expand these)
const Previews = {
  1: () => (
    <h1 className="text-6xl font-black">
      {'GSAP'.split('').map((l, i) => (
        <span key={i} className="letter inline-block text-cyan-400" style={{ display: 'inline-block' }}>
          {l}
        </span>
      ))}
    </h1>
  ),
  2: () => (
    <div className="w-64 h-64 perspective-1000">
      <div className="flip-card w-full h-full">
        <div className="flip-card-inner relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center text-4xl font-bold">
            FRONT
          </div>
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-600 to-orange-600 rounded-2xl flex items-center justify-center text-4xl font-bold rotate-y-180">
            BACK
          </div>
        </div>
      </div>
    </div>
  ),
  3: () => (
    <button className="magnetic-btn px-10 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-xl font-bold shadow-2xl">
      Magnetic Button
    </button>
  ),
  4: () => <div className="w-80 h-80 bg-gradient-to-br from-purple-800 to-black rounded-3xl box">PIN ME</div>,
  5: () => (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <path id="path1" d="M50,100 Q100,20 150,100 T150,100" fill="none" stroke="#00ffff" strokeWidth="8"/>
    </svg>
  ),
};

export default function Animation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef();
  const cardRef = useRef();
  const animation = animations.find(a => a.id === parseInt(id));
  const Preview = Previews[animation?.id] || (() => <div>No Preview</div>);

  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    )
    .from(cardRef.current, { scale: 0.8, rotation: -10, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.7');

    // Live preview animations
    if (animation.id === 1) {
      gsap.fromTo('.letter', { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', repeat: -1, repeatDelay: 2
      });
    }
    if (animation.id === 2) {
      gsap.to('.flip-card-inner', { rotationY: 180, duration: 6, repeat: -1, ease: 'none' });
    }
    if (animation.id === 3) {
      const btn = document.querySelector('.magnetic-btn');
      btn?.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: 'power3.out' });
      });
      btn?.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.8 }));
    }
  }, [animation]);

  const copyCode = () => {
    navigator.clipboard.writeText(animation.code);
    alert('Copied!');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <button
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 px-6 py-3 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition"
      >
        Back
      </button>

      <div className="max-w-7xl mx-auto pt-32 px-8">
        <div ref={cardRef} className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            {animation.name}
          </h1>
          <p className="text-2xl text-gray-400">{animation.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Live Preview */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold mb-8 text-cyan-400">Live Preview</h2>
            <div className="min-h-96 flex items-center justify-center bg-black/60 rounded-2xl">
              <Preview />
            </div>
          </div>

          {/* Code */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-purple-400">GSAP Code</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <SyntaxHighlighter language="javascript" style={tomorrow}>
                {animation.code}
              </SyntaxHighlighter>
            </div>
            <button
              onClick={copyCode}
              className="mt-8 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold hover:scale-110 transition duration-300"
            >
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}