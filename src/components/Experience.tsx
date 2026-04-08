import React, { useState, useCallback, useMemo, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { amazon, exxon } from "../assets";

const experienceData = [
  {
    company: "Exxon Gas Station",
    role: "Manager",
    date: "Aug 2023 - Present",
    location: "Columbia, SC",
    logo: exxon,
    points: [
      "Optimizing operational processes in high-traffic environments and managing daily operations.",
      "Ensuring high standards of customer service and safety protocols.",
      "Managing inventory and financial reporting for the station.",
    ],
  },
  {
    company: "Amazon",
    role: "Fulfillment Center Warehouse Associate",
    date: "May 2025 - Oct 2025",
    location: "West Columbia, SC",
    logo: amazon,
    points: [
      "Handled logistics and fulfillment operations in a fast-paced environment.",
      "Maintained high accuracy in order processing and inventory management.",
      "Collaborated with team members to meet daily production targets.",
    ],
  },
];

const ExperienceCard = React.memo(({ experience, isActive, onClick, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
        isActive 
          ? "bg-primary/20 border-primary/50 shadow-lg shadow-primary/10" 
          : "bg-white/5 border-white/5 hover:bg-white/10"
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden mr-4 p-2 ${experience.company === "Amazon" ? "bg-white" : "bg-white/5"}`}>
        <img
          src={experience.logo}
          alt={experience.company}
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <h3 className="text-white text-lg font-bold leading-tight">{experience.role}</h3>
        <p className="text-white/60 text-sm">{experience.company}</p>
      </div>
    </motion.div>
  );
});

const ExperienceDetails = React.memo(({ experience }: any) => {
  return (
    <motion.div
      key={experience.company}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="glass-card p-8 rounded-3xl border border-white/5 h-full"
    >
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-white text-3xl font-bold">{experience.role}</h3>
          <span className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Calendar size={14} /> {experience.date}
          </span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <div className="flex items-center gap-1">
            <Briefcase size={16} className="text-primary" />
            <span>{experience.company}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-primary" />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {experience.points.map((point: string, index: number) => (
          <li
            key={index}
            className="flex gap-3 text-white/70 text-base leading-relaxed"
          >
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);

  const handleExperienceClick = useCallback((index: number) => {
    startTransition(() => {
      setActiveExperience(index);
    });
  }, []);

  const currentExperience = useMemo(() => experienceData[activeExperience], [activeExperience]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24"
      id="experience"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg">My Professional Journey</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-4">
              {experienceData.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  isActive={index === activeExperience}
                  onClick={() => handleExperienceClick(index)}
                  index={index}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!isPending && (
                <ExperienceDetails key={currentExperience.company} experience={currentExperience} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
