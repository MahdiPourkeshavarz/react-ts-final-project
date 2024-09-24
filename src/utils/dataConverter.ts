export function numberWithCommas(x: number) {
  return new Intl.NumberFormat("fa-IR").format(x);
}
