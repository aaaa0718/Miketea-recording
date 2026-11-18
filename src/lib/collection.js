export function brandStamps(records) {
  const groups = new Map();
  for (const record of records) {
    const brand = record.brand.trim();
    if (!brand) continue;
    const stamp = groups.get(brand);
    if (stamp) { stamp.count++; if (record.date < stamp.date) stamp.date = record.date; }
    else groups.set(brand, { brand, count: 1, date: record.date });
  }
  return [...groups.values()].sort((a, b) => b.date.localeCompare(a.date) || a.brand.localeCompare(b.brand, 'zh-CN'));
}
