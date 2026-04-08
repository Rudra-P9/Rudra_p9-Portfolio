import { Mail } from "lucide-react";

interface EmailButtonProps {
  text?: string;
  className?: string;
}

export default function EmailButton({ text = "Email Me", className = "" }: EmailButtonProps) {
  const email = "rudra.patel70@yahoo.com";
  const subject = encodeURIComponent("Work Opportunity");
  const body = encodeURIComponent("Hi Rudra, I saw your portfolio and would like to connect.");
  
  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <a
      href={mailtoUrl}
      aria-label="Send an email to Rudra Patel"
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-95 ${className}`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Moving Shine Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      
      <Mail size={20} className="relative z-10 transition-transform group-hover:rotate-12" />
      <span className="relative z-10">{text}</span>
      
      {/* Outer Glow Border */}
      <div className="absolute inset-0 rounded-full border border-white/20 transition-colors group-hover:border-primary/50" />
    </a>
  );
}
