import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const text = "SILENT NOTE";
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onComplete, 1000); // Allow time for the overlay fade
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="flex space-x-2">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={
              isFadingOut
                ? { opacity: 0, filter: "blur(20px)" }
                : { opacity: 1, filter: "blur(0px)" }
            }
            transition={
              isFadingOut
                ? {
                    duration: 0.6,
                    delay: Math.abs(text.length / 2 - index) * 0.05, // Stagger outward
                    ease: "easeOut",
                  }
                : {
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }
            }
            className="text-4xl md:text-6xl font-serif tracking-[0.3em] text-foreground"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}