// src/components/ProfessionalBackground.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProfessionalBackground = () => {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Professional color palettes
    const colorPalettes = [
      {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        particles: ['#4facfe', '#00f2fe', '#667eea', '#764ba2']
      },
      {
        primary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        particles: ['#4facfe', '#00f2fe', '#667eea', '#43e97b']
      },
      {
        primary: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        particles: ['#43e97b', '#38f9d7', '#4facfe', '#00f2fe']
      },
      {
        primary: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        particles: ['#fa709a', '#fee140', '#ff6b6b', '#f5576c']
      }
    ];

    let currentPalette = 0;

    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = colorPalettes[currentPalette].particles[
          Math.floor(Math.random() * colorPalettes[currentPalette].particles.length)
        ];
        this.opacity = Math.random() * 0.6 + 0.2;
        this.waveOffset = Math.random() * Math.PI * 2;
      }

      update() {
        // Wave-like motion
        this.waveOffset += 0.02;
        this.x += this.speedX + Math.cos(this.waveOffset) * 0.5;
        this.y += this.speedY + Math.sin(this.waveOffset) * 0.3;

        // Bounce off edges with damping
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -0.9;
          this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -0.9;
          this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        // Fade particles near edges
        const edgeDist = 100;
        this.opacity = Math.min(
          0.8,
          Math.max(0.2,
            Math.min(
              this.x / edgeDist,
              (canvas.width - this.x) / edgeDist,
              this.y / edgeDist,
              (canvas.height - this.y) / edgeDist
            )
          )
        );
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize particles
    const particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Gradient morphing animation
    const gradientTimeline = gsap.timeline({ repeat: -1 });
    
    colorPalettes.forEach((palette, index) => {
      gradientTimeline.to(gradientRef.current, {
        background: palette.primary,
        duration: 8,
        ease: "sine.inOut",
        onStart: () => {
          currentPalette = index;
          // Update particle colors gradually
          particles.forEach(particle => {
            gsap.to(particle, {
              color: palette.particles[
                Math.floor(Math.random() * palette.particles.length)
              ],
              duration: 4,
              ease: "power2.inOut"
            });
          });
        }
      });
    });

    // Mouse interaction
    const mouse = {
      x: undefined,
      y: undefined,
      radius: 150
    };

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Mouse interaction
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            particle.x -= Math.cos(angle) * force * 5;
            particle.y -= Math.sin(angle) * force * 5;
          }
        }

        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = 0.1 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Add subtle noise overlay for texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.99) {
          const noise = Math.random() * 10 - 5;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
        }
      }
      
      ctx.putImageData(imageData, 0, 0);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      gradientTimeline.kill();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 transition-all duration-10000"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      />
      
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 mix-blend-overlay"
      />
      
      {/* Subtle Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)',
          backgroundBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default ProfessionalBackground;