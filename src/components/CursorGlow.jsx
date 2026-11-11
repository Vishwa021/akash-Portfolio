import { useEffect, useRef } from 'react';

/** Soft violet glow that trails the cursor. Only on devices with a fine pointer. */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const el = ref.current;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
          el.style.opacity = '1';
          raf = 0;
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500"
      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10), transparent 65%)' }}
    />
  );
}
