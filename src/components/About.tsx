import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profilepic, resume } from "../assets";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24"
      id="about"
    >
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Profile Image */}
          <div ref={imageRef} className="relative mx-auto lg:mx-0">
            <div className="relative h-64 w-64 md:h-96 md:w-96">
              {/* Glowing Frame */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-2xl opacity-30" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/10 p-2">
                <div className="h-full w-full overflow-hidden rounded-full bg-background">
                  <img
                    src={profilepic}
                    alt="Rudra Profile"
                    className="h-full w-full object-cover transition-all"
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full border border-primary/50 bg-background/50 backdrop-blur-sm" />
              <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full border border-primary/30 bg-background/50 backdrop-blur-sm" />
            </div>
          </div>

          {/* Bio */}
          <div ref={contentRef}>
            <h2 className="font-display mb-6 text-4xl font-bold text-white md:text-6xl">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              I'm a detail-oriented Software Engineer with experience in optimizing operational processes in high-traffic environments.
              I'm passionate about building high-quality web experiences and bridging the gap between complex backend logic and stunning frontend visuals.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h4 className="text-3xl font-bold text-primary mb-2">2+</h4>
                <p className="text-sm text-white/60 uppercase tracking-wider font-medium">Years Experience</p>
              </div>
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h4 className="text-3xl font-bold text-primary mb-2">3</h4>
                <p className="text-sm text-white/60 uppercase tracking-wider font-medium">Projects Completed</p>
              </div>
            </div>

            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all hover:bg-white/10 hover:border-primary/50 border border-white/10"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
