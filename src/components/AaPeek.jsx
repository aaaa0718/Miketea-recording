import { useEffect, useRef } from 'react';
import { asset } from '../lib/assets.js';

export default function AaPeek({ intro = false, onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d'), image = new Image();
    let frame, stopped = false, start;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fallback = intro ? setTimeout(() => onDone?.(), 3200) : null;
    function paint(elapsed) {
      const w = image.naturalWidth, h = image.naturalHeight;
      ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.clearRect(0, 0, 400, 560);
      const progress = reduced || !intro ? 1 : Math.min(1, Math.max(0, (elapsed - 150) / 700));
      const rise = 1 - (1 - progress) ** 3;
      const blink = intro && elapsed > 1050 && elapsed < 1250;
      if (intro) ctx.drawImage(image, w * .08, h * .55, w * .34, h * .42, 80, 270, 240, 280);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 400, intro ? 293 : 480); ctx.clip();
      ctx.drawImage(image, blink ? w / 2 : 0, 0, w / 2, h / 2, 45, intro ? (1 - rise) * 310 : 0, 310, 310);
      ctx.restore();
    }
    image.onload = () => {
      if (stopped) return;
      if (!intro) { paint(0); return; }
      function tick(now) {
        if (stopped) return;
        start ??= now; const elapsed = now - start; paint(elapsed);
        if (elapsed < (reduced ? 300 : 2050)) frame = requestAnimationFrame(tick);
        else onDone?.();
      }
      frame = requestAnimationFrame(tick);
    };
    image.onerror = () => { if (!stopped && intro) onDone?.(); };
    image.src = asset('aa-peek-atlas.webp');
    return () => { stopped = true; cancelAnimationFrame(frame); clearTimeout(fallback); };
  }, [intro, onDone]);
  return <canvas ref={ref} width="800" height={intro ? 1120 : 960} className={intro ? 'aa-intro-canvas' : 'aa-calendar-peek'} aria-hidden="true" />;
}
