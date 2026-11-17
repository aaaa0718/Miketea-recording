import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, ICES, SUGARS, validRecord } from '../lib/records.js';
import { useDiary } from '../state/DiaryContext.jsx';
import PhotoEditor from './PhotoEditor.jsx';

export default function RecordEditor({ record, date }) {
  const { records, save, remove, closeEditor } = useDiary();
  const [form, setForm] = useState(() => record ? { ...record } : { id: crypto.randomUUID(), date, category: '鲜奶茶', brand: '', name: '', sugar: '未选择', ice: '未选择', note: '', photo: '' });
  const [custom, setCustom] = useState(false), [customCategory, setCustomCategory] = useState('');
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const dialog = useRef(null);
  const categories = [...new Set([...CATEGORIES, ...records.map(row => row.category)])];
  const change = (key, value) => setForm(previous => ({ ...previous, [key]: value }));
  useEffect(() => {
    const element = dialog.current, previousFocus = document.activeElement;
    element.showModal();
    return () => { element.close(); previousFocus?.focus?.(); };
  }, []);
  function submit(event) {
    event.preventDefault(); if (busy) return;
    const next = { ...form, category: (custom ? customCategory : form.category).trim(), name: form.name.trim(), brand: form.brand.trim(), note: form.note.trim() };
    if (!validRecord(next)) { setError('请填写有效日期和品类，并检查照片大小。'); return; }
    try { save(next); closeEditor(); } catch (error) { setError(error.message); }
  }
  function deleteRecord() {
    if (!window.confirm('确定删除这杯记录吗？')) return;
    try { remove(record.id); closeEditor(); } catch (error) { setError(error.message); }
  }
  return <dialog ref={dialog} onCancel={event => { event.preventDefault(); closeEditor(); }} className="record-dialog">
    <form onSubmit={submit}>
      <div className="flex items-center justify-between gap-4"><h2 className="text-lg font-medium">{record ? '编辑这杯记录' : '今天这杯是？'}</h2><button className="btn-icon" type="button" aria-label="关闭" onClick={closeEditor}>×</button></div>
      <p className="mb-5 mt-1 text-xs text-muted">日期、品类填一下，其他随意。</p>
      <PhotoEditor photo={form.photo} onChange={value => change('photo', value)} onBusy={setBusy} />
      <div className="mt-5 grid grid-cols-2 gap-4">
        <label className="field col-span-2 sm:col-span-1">日期 *<input name="date" type="date" required value={form.date} onChange={event => change('date', event.target.value)} /></label>
        <label className="field col-span-2 sm:col-span-1">品类 *<select name="category" value={custom ? '__custom' : form.category} onChange={event => { setCustom(event.target.value === '__custom'); if (event.target.value !== '__custom') change('category', event.target.value); }}>{categories.map(c => <option key={c}>{c}</option>)}<option value="__custom">＋ 自定义品类</option></select></label>
        {custom && <label className="field col-span-2">自定义品类 *<input autoFocus required maxLength={20} value={customCategory} onChange={event => setCustomCategory(event.target.value)} placeholder="例如：酸奶饮品" /></label>}
        <label className="field">品牌<input name="brand" maxLength={40} value={form.brand} onChange={event => change('brand', event.target.value)} placeholder="哪家店的？" /></label>
        <label className="field">饮品名<input name="name" maxLength={60} value={form.name} onChange={event => change('name', event.target.value)} placeholder="这杯叫什么名字？" /></label>
        <label className="field">甜度<select name="sugar" value={form.sugar} onChange={event => change('sugar', event.target.value)}>{[...new Set([...SUGARS, form.sugar])].map(s => <option key={s}>{s}</option>)}</select></label>
        <label className="field">冰量<select name="ice" value={form.ice} onChange={event => change('ice', event.target.value)}>{[...new Set([...ICES, form.ice])].map(s => <option key={s}>{s}</option>)}</select></label>
        <label className="field col-span-2">备注<textarea name="note" rows={3} maxLength={200} value={form.note} onChange={event => change('note', event.target.value)} placeholder="夸两句，或者吐槽一下。" /></label>
      </div>
      {error && <p className="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-900" role="alert">{error}</p>}
      <div className="mt-6 flex justify-between gap-4">{record ? <button type="button" className="text-xs text-rose-800" onClick={deleteRecord} disabled={busy}>删除这杯</button> : <span />}<button type="submit" className="btn-primary" disabled={busy}>{busy ? '贴纸处理中…' : '保存记录'}</button></div>
    </form>
  </dialog>;
}
