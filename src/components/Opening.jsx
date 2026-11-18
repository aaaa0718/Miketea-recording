import { useCallback, useEffect, useState } from 'react';
import AaPeek from './AaPeek.jsx';
import OpeningDrinks from './OpeningDrinks.jsx';

export default function Opening() {
  const [phase, setPhase] = useState('playing');
  const finish = useCallback(() => setPhase('leaving'), []);
  useEffect(() => {
    if (phase !== 'leaving') return;
    const timer = setTimeout(() => setPhase('done'), 280);
    return () => clearTimeout(timer);
  }, [phase]);
  useEffect(() => {
    if (phase === 'done') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const shell = document.querySelector('.diary-shell');
    if (shell) shell.inert = true;
    return () => { document.body.style.overflow = previous; if (shell) shell.inert = false; };
  }, [phase]);
  if (phase === 'done') return null;
  return <div className={`aa-opening ${phase === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-label="AA 的杯杯小账本，正在打开">
    <div className="opening-art"><OpeningDrinks /><AaPeek intro onDone={finish} /><span className="opening-sparkle">✦</span></div>
    <div className="opening-title"><p>AA 的杯杯小账本</p></div>
  </div>;
}
