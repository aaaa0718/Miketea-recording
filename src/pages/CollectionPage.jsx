import { useId, useState } from 'react';
import { useDiary } from '../state/DiaryContext.jsx';
import { newestFirst } from '../lib/records.js';
import { brandStamps } from '../lib/collection.js';
import { photoSrc } from '../lib/assets.js';
import CupPhoto from '../components/CupPhoto.jsx';
import AaReaction from '../components/AaReaction.jsx';
import BackupPage from './BackupPage.jsx';

function BrandStamp({ stamp, index, onClick }) {
  const id = `stamp-${useId().replace(/:/g, '')}`;
  const label = stamp.brand.length > 13 ? `${stamp.brand.slice(0, 12)}…` : stamp.brand;
  return <button type="button" className={`brand-stamp stamp-ink-${index % 3}`} onClick={onClick} aria-label={`查看${stamp.brand}的 ${stamp.count} 杯记录`}>
    <svg viewBox="0 0 180 180" aria-hidden="true">
      <defs><path id={id} d="M27 92a63 63 0 0 1 126 0" /></defs>
      <circle cx="90" cy="90" r="79" /><circle cx="90" cy="90" r="72" strokeDasharray="2 4" />
      <text className="stamp-brand" fontSize={label.length > 8 ? 12 : 15}><textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{label}</textPath></text>
      <path d="M72 67h36l-5 29H77Zm17-13 4-10m-2 25 3-12" strokeWidth="2" />
      <path d="m82 83 3 2m11-2 3 2" strokeWidth="2" />
      <text x="90" y="118" textAnchor="middle" className="stamp-date">{stamp.date.replaceAll('-', '.')}</text>
      <text x="90" y="139" textAnchor="middle" className="stamp-caption">AA · 喝过留章</text>
    </svg>
    <span>{stamp.count} 杯记录</span>
  </button>;
}

export default function CollectionPage() {
  const { records, openEditor, error } = useDiary();
  const [view, setView] = useState('stamps'), [brand, setBrand] = useState('');
  const stamps = brandStamps(records);
  const shown = newestFirst(records.filter(row => !brand || row.brand.trim() === brand));
  return <section className="collection-page py-7 sm:py-10">
    <div className="collection-heading"><div><p className="collection-eyebrow">AA’S LITTLE COLLECTION</p><h1>AA 的杯杯集章册</h1><p className="mt-2 text-xs text-muted">喝过的每一杯，都有自己的位置。</p></div><button className="btn-primary text-xs" onClick={() => openEditor()}>＋ 记一杯</button></div>
    <div className="collection-switch" role="group" aria-label="收藏类型"><button type="button" aria-pressed={view === 'stickers'} onClick={() => setView('stickers')}>奶茶贴纸 <span>{records.length}</span></button><button type="button" aria-pressed={view === 'stamps'} onClick={() => { setView('stamps'); setBrand(''); }}>品牌印章 <span>{stamps.length}</span></button></div>
    <div className="collection-book">
      <div className="collection-book-heading"><span>{view === 'stickers' ? '一杯一贴，慢慢收藏' : '喝过一家，留下一枚'}</span><span className="text-[10px] text-muted">{view === 'stickers' ? '点击贴纸，翻看这杯' : '点击印章，翻看这个品牌'}</span></div>
      {view === 'stickers' && <>
        {brand && <div className="collection-filter"><span>{brand} · {shown.length} 杯</span><button type="button" onClick={() => setBrand('')}>查看全部 ×</button></div>}
        {shown.length ? <div className="sticker-shelf">{shown.map((record, i) => <button type="button" className="collected-sticker" key={record.id} onClick={() => openEditor(record)} aria-label={`查看 ${record.name || record.category}，${record.date}`}>
          <div className="collected-cup" style={{ '--sticker-angle': `${[-7, 5, -3, 7][i % 4]}deg` }}><CupPhoto src={photoSrc(record)} className="sticker" alt="" /></div>
          <span className="collected-name">{record.name || record.category}</span><span className="collected-brand">{record.brand || '我的一杯'}</span><span className="collected-date">{record.date.replaceAll('-', '.')}</span>
        </button>)}</div> : <div className="collection-empty"><AaReaction /><p>第一张贴纸的位置，给你留好了。</p><button type="button" className="btn-small mt-4" onClick={() => openEditor()}>记下第一杯</button></div>}
      </>}
      {view === 'stamps' && <>
        <p className="mb-6 text-xs leading-loose text-muted">每个已记录的品牌一枚章，日期是现有记录中的第一次相遇。</p>
        {stamps.length ? <div className="stamp-shelf">{stamps.map((stamp, i) => <BrandStamp key={stamp.brand} stamp={stamp} index={i} onClick={() => { setBrand(stamp.brand); setView('stickers'); }} />)}</div> : <div className="collection-empty"><div className="empty-stamp">AA<br /><span>待盖章</span></div><p>记录时选个品牌，就会留下第一枚纪念章。</p><button type="button" className="btn-small mt-4" onClick={() => openEditor()}>去记一杯</button></div>}
      </>}
      <p className="collection-book-footer">{view === 'stickers' ? '属于 AA 的杯杯回忆' : '每一枚，都是喝过的印记'} · ♡</p>
    </div>
    <details className="collection-backup" open={error ? true : undefined}><summary>收好这本小账本 <span>备份 / 恢复记录</span></summary><BackupPage /></details>
  </section>;
}
