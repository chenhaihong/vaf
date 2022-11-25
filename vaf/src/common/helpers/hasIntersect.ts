// 2个数组是否有交集
function hasIntersect<T>(a: T[], b: T[]): boolean {
  if (Array.isArray(a) && a.length && Array.isArray(b) && b.length) {
    for (const item of a) {
      if (b.includes(item)) return true;
    }
  }
  return false;
}

export default hasIntersect;
