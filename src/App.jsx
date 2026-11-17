import { useEffect } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import RecordsPage from './pages/RecordsPage.jsx';
import BackupPage from './pages/BackupPage.jsx';
import RecordEditor from './components/RecordEditor.jsx';
import { useDiary } from './state/DiaryContext.jsx';
import { asset } from './lib/assets.js';

export default function App() {
  const { editor, error, notice } = useDiary();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-12">
    <a href="#main-content" onClick={event => { event.preventDefault(); const main = document.getElementById('main-content'); main.tabIndex = -1; main.focus(); }} className="sr-only focus:not-sr-only">跳到主要内容</a>
    <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-line py-4 sm:min-h-24">
      <Link to="/" className="flex items-center gap-2 text-lg font-medium tracking-wide sm:text-xl"><img className="h-10 w-7" src={asset('cup.svg')} alt="" />AA的奶茶小账本<span className="ml-2 hidden font-serif text-[10px] italic tracking-[.2em] text-muted lg:inline">TEA DIARY</span></Link>
      <nav aria-label="主导航" className="flex gap-1 text-[11px] sm:text-xs">{[['/', '本周'], ['/calendar', '贴纸月历'], ['/records', '全部记录'], ['/backup', '备份']].map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `rounded-md px-2.5 py-2.5 transition-colors sm:px-3 ${isActive ? 'bg-lilac/65 text-lilac-dark' : 'text-muted hover:bg-paper'}`}>{label}</NavLink>)}</nav>
    </header>
    {error && <div className="my-5 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900" role="alert">{error} <Link className="underline" to="/backup">前往备份</Link></div>}
    <main id="main-content"><Routes><Route path="/" element={<HomePage />} /><Route path="/calendar" element={<CalendarPage />} /><Route path="/records" element={<RecordsPage />} /><Route path="/backup" element={<BackupPage />} /><Route path="*" element={<section className="py-20 text-center"><h1 className="text-xl">这一页还没有奶茶</h1><Link className="btn-primary mt-5 inline-block" to="/">回到本周</Link></section>} /></Routes></main>
    <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-line py-7 text-[10px] text-muted sm:flex-row"><span>♧ AA的奶茶小账本</span><span>仅保存在当前浏览器 · 记得偶尔备份 ♡</span></footer>
    {editor && <RecordEditor key={editor.key} record={editor.record} date={editor.date} />}
    {notice && <div className="fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-md bg-ink px-5 py-3 text-center text-xs text-white shadow-lg" role="status">{notice}</div>}
  </div>;
}
