import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Send, Instagram, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = "service_7kbp4u4";
const EMAILJS_TEMPLATE_ID = "template_5zo3mri";
const EMAILJS_PUBLIC_KEY = "q_UfZ8szbo_9xsHNb";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      setStatus("success");
      formRef.current.reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-item", {
        y: 50,
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
      className="relative min-h-screen w-full py-24"
      id="contact"
    >
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Info */}
          <div className="contact-item">
            <h2 className="font-display mb-6 text-4xl font-bold text-white md:text-6xl">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="mb-12 text-lg text-white/70">
              Have a project in mind or just want to say hi? I'm always open to
              new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <a href="mailto:Rudra.patel70@yahoo.com" className="flex items-center gap-6 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">
                    Email Me
                  </h4>
                  <p className="text-xl font-medium text-white group-hover:text-primary transition-colors">
                    Rudra.patel70@yahoo.com
                  </p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/rudrap9/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  <Linkedin size={28} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">
                    LinkedIn
                  </h4>
                  <p className="text-xl font-medium text-white group-hover:text-primary transition-colors">
                    linkedin.com/in/rudrap9
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-16 flex gap-6">
              {[
                { Icon: Github, href: "https://github.com/Rudra-P9" },
                { Icon: Instagram, href: "https://www.instagram.com/rudra_p9/" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/rudrap9/" }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex h-12 w-12 items-center justify-center rounded-xl text-white transition-all hover:scale-110 hover:bg-primary/20 hover:text-primary"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contact-item">
            <form
              ref={formRef}
              className="glass-card relative space-y-6 rounded-3xl p-8 md:p-12 overflow-hidden"
              onSubmit={handleSubmit}
            >
              {status === "success" && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm text-center p-8">
                  <CheckCircle size={64} className="text-primary mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm text-center p-8">
                  <h3 className="text-2xl font-bold text-red-500 mb-2">Oops!</h3>
                  <p className="text-white/60">Something went wrong. Please try again later.</p>
                </div>
              )}

              {/* Hidden field for to_email if needed by template */}
              <input type="hidden" name="to_email" value="Rudra.patel70@yahoo.com" />

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/40">
                  Full Name
                </label>
                <input
                  required
                  name="from_name"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/40">
                  Email Address
                </label>
                <input
                  required
                  name="from_email"
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/40">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                  placeholder="Hey Rudra, Love the website! Let's Chat!"
                />
              </div>
              <button 
                disabled={status === "sending"}
                className={`neon-border flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-bold text-white transition-all hover:bg-primary/80 ${status === "sending" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {status === "sending" ? "Sending..." : "Send Message"} <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
