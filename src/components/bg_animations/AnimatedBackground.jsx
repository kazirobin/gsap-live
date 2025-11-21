import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const shapes = [];
    const colors = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#43e97b"];

    // Create floating shapes
    for (let i = 0; i < 15; i++) {
      const shape = document.createElement("div");
      const size = Math.random() * 100 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];

      shape.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? "50%" : "20%"};
        opacity: ${Math.random() * 0.3 + 0.1};
        filter: blur(${Math.random() * 20 + 5}px);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;

      backgroundRef.current.appendChild(shape);
      shapes.push(shape);
    }

    // Animate shapes
    shapes.forEach((shape, index) => {
      const timeline = gsap.timeline({ repeat: -1, yoyo: true });

      timeline
        .to(shape, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: Math.random() * 360,
          duration: Math.random() * 10 + 10,
          ease: "sine.inOut",
          delay: index * 0.5,
        })
        .to(
          shape,
          {
            scale: Math.random() * 0.5 + 0.8,
            duration: Math.random() * 5 + 5,
            ease: "power1.inOut",
          },
          0
        );
    });

    return () => {
      shapes.forEach((shape) => shape.remove());
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    />
  );
};

export default AnimatedBackground;
