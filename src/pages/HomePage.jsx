import { useState } from 'react';
import { Link } from 'react-router';
import HeroArt from '../components/HeroArt.jsx';
import WeeklyBudget from '../components/WeeklyBudget.jsx';
import RecordList from '../components/RecordList.jsx';
import { useDiary } from '../state/DiaryContext.jsx';
import { dateKey, weekStart, offsetDay, shortDate } from '../lib/dates.js';
import { inWeek, rankRecords } from '../lib/records.js';
import { asset, photoSrc } from '../lib/assets.js';

export default function HomePage() {
  const { records, openEditor } = useDiary();
  const [week, setWeek] = useState(() => weekStart(new Date())), [selected, setSelected] = useState(null);
  const items = inWeek(records, week), ranked = rankRecords(items), end = offsetDay(week, 6);
  const changeWeek = date => { setWeek(date); setSelected(null); };
  return <>
    <section className="hero-layout">
      <div><p className="mb-4 font-serif text-[9px] tracking-[.22em] text-muted">A LITTLE SIP OF HAPPINESS</p><h1 className="text-[30px] font-medium leading-relaxed tracking-wider sm:text-[38px]">又喝奶茶了？<br />记上！记上！</h1><p className="mb-6 mt-4 text-xs text-muted">杯子可以扔，这杯得留名。</p><button className="btn-primary" onClick={() => openEditor()}>＋ 记一杯</button></div>
      <HeroArt />
    </section>
    <div className="grid-paper mb-8 flex items-center justify-center gap-4 border-y border-line py-3 font-serif text-[9px] tracking-wider text-muted sm:gap-7 sm:text-xs"><span>A LITTLE TEA, A LOT OF JOY</span><img className="h-7 w-5 -rotate-12" src={asset('cup.svg')} alt="" /><span className="text-[9px]">慢慢喝 · 慢慢记</span></div>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-medium">这一周的小快乐</h2><p className="mt-2 text-[11px] text-muted">{week.getFullYear()} 年 {shortDate(week)} — {shortDate(end)}</p></div><div className="flex gap-1"><button className="btn-icon" aria-label="上一周" onClick={() => changeWeek(offsetDay(week, -7))}>←</button><button className="btn-small" onClick={() => changeWeek(weekStart(new Date()))}>回到本周</button><button className="btn-icon" aria-label="下一周" onClick={() => changeWeek(offsetDay(week, 7))}>→</button></div></div>
    <WeeklyBudget count={items.length} />
    <section className="mb-7 grid grid-cols-3 gap-2.5 sm:gap-5" aria-label="本周统计">
      <Stat title="本周喝了" className="-rotate-[.7deg] bg-butter" note="杯杯有记录，休想装没喝。"><span className="stat-number">{items.length}</span><span className="ml-2 text-xs">杯</span></Stat>
      <Stat title="解锁品类" className="rotate-[.5deg] bg-sky" note="今天也有认真挑口味。"><span className="stat-number">{ranked.length}</span><span className="ml-2 text-xs">种</span></Stat>
      <Stat title="本周心头好" className="-rotate-[.5deg] bg-lilac" note={ranked.length ? `这周选了它 ${ranked[0][1]} 次，有点偏心。` : '谁能拿下本周 C 位？'}><span className="block truncate py-3 text-sm text-lilac-dark sm:text-xl">{ranked[0]?.[0] || '等待第一杯'}</span></Stat>
    </section>
    <section className="paper-panel mb-6"><div className="flex items-center justify-between"><h2 className="text-sm font-medium">一周打卡</h2><Link to="/calendar" className="text-[11px] text-muted underline-offset-4 hover:underline">查看贴纸月历 →</Link></div><div className="mt-5 grid grid-cols-7 gap-1 sm:gap-3">{Array.from({ length: 7 }, (_, i) => {
      const date = offsetDay(week, i), key = dateKey(date), cups = items.filter(row => row.date === key);
      return <button key={key} className={`week-day ${selected === key ? 'border-lilac-dark bg-lilac/40' : key === dateKey(new Date()) ? 'border-sky-dark bg-sky/50' : 'border-line bg-cream'}`} aria-label={`${shortDate(date)}，${cups.length}杯`} aria-pressed={selected === key} onClick={() => setSelected(selected === key ? null : key)}><span className="text-[9px] text-muted">周{'一二三四五六日'[i]}</span><span className="my-2 font-serif text-base">{date.getDate()}</span><img className={`mb-2 h-8 w-7 object-contain ${cups.length ? '' : 'opacity-30'}`} src={photoSrc(cups.at(-1))} alt="" /><span className="text-[8px] text-muted">{cups.length ? `${cups.length} 杯快乐` : '等一杯甜'}</span></button>;
    })}</div></section>
    <div className="grid items-start gap-5 md:grid-cols-[1.5fr_1fr]">
      <section className="paper-panel"><p className="mb-3 font-serif text-[9px] italic tracking-widest text-muted">THE LITTLE JOY LIST</p><div className="flex items-center justify-between"><h2 className="text-sm font-medium">{selected ? `${selected.slice(5).replace('-', ' / ')} 的奶茶` : '本周的奶茶清单'}</h2>{selected && <button className="text-xs text-muted" onClick={() => setSelected(null)}>查看整周</button>}</div><RecordList records={items.filter(row => !selected || row.date === selected)} date={selected || (dateKey(week) === dateKey(weekStart(new Date())) ? dateKey(new Date()) : dateKey(week))} /></section>
      <section className="paper-panel bg-sky/40"><h2 className="text-sm font-medium">我的口味地图</h2>{ranked.length ? ranked.map(([category, count], i) => <div key={category} className="mt-5"><div className="mb-2 flex justify-between gap-2 text-xs"><span>{category}</span><span>{count} 杯 · {Math.round(count / items.length * 100)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-ink/5"><div className={['bg-lilac-dark/50', 'bg-sky-dark/70', 'bg-[#dbc887]'][i % 3]} style={{ width: `${count / items.length * 100}%`, height: '100%' }} /></div></div>) : <p className="py-10 text-center text-xs leading-loose text-muted">喝过的每一种味道<br />都会在这里留下印记</p>}<p className="mt-7 border-t border-dashed border-line pt-5 text-[11px] leading-loose text-muted">不赶时间，慢慢喝。<br />快乐可以是很小的一件事。</p></section>
    </div>
  </>;
}
function Stat({ title, note, className, children }) {
  return <article className={`stat-card ${className}`}><h3 className="text-[10px] text-muted sm:text-xs">{title}</h3><div className="mt-1 min-h-14">{children}</div><p className="mt-1 text-[9px] leading-relaxed text-muted sm:text-[11px]">{note}</p></article>;
}
