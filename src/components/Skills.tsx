import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code } from "lucide-react";
import { 
  java, python, typescript, javascript, html, css, r, 
  reactjs, git, vscode, pycharm, intellij, eclipse, javafx, junit, threejs,
  nodejs, figma
} from "../assets";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: string;
};

const skillsData: Record<string, Skill[]> = {
  "Languages": [
    { name: "Java", icon: java },
    { name: "Python", icon: python },
    { name: "TypeScript", icon: typescript },
    { name: "JavaScript", icon: javascript },
    { name: "HTML5", icon: html },
    { name: "CSS3", icon: css },
    { name: "R", icon: r },
  ],
  "Frameworks & Libraries": [
    { name: "React", icon: reactjs },
    { name: "Node.js", icon: nodejs },
    { name: "Three.js", icon: threejs },
    { name: "JavaFX", icon: javafx },
    { name: "JUnit", icon: junit },
  ],
  "Tools": [
    { name: "Git", icon: git },
    { name: "Figma", icon: figma },
    { name: "VS Code", icon: vscode },
    { name: "PyCharm", icon: pycharm },
    { name: "IntelliJ", icon: intellij },
    { name: "Eclipse", icon: eclipse },
  ],
};

const categories = [
  { key: "Languages", direction: "left" as const, duration: "35s" },
  { key: "Frameworks & Libraries", direction: "right" as const, duration: "28s" },
  { key: "Tools", direction: "left" as const, duration: "22s" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [pausedRow, setPausedRow] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".marquee-row", {
        x: (i) => (i % 2 === 0 ? -50 : 50),
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-background/50 overflow-hidden"
      id="skills"
    >
      <div className="container mx-auto px-6">
        <div className="skills-header text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {categories.map(({ key, direction, duration }, rowIndex) => {
            const categorySkills = skillsData[key];
            // Calculate multiplier to ensure the marquee is long enough to loop seamlessly
            const itemWidth = 104; 
            const rawMult = Math.ceil(3000 / (categorySkills.length * itemWidth));
            const multiplier = rawMult % 2 === 0 ? Math.max(2, rawMult) : Math.max(2, rawMult + 1);
            const items = Array.from({ length: multiplier }, () => categorySkills).flat();

            return (
              <div key={key} className="marquee-row" style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Code style={{ color: 'var(--color-primary)', width: '18px', height: '18px' }} />
                  <span className="font-display" style={{ fontSize: '20px', letterSpacing: '0.12em', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {key}
                  </span>
                </div>

                <div
                  onMouseEnter={() => setPausedRow(rowIndex)}
                  onMouseLeave={() => setPausedRow(null)}
                  style={{
                    overflow: 'hidden',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      width: 'max-content',
                      animation: `${direction === 'left' ? 'marquee-left' : 'marquee-right'} ${duration} linear infinite`,
                      animationPlayState: pausedRow === rowIndex ? 'paused' : 'running',
                      paddingBottom: '4px',
                    }}
                  >
                    {items.map((skill, i) => (
                      <div
                        key={i}
                        className="glass-card group relative"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '72px',
                          height: '72px',
                          flexShrink: 0,
                          borderRadius: '1rem',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div className="relative h-14 w-14 flex items-center justify-center">
                          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-12 w-12 object-contain relative z-10 transition-transform group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-background/80 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap z-20">
                          {skill.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
