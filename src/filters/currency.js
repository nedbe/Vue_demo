// 處理數字格式，在數字前面加上$符號與每3位一點 $1,000
export default function (num) {
  const n = Number(num);
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
    return currency;
  })}`;
}
