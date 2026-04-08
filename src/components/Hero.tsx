import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  loading: boolean;
}

export default function Hero({ loading }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

      // Parallax for orbs
      gsap.to(".floating-orb", {
        y: (i, target) => -target.dataset.speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20"
      id="home"
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/20 to-background/50" />

      {/* Floating Orbs */}
      <div
        data-speed="2"
        className="floating-orb absolute top-1/4 left-1/4 z-[2] h-32 w-32 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        data-speed="4"
        className="floating-orb absolute top-1/2 right-1/4 z-[2] h-48 w-48 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        data-speed="1.5"
        className="floating-orb absolute bottom-1/4 left-1/3 z-[2] h-40 w-40 rounded-full bg-primary/15 blur-3xl"
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <h1
            ref={headlineRef}
            className="font-display mb-6 text-5xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl"
          >
            Hi, I'm <span className="glow-purple text-primary">Rudra</span>
            <br />
            <span className="text-white/90">Developer</span>
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl"
          >
            Crafting immersive digital experiences with cutting-edge technologies.
            Specialized in high-performance web applications and 3D interactions.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-primary"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </a>
    </section>
  );
}
