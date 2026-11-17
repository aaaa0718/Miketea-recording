import DrinkStickers from '../components/DrinkStickers.jsx';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import HeroArt from '../components/HeroArt.jsx';
import WeeklyBudget from '../components/WeeklyBudget.jsx';
import RecordList from '../components/RecordList.jsx';
import { useDiary } from '../state/DiaryContext.jsx';
import { dateKey, weekStart, offsetDay, shortDate } from '../lib/dates.js';
import { inWeek, rankRecords } from '../lib/records.js';
import { asset, photoSrc } from '../lib/assets.js';

export default function HomePage() {
  const { records, openEditor, editor } = useDiary();
  const [week, setWeek] = useState(() => weekStart(new Date())), [selected, setSelected] = useState(null);
  const primaryButton = useRef(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowQuickAdd(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    observer.observe(primaryButton.current);
    return () => observer.disconnect();
  }, []);
  const items = inWeek(records, week), ranked = rankRecords(items), end = offsetDay(week, 6);
  const entryDate = selected || (dateKey(week) === dateKey(weekStart(new Date())) ? dateKey(new Date()) : dateKey(week));
  const changeWeek = date => { setWeek(date); setSelected(null); };
  return <>
    <section className="hero-layout">
      <div className="hero-copy"><p className="hero-eyebrow mb-4 font-serif text-[9px] tracking-[.22em] text-muted">AA’S CUP LOG</p><h1 className="text-[30px] font-medium leading-relaxed tracking-wider sm:text-[38px]">今天这杯，<br />有点来头。</h1><p className="hero-description mt-4 text-xs text-muted">杯杯记录在册</p><DrinkStickers /><svg className="hero-doodle" viewBox="0 0 130 56" fill="none" aria-hidden="true" focusable="false"><path d="M5 15c18 21 45 24 58 11 12-13-8-25-14-12-9 19 34 30 57 10" stroke="#b7a486" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 5" /><path d="m108 9 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#ded0e7" stroke="#baa3c6" strokeWidth="1.2" strokeLinejoin="round" /><path d="m121 35 2-5 2 5 5 2-5 2-2 5-2-5-5-2Z" fill="#f1e5ad" stroke="#d4bf7f" strokeWidth="1" strokeLinejoin="round" /></svg></div>
      <button ref={primaryButton} className="btn-primary hero-add" onClick={() => openEditor(null, entryDate)}>＋ 记一杯</button>
      <HeroArt />
    </section>
    <div className="grid-paper mb-8 hidden sm:flex items-center justify-center gap-4 border-y border-line py-3 text-sm tracking-wider text-muted"><img className="h-7 w-5 -rotate-12" src={asset('cup.svg')} alt="" /><span>AA的续杯现场</span></div>
    <div className="home-details">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-medium">本周喝到哪了</h2><p className="mt-2 text-[11px] text-muted">{week.getFullYear()} 年 {shortDate(week)} — {shortDate(end)}</p></div><div className="flex gap-1"><button className="btn-icon" aria-label="上一周" onClick={() => changeWeek(offsetDay(week, -7))}>←</button><button className="btn-small" onClick={() => changeWeek(weekStart(new Date()))}>回到本周</button><button className="btn-icon" aria-label="下一周" onClick={() => changeWeek(offsetDay(week, 7))}>→</button></div></div>
    <WeeklyBudget count={items.length} />
    <section className="mb-7 grid grid-cols-3 gap-2.5 sm:gap-5" aria-label="本周统计">
      <Stat title="喝了几杯" className="-rotate-[.7deg] bg-butter" note="有据可查，不能装没喝。"><span className="stat-number">{items.length}</span><span className="ml-2 text-xs">杯</span></Stat>
      <Stat title="换了几种" className="rotate-[.5deg] bg-sky" note="饮品口味，雨露均沾。"><span className="stat-number">{ranked.length}</span><span className="ml-2 text-xs">种</span></Stat>
      <Stat title="最常翻牌" className="-rotate-[.5deg] bg-lilac" note={ranked.length ? `选了它 ${ranked[0][1]} 次，偏心实锤。` : '等一位选手脱颖而出。'}><span className="block truncate py-3 text-sm text-lilac-dark sm:text-xl">{ranked[0]?.[0] || 'C 位空缺'}</span></Stat>
    </section>
    <section className="paper-panel mb-6"><div className="flex items-center justify-between"><h2 className="text-sm font-medium">一周打卡</h2><Link to={`/calendar?month=${entryDate.slice(0, 7)}${selected ? `&day=${selected}` : ''}`} className="text-[11px] text-muted underline-offset-4 hover:underline">查看杯杯月历 →</Link></div><div className="mt-5 grid grid-cols-7 gap-1 sm:gap-3">{Array.from({ length: 7 }, (_, i) => {
      const date = offsetDay(week, i), key = dateKey(date), cups = items.filter(row => row.date === key);
      return <button key={key} className={`week-day ${selected === key ? 'border-lilac-dark bg-lilac/40' : key === dateKey(new Date()) ? 'border-sky-dark bg-sky/50' : 'border-line bg-cream'}`} aria-label={`${shortDate(date)}，${cups.length}杯`} aria-pressed={selected === key} onClick={() => setSelected(selected === key ? null : key)}><span className="text-[9px] text-muted">周{'一二三四五六日'[i]}</span><span className="my-2 font-serif text-base">{date.getDate()}</span><img className={`mb-2 h-8 w-7 object-contain ${cups.length ? '' : 'opacity-30'}`} src={photoSrc(cups.at(-1))} alt="" /><span className="week-status text-[8px] text-muted">{cups.length ? `${cups.length} 杯` : '还没记录'}</span></button>;
    })}</div></section>
    <div className="grid items-start gap-5 md:grid-cols-[1.5fr_1fr]">
      <section className="paper-panel"><p className="mb-3 font-serif text-[9px] italic tracking-widest text-muted">THIS WEEK’S CUP LOG</p><div className="flex items-center justify-between"><h2 className="text-sm font-medium">{selected ? `${selected.slice(5).replace('-', ' / ')} 的饮品` : '这周喝的，都在这儿'}</h2>{selected && <button className="text-xs text-muted" onClick={() => setSelected(null)}>查看整周</button>}</div><RecordList records={items.filter(row => !selected || row.date === selected)} date={entryDate} /></section>
      <section className="paper-panel bg-sky/40"><h2 className="text-sm font-medium">我的口味偏好</h2>{ranked.length ? ranked.map(([category, count], i) => <div key={category} className="mt-5"><div className="mb-2 flex justify-between gap-2 text-xs"><span>{category}</span><span>{count} 杯 · {Math.round(count / items.length * 100)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-ink/5"><div className={['bg-lilac-dark/50', 'bg-sky-dark/70', 'bg-[#dbc887]'][i % 3]} style={{ width: `${count / items.length * 100}%`, height: '100%' }} /></div></div>) : <p className="py-10 text-center text-xs leading-loose text-muted">先喝几杯，<br />再看看自己偏爱哪种。</p>}<p className="mt-7 border-t border-dashed border-line pt-5 text-[11px] leading-loose text-muted">下次点单没主意？<br />来翻翻之前喝过的。</p></section>
    </div>
    </div>
    {showQuickAdd && !editor && <button className="mobile-quick-add sm:hidden" onClick={() => openEditor(null, entryDate)}>＋ 记一杯</button>}
  </>;
}
function Stat({ title, note, className, children }) {
  return <article className={`stat-card ${className}`}><h3 className="text-[10px] text-muted sm:text-xs">{title}</h3><div className="mt-1 min-h-14">{children}</div><p className="stat-note mt-1 text-[9px] leading-relaxed text-muted sm:text-[11px]">{note.replace('等一位选手脱颖而出。', '等一位选手，脱颖而出。').split(/(?<=，)/).map((phrase, i) => <span key={i}>{phrase}</span>)}</p></article>;
}
