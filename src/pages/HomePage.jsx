import TasteCups from '../components/TasteCups.jsx';
import DrinkStickers from '../components/DrinkStickers.jsx';
import CupPhoto from '../components/CupPhoto.jsx';
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
    <section className="paper-panel weekly-stickers mb-6" aria-label="这周喝了什么">
      <div className="flex items-center justify-between gap-3"><h2 className="text-sm font-medium">这周喝了什么</h2><Link to={`/calendar?month=${entryDate.slice(0, 7)}${selected ? `&day=${selected}` : ''}`} className="text-[11px] text-muted underline-offset-4 hover:underline">查看杯杯月历 →</Link></div>
      <div className="week-strip">{Array.from({ length: 7 }, (_, i) => {
        const date = offsetDay(week, i), key = dateKey(date), cups = items.filter(row => row.date === key);
        const today = key === dateKey(new Date()), latest = cups.at(-1);
        const label = latest?.name || latest?.category || '';
        return <button key={key} type="button" className={`week-day ${selected === key ? 'is-selected' : ''} ${today ? 'is-today' : ''}`} aria-label={`${shortDate(date)}${today ? '，今天' : ''}，${cups.length ? `${cups.length}杯，查看记录` : '记一杯'}`} aria-current={today ? 'date' : undefined} aria-pressed={selected === key} onClick={() => { setSelected(key); if (!cups.length) openEditor(null, key); }}>
          <span className="week-weekday">周{'一二三四五六日'[i]}</span>
          <span className="week-date">{date.getDate()}</span>
          <span className="week-cup-space"><CupPhoto className={`week-cup ${cups.length ? 'sticker' : 'week-cup-empty'}`} src={cups.length ? photoSrc(latest) : asset('cup-empty-week.svg')} alt="" />{cups.length > 1 && <span className="week-count">{cups.length}杯</span>}</span>
          <span className="week-status" title={label}>{label || '\u00a0'}</span>
        </button>;
      })}</div>
      <p className="week-hint">点空杯记一杯，点贴纸翻记录</p>
    </section>
    <div className="grid items-start gap-5 md:grid-cols-[1.5fr_1fr]">
      <section className="paper-panel"><p className="mb-3 font-serif text-[9px] italic tracking-widest text-muted">THIS WEEK’S CUP LOG</p><div className="flex items-center justify-between"><h2 className="text-sm font-medium">{selected ? `${selected.slice(5).replace('-', ' / ')} 的饮品` : '这周喝的，都在这儿'}</h2>{selected && <button className="text-xs text-muted" onClick={() => setSelected(null)}>查看整周</button>}</div><RecordList records={items.filter(row => !selected || row.date === selected)} date={entryDate} /></section>
      <TasteCups records={items} />
    </div>
    </div>
    {showQuickAdd && !editor && <button className="mobile-quick-add sm:hidden" onClick={() => openEditor(null, entryDate)}>＋ 记一杯</button>}
  </>;
}
function Stat({ title, note, className, children }) {
  return <article className={`stat-card ${className}`}><h3 className="text-[10px] text-muted sm:text-xs">{title}</h3><div className="mt-1 min-h-14">{children}</div><p className="stat-note mt-1 text-[9px] leading-relaxed text-muted sm:text-[11px]">{note.replace('等一位选手脱颖而出。', '等一位选手，脱颖而出。').split(/(?<=，)/).map((phrase, i) => <span key={i}>{phrase}</span>)}</p></article>;
}
