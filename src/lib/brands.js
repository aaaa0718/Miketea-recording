export const BRANDS = [
  ['喜茶', '喜', '#222222', 'heytea'], ['霸王茶姬', '姬', '#a72b32', 'chagee'],
  ['古茗', '茗', '#276349', 'guming'], ['茶百道', '茶', '#3264a3', 'chabaidao'],
  ['沪上阿姨', '沪', '#bd324e', 'hushang'], ['蜜雪冰城', '雪', '#c92e39', 'mixue'],
  ['奈雪的茶', '奈', '#778437', 'nayuki'], ['茶颜悦色', '颜', '#93453e', 'chayan'],
  ['一点点', '點', '#286147', 'yidiandian'], ['CoCo都可', 'CoCo', '#d86e28', 'coco'],
  ['瑞幸咖啡', 'luckin', '#213b73', 'luckin'], ['星巴克', '★', '#14654d', 'starbucks'],
].map(([name, mark, color, id]) => ({ name, mark, color, id, logo: ({heytea: 'webp', chagee: 'png', guming: 'ico', mixue: 'ico', yidiandian: 'png', luckin: 'png', starbucks: 'png'})[id] }));
export function recentBrands(records) {
  return [...new Set([...records].sort((a, b) => b.date.localeCompare(a.date)).map(row => row.brand.trim()).filter(Boolean))].slice(0, 4);
}
