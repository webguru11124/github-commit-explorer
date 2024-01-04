export function formatNumberAsK(num:number) {
  return `${(num / 1000).toFixed(1)}k`;
}
