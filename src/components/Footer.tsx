export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background py-12">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 blur-xl animate-pulse"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Rudra Patel
            </h2>
            <p className="mt-2 text-sm text-white/40">
              © 2026 Rudra Patel. All rights reserved.
            </p>
          </div>

          <nav className="flex gap-8">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/60 transition-all hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex gap-4">
            <p className="text-sm text-white/40">
              Designed by Rudra
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
