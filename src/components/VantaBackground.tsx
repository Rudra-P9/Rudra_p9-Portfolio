import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    VANTA: any;
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    let vantaInstance: any = null;

    const initVanta = () => {
      if (window.VANTA && vantaRef.current && !vantaInstance) {
        try {
          vantaInstance = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xa855f7,
            backgroundColor: 0x030014,
            points: 15.0,
            maxDistance: 22.0,
            spacing: 15.0,
          });
        } catch (err) {
          console.error("Vanta initialization failed:", err);
        }
      }
    };

    // Try to initialize
    initVanta();

    // If scripts are still loading, check periodically
    const timer = setInterval(() => {
      if (window.VANTA && !vantaInstance) {
        initVanta();
        if (vantaInstance) clearInterval(timer);
      }
    }, 100);

    return () => {
      if (vantaInstance) vantaInstance.destroy();
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
