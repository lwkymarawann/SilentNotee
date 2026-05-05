import { useEffect, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";
import heroImg from "@/assets/images/hero.png";
import bottleImg from "@/assets/images/bottle-product.png";

const products = [
  { name: "WARM EMBER", inspiredBy: "Stronger With You" },
  { name: "NIGHT SECRET", inspiredBy: "Scandal By Night" },
  { name: "ECHO", inspiredBy: "YSL Y" },
  { name: "SOUL", inspiredBy: "Libre Intense" },
  { name: "IGNITE", inspiredBy: "Le Male Elixir" },
  { name: "SCARLET", inspiredBy: "L'Interdit Rouge" },
  { name: "CONIACK", inspiredBy: "Angels' Share" },
  { name: "MAGNETIC", inspiredBy: "Ultra Male" },
  { name: "MIDNIGHT AURA", inspiredBy: "Born In Roma Intense" },
  { name: "SAKURA", inspiredBy: "Yara" },
  { name: "SUGAR VELVET", inspiredBy: "Kayali Vanilla 28" },
  { name: "AQUA", inspiredBy: "Le Beau" },
  { name: "RICH", inspiredBy: "Khamrah Lattafa" },
  { name: "STORM", inspiredBy: "Sauvage" }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const marqueeText = "WARM EMBER · NIGHT SECRET · ECHO · SOUL · IGNITE · SCARLET · CONIACK · MAGNETIC · MIDNIGHT AURA · SAKURA · SUGAR VELVET · AQUA · RICH · STORM · ";

function Counter({ end, label, prefix = "", suffix = "" }: { end: number, label: string, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / end));
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-5xl md:text-7xl text-primary font-serif mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm font-sans tracking-widest uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function MagneticButton({ children, testId }: { children: React.ReactNode, testId: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  return (
    <button
      ref={ref}
      data-testid={testId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={createRipple}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="relative overflow-hidden w-full py-3 border border-primary text-primary font-sans text-sm tracking-widest uppercase transition-colors duration-300 hover:bg-primary hover:text-foreground focus:outline-none"
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default function Home() {
  const philosophyText = "We believe luxury should be felt, not gatekept.".split(" ");
  
  return (
    <div className="relative z-10 flex flex-col min-h-screen selection:bg-primary selection:text-primary-foreground">
      
      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[10vw] font-serif tracking-[0.3em] leading-none text-foreground drop-shadow-2xl text-center"
          >
            SILENT NOTE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 text-sm md:text-lg tracking-[0.3em] text-primary font-sans uppercase"
          >
            Luxury Inspired. Locally Priced.
          </motion.p>
        </div>

        {/* Marquee Ticker */}
        <div className="relative z-10 w-full overflow-hidden bg-background/50 border-t border-primary/20 py-3">
          <div className="whitespace-nowrap flex w-[200%] animate-marquee">
            <span className="text-primary font-sans text-sm tracking-[0.2em]">{marqueeText}{marqueeText}</span>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-background flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-wrap justify-center gap-x-3 gap-y-2 mb-12">
          {philosophyText.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.06, duration: 0.8 }}
              className="text-4xl md:text-6xl font-serif text-foreground"
            >
              {word}
            </motion.span>
          ))}
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-muted-foreground font-sans text-lg md:text-xl max-w-xl"
        >
          Every SILENT NOTE fragrance is a tribute — a luxury experience at <span className="text-primary font-medium">350 EGP</span>.
        </motion.p>
      </section>

      {/* Counters Section */}
      <section className="py-20 px-6 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <Counter end={14} label="Fragrances" />
          <Counter end={350} label="EGP Each" />
          <Counter end={100} label="Inspired" suffix="%" />
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.name}
              variants={fadeUpItem}
              className="group relative bg-[rgba(255,255,255,0.03)] border border-[rgba(201,169,110,0.15)] backdrop-blur-md overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] animate-shimmer"
            >
              {/* Bottle image */}
              <div className="flex items-center justify-center pt-8 pb-2 px-6 h-56">
                <img
                  src={bottleImg}
                  alt="Silent Note bottle"
                  className="h-full w-auto object-contain drop-shadow-[0_4px_24px_rgba(201,169,110,0.25)] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              {/* Card content */}
              <div className="relative z-10 flex flex-col flex-1 p-6 pt-2 justify-between border-t border-[rgba(201,169,110,0.1)]">
                <div>
                  <h3 className="text-xl font-serif mb-1 group-hover:text-primary transition-colors duration-300">{product.name}</h3>
                  <p className="text-xs font-sans italic text-foreground/60 group-hover:text-primary/70 transition-colors duration-300">
                    Inspired by {product.inspiredBy}
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-xl text-primary font-serif">350 EGP</div>
                  <MagneticButton testId={`button-add-to-cart-${index}`}>
                    Add to Cart
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Feature Banner */}
      <section className="py-40 px-6 bg-[#0f0f0f] relative border-y border-border text-center">
        <h2 className="text-5xl md:text-8xl font-serif mb-6 text-foreground">One scent. One price.</h2>
        <div className="text-6xl md:text-9xl text-primary font-serif tracking-widest">350 EGP</div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-24 pb-12 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl font-serif tracking-[0.2em] mb-8">SILENT NOTE</h2>
          <div className="w-16 h-px bg-primary mb-8" />
          <p className="text-lg font-serif italic mb-12">Every scent tells a story. Yours starts at 350 EGP.</p>
          <div className="flex gap-6 mb-12">
            <a href="#" data-testid="link-instagram" data-cursor-expand className="p-3 border border-white/20 rounded-full hover:border-primary hover:text-primary transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="https://wa.me/" data-testid="link-whatsapp" data-cursor-expand className="p-3 border border-white/20 rounded-full hover:border-primary hover:text-primary transition-colors">
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
          </div>
          <p className="text-muted-foreground font-sans text-sm mb-4 tracking-widest uppercase">Cairo, Egypt</p>
          <p className="text-white/30 font-sans text-xs">&copy; {new Date().getFullYear()} SILENT NOTE. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/" 
        target="_blank" 
        rel="noreferrer"
        data-testid="button-whatsapp-float"
        data-cursor-expand
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary text-background rounded-full flex items-center justify-center animate-pulse-gold hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} />
      </a>
      
    </div>
  );
}