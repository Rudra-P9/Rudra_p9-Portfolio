import { motion } from "framer-motion";
import React from "react";
import { Tilt } from 'react-next-tilt';

import { ExternalLink, Github } from "lucide-react";
import { escaperoomgame } from "../assets";

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

const ProjectCard = ({ project, index }: { project: any; index: number; key?: number | string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.02,
          speed: 400,
        }}
        className="glass-card flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-background/50 shadow-xl transition-all hover:border-primary/30"
      >
        {/* Project Image Section */}
        <div className="group relative h-64 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />

          {/* GitHub Icon Overlay (visible on image hover) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-primary hover:text-white glow-purple"
            >
              <Github size={28} />
            </a>
          </div>

          {/* Category Badge on image */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md border border-primary/20 glow-purple">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Content Section */}
        <div className="flex flex-1 flex-col p-6 bg-gradient-to-b from-transparent to-background/20">
          <h3 className="mb-3 text-2xl font-bold text-white transition-colors hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-white/70">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {project.live_project_link && project.live_project_link !== "#" && (
              <a
                href={project.live_project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
              >
                <ExternalLink size={14} /> Live Project
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section className="relative min-h-screen w-full py-24 bg-background" id="projects">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 max-w-2xl text-white/60">
            Here are some of my recent projects. They highlight my ability to build seamless, interactive, and functional applications using modern tech stacks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
