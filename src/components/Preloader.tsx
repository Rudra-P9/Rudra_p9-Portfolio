import { useEffect, useMemo, useRef, useState } from 'react';

type LoadingScreenProps = {
  onComplete?: () => void;
  durationMs?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  layer: 1 | 2;
};

function createParticles(count: number, width: number, height: number, layer: 1 | 2): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * (layer === 1 ? 0.25 : 0.08),
    vy: (Math.random() - 0.5) * (layer === 1 ? 0.25 : 0.08),
    r: layer === 1 ? 2.2 + Math.random() * 2 : 1.2 + Math.random() * 1.4,
    layer,
  }));
}

export default function Preloader({ onComplete, durationMs = 3200 }: LoadingScreenProps) {
  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const fgRef = useRef<HTMLCanvasElement | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const bgCount = 90;
  const fgCount = 55;

  const setupCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    return {
      ctx,
      canvas,
      cleanup: () => window.removeEventListener('resize', resize),
    };
  };

  const allParticlesRef = useRef<{
    bg: Particle[];
    fg: Particle[];
  }>({ bg: [], fg: [] });

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const bgSetup = setupCanvas(bgRef.current);
    const fgSetup = setupCanvas(fgRef.current);

    if (!bgSetup || !fgSetup) return;

    const { ctx: bgCtx } = bgSetup;
    const { ctx: fgCtx } = fgSetup;

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      allParticlesRef.current.bg = createParticles(bgCount, w, h, 2);
      allParticlesRef.current.fg = createParticles(fgCount, w, h, 1);
    };

    init();

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const bgParticles = allParticlesRef.current.bg;
      const fgParticles = allParticlesRef.current.fg;

      bgCtx.clearRect(0, 0, w, h);
      fgCtx.clearRect(0, 0, w, h);

      const drawLayer = (
        ctx: CanvasRenderingContext2D,
        particles: Particle[],
        dotColor: string,
        lineColor: string,
        proximity: number,
        speedBoost: number
      ) => {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * speedBoost;
          p.y += p.vy * speedBoost;

          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;

          ctx.beginPath();
          ctx.fillStyle = dotColor;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < proximity) {
              ctx.beginPath();
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 1;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      };

      drawLayer(
        fgCtx,
        fgParticles,
        'rgba(192, 132, 252, 0.95)',
        'rgba(168, 85, 247, 0.16)',
        180,
        1
      );

      drawLayer(
        bgCtx,
        bgParticles,
        'rgba(168, 85, 247, 0.45)',
        'rgba(168, 85, 247, 0.07)',
        90,
        0.8
      );

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const t1 = window.setTimeout(() => setFadeOut(true), durationMs);
    const t2 = window.setTimeout(() => onComplete?.(), durationMs + 450);

    return () => {
      bgSetup.cleanup();
      fgSetup.cleanup();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [durationMs, onComplete]);

  const particlesStyle = useMemo(
    () => ({
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.45s ease',
    }),
    [fadeOut]
  );

  return (
    <div className="loader-screen">
      <div className="loader-bg" />
      <canvas ref={bgRef} className="particles-canvas particles-back" style={particlesStyle} />
      <canvas ref={fgRef} className="particles-canvas particles-front" style={particlesStyle} />

      <div className="center-wrap" style={particlesStyle}>
        <div className="loader-circle" />
        <div className="loader-line-mask">
          <div className="loader-line" />
        </div>

        <div className="logo-wrap">
          <img src={`${import.meta.env.BASE_URL}logo0.png`} alt="Logo" width={92} height={92} className="logo" />
        </div>
      </div>

      <style>{`
        .loader-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          background: #060214;
        }

        .loader-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.16), transparent 30%),
            radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.14), transparent 44%),
            linear-gradient(135deg, #060214 0%, #09051b 48%, #04010f 100%);
        }

        .particles-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particles-back {
          opacity: 0.8;
        }

        .particles-front {
          opacity: 1;
        }

        .center-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .loader-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          border-radius: 9999px;
          box-shadow:
            inset 0 0 0 1px rgba(168, 85, 247, 0.18),
            0 0 40px rgba(124, 58, 237, 0.12);
        }

        .loader-line-mask {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70px;
          height: 140px;
          overflow: hidden;
          transform-origin: 70px 70px;
          margin-left: -70px;
          margin-top: -70px;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
          animation: rotate 1.2s infinite linear;
        }

        .loader-line {
          width: 140px;
          height: 140px;
          border-radius: 9999px;
          box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.75);
        }

        .logo-wrap {
          position: relative;
          z-index: 10;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo {
          object-fit: contain;
          filter: drop-shadow(0 0 18px rgba(168, 85, 247, 0.75));
          animation: pulse 1.8s ease-in-out infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.92;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
