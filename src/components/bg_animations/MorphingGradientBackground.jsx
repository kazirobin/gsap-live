import gsap from "gsap";
import { useEffect, useRef } from "react";

const MorphingGradientBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const gradients = [
  "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",  // Deep → Indigo
  "linear-gradient(135deg, #0f172a 0%, #0d5038 100%)",  // Deep → Emerald
  "linear-gradient(135deg, #1e293b 0%, #1e3a8a 100%)",  // Slate → Navy
  "linear-gradient(135deg, #1e293b 0%, #1e40af 100%)",  // Slate → Blue
  "linear-gradient(135deg, #0f172a 0%, #5b21b6 100%)",  // Deep → Violet
];
    let currentGradient = 0;

    const timeline = gsap.timeline({ repeat: -1 });

    gradients.forEach((gradient, index) => {
      timeline.to(backgroundRef.current, {
        background: gradient,
        duration: 5,
        ease: "sine.inOut",
      });
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    />
  );
};
export default MorphingGradientBackground;


// Add slight delay or stagger between changes
// Or use onUpdate to trigger other effects
// Or make it pause on hover, etc.