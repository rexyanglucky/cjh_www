export function formatSecond(second: number) {
  const h = Math.floor(second / 3600);
  const m = Math.floor((second % 3600) / 60);
  const s = second % 60;
  const hstr = h > 0 ? `${h}小时` : '';
  const sstr = s > 0 ? `${s}秒` : '';
  const mstr = m > 0 ? `${m}分` : '';
  return `${hstr}${mstr}${sstr}`;
}
