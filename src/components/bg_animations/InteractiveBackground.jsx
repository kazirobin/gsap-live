import gsap from "gsap";
import { useEffect, useRef } from "react";

const InteractiveBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const circles = [];
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"];

    // Create circles
    for (let i = 0; i < 10; i++) {
      const circle = document.createElement("div");
      const size = Math.random() * 100 + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];

      circle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0.15;
        filter: blur(30px);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `;

      backgroundRef.current.appendChild(circle);
      circles.push(circle);
    }

    // Mouse move interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      circles.forEach((circle, index) => {
        gsap.to(circle, {
          x: (x - 50) * (index * 0.1),
          y: (y - 50) * (index * 0.1),
          duration: 2,
          ease: "power2.out",
        });
      });
    };

    // Floating animation
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        rotation: 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      });
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      circles.forEach((circle) => circle.remove());
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

export default InteractiveBackground;
