import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { uofsc } from "../assets";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    university: "University of South Carolina",
    degree: "Bachelor of Science in Computer Science",
    date: "August 2024 – Dec 2027",
    location: "Columbia, SC",
    gpa: "3.723",
    logo: uofsc,
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".education-card", {
        y: 50,
        opacity: 0,
        duration: 1.2,
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
      className="relative w-full py-24"
      id="education"
    >
      <div className="container mx-auto px-6">
        <h2 className="font-display mb-16 text-4xl font-bold text-white md:text-6xl text-center">
          My <span className="text-primary">Education</span>
        </h2>

        <div className="mx-auto max-w-4xl">
          {educationData.map((edu, idx) => (
            <div key={idx} className="education-card glass-card relative overflow-hidden rounded-3xl p-8 border border-white/5 md:p-12">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              
              <div className="flex flex-col gap-8 md:flex-row md:items-start">
                {/* Logo */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 md:h-32 md:w-32">
                  <img
                    src={edu.logo}
                    alt={edu.university}
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      <GraduationCap size={14} /> Degree
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                      <Calendar size={14} /> {edu.date}
                    </span>
                  </div>

                  <h3 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                    {edu.university}
                  </h3>
                  <p className="mb-6 text-xl font-medium text-white/80">
                    {edu.degree}
                  </p>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-white/60">
                      <MapPin size={18} className="text-primary" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Award size={18} className="text-primary" />
                      <span className="font-bold text-white">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
