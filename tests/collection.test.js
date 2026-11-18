import test from 'node:test';
import assert from 'node:assert/strict';
import { brandStamps } from '../src/lib/collection.js';

test('品牌章由已有记录派生，去空白、合并品牌并采用最早日期', () => {
  const records = [{ brand: ' 喜茶 ', date: '2026-11-18' }, { brand: '喜茶', date: '2026-11-16' }, { brand: '', date: '2026-11-15' }, { brand: '小店', date: '2026-11-17' }];
  assert.deepEqual(brandStamps(records), [{ brand: '小店', date: '2026-11-17', count: 1 }, { brand: '喜茶', date: '2026-11-16', count: 2 }]);
  assert.equal(records[0].brand, ' 喜茶 ');
});
test('删除或修改记录后重新计算印章，没有虚构或残留的收藏', () => {
  assert.deepEqual(brandStamps([]), []);
  assert.deepEqual(brandStamps([{ brand: '咖啡店', date: '2026-11-18' }]), [{ brand: '咖啡店', date: '2026-11-18', count: 1 }]);
});
