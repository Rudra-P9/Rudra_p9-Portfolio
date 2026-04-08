import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import { escaperoomgame } from "../assets";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Escape Game 🎮",
    category: "Game Development",
    image: escaperoomgame,
    description: "A Java-based escape room game built with a team of 5 using Scrum methodology. Led a multi-phase release process with 100% sprint deadline adherence across a 6-week iteration, and improved UX by reducing reported interface issues by 60% through iterative feedback sessions.",
    tags: ["Java", "HTML/CSS", "Scrum", "Git"],
    source_code_link: "https://github.com/Rudra-P9/Infinite-Stress-Loop-Escape-Room",
    live_project_link: "https://github.com/Rudra-P9/Infinite-Stress-Loop-Escape-Room",
  },
  {
    title: "Quantum Dashboard",
    category: "Web App",
    image: "https://picsum.photos/seed/project1/800/600",
    description: "A real-time data visualization platform with futuristic UI.",
    tags: ["React", "D3.js", "GSAP"],
    source_code_link: "https://github.com/Rudra-P9",
    live_project_link: "#",
  },
  {
    title: "Neon Nexus",
    category: "E-commerce",
    image: "https://picsum.photos/seed/project2/800/600",
    description: "A high-end fashion store with 3D product previews.",
    tags: ["Next.js", "Three.js", "Stripe"],
    source_code_link: "https://github.com/Rudra-P9",
    live_project_link: "#",
  },
  {
    title: "Cyber Sphere",
    category: "Game",
    image: "https://picsum.photos/seed/project3/800/600",
    description: "Multiplayer browser-based space exploration game.",
    tags: ["Socket.io", "Canvas", "Node.js"],
    source_code_link: "https://github.com/Rudra-P9",
    live_project_link: "#",
  },
  {
    title: "Aether OS",
    category: "Portfolio",
    image: "https://picsum.photos/seed/project4/800/600",
    description: "Operating system themed portfolio with interactive apps.",
    tags: ["React", "Framer Motion", "Tailwind"],
    source_code_link: "https://github.com/Rudra-P9",
    live_project_link: "#",
  },
  {
    title: "Vortex AI",
    category: "SaaS",
    image: "https://picsum.photos/seed/project5/800/600",
    description: "AI-powered content generation tool for creative agencies.",
    tags: ["OpenAI", "React", "Express"],
    source_code_link: "https://github.com/Rudra-P9",
    live_project_link: "#",
  },
  {
    title: "Lumina Music",
    category: "Mobile App",
    image: "https://picsum.photos/seed/project6/800/600",
    description: "Immersive music player with audio-reactive visuals.",
    tags: ["React Native", "Web Audio API"],
    source_code_link: "https://github.com/Rudra-P9",
    live_project_link: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      const amountToScroll = scrollWidth - viewportWidth;

      if (amountToScroll > 0) {
        gsap.to(scrollContainerRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background/50"
      id="projects"
    >
      <div className="py-24">
        <div className="container mx-auto mb-16 px-6">
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            <span className="text-primary">Projects</span>
          </h2>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-6 md:px-24 w-max"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card group relative h-[500px] w-[300px] flex-shrink-0 overflow-hidden rounded-3xl md:w-[450px]"
            >
            {/* Image */}
            <div className="h-full w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/90 to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="mb-2 text-sm font-bold uppercase tracking-widest text-primary glow-purple">
                {project.category}
              </span>
              <h3 className="mb-4 text-3xl font-bold text-white">
                {project.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/80">
                {project.description}
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href={project.live_project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition-all hover:bg-primary/80"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a 
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/20 border border-white/10"
                >
                  <Github size={14} /> Code
                </a>
              </div>
            </div>

            {/* Default View Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transition-opacity duration-500 group-hover:opacity-0">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <span className="text-sm text-white/60">{project.category}</span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
