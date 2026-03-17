import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const RotatingText3D = () => {
  const roles = ["Problem Solver", "AI/ML Enthusiast", "Developer", "Full Stack Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setKey(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleClick = () => {
    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    setKey(prev => prev + 1);
  };

  const currentRole = roles[currentRoleIndex];
  const letters = currentRole.split('');

  return (
    <div className="text-xl md:text-2xl max-w-full mx-auto cursor-pointer text-left" onClick={handleRoleClick} style={{ perspective: "1000px" }}>
      <div className="relative inline-block whitespace-nowrap">
        <div className="inline-block">
          <AnimatePresence mode="wait">
            <motion.div key={key} className="inline-block whitespace-nowrap" initial="hidden" animate="visible" exit="exit">
              {letters.map((letter, index) => (
                <motion.span
                  key={`${key}-${index}`}
                  className="text-cyan-600 dark:text-cyan-400 font-semibold inline-block"
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center center", backfaceVisibility: "hidden" }}
                  variants={{
                    hidden: { rotateY: 90, opacity: 0 },
                    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.5, delay: index * 0.06, ease: "easeOut" } },
                    exit: { rotateY: -90, opacity: 0, transition: { duration: 0.4, delay: index * 0.04, ease: "easeIn" } }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RotatingText3D;
