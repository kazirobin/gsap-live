import gsap from "gsap";
import { useEffect, useRef } from "react";

const MorphingGradientBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
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
