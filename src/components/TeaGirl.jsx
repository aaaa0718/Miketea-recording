import { useEffect, useRef, useState } from 'react';
import puppetUrl from '../assets/tea-girl-puppet.png';
import { drawTeaGirl } from '../lib/teaGirlAnimation.js';

export default function TeaGirl() {
  const canvas = useRef(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    let disposed = false, frame = 0, timer = 0, last = 0;
    const image = new Image();
    const context = canvas.current.getContext('2d');
    setStatus('loading');
    function fail() { if (!disposed) setStatus('error'); }
    function tick(time) {
      if (disposed) return;
      // Cap drawing at 30fps and avoid repainting hidden tabs.
      if (!document.hidden && time - last >= 32) {
        drawTeaGirl(context, image, (time % 10000) / 100);
        last = time;
      }
      frame = requestAnimationFrame(tick);
    }
    image.onload = () => {
      clearTimeout(timer);
      if (disposed) return;
      if (!context) { fail(); return; }
      try {
        drawTeaGirl(context, image, 0);
        setStatus('ready');
        frame = requestAnimationFrame(tick);
      } catch { fail(); }
    };
    image.onerror = () => { clearTimeout(timer); fail(); };
    timer = setTimeout(fail, 30000);
    image.src = attempt ? `${puppetUrl}?retry=${attempt}` : puppetUrl;
    return () => {
      disposed = true; cancelAnimationFrame(frame); clearTimeout(timer);
      image.onload = null; image.onerror = null;
    };
  }, [attempt]);
  return <div className="tea-girl tea-canvas-wrap">
    <canvas ref={canvas} width="640" height="900" className="tea-canvas" role="img" aria-label="女孩抬杯吸奶茶，放下杯子后开心微笑" />
    {status !== 'ready' && <div className="tea-image-status" role="status">
      {status === 'loading' ? '小女孩加载中…' : <button className="btn-small" onClick={() => setAttempt(value => value + 1)}>重新加载小女孩</button>}
    </div>}
  </div>;
}
