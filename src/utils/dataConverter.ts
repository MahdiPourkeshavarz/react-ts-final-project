export function numberWithCommas(x: number) {
  return new Intl.NumberFormat("fa-IR").format(x);
}

export const convertNumberToPersian = (number: number | string) => {
  const persianNumber = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/[0-9]/g, function (w) {
    return persianNumber[+w];
  });
};
