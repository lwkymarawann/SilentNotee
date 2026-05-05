import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(0, { stiffness: 100, damping: 28 });
  const springY = useSpring(0, { stiffness: 100, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX - 20); // offset by half the size of large circle
      springY.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-expand]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [springX, springY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[8px] h-[8px] bg-primary rounded-full pointer-events-none z-[100]"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          boxShadow: "0 0 10px rgba(201,169,110,0.8)"
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[40px] h-[40px] border border-primary/30 rounded-full pointer-events-none z-[99] bg-primary/10"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          filter: isHovering ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}