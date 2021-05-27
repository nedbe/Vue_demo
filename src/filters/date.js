// 將日期數值轉為西元年月日
export default function (time) {
  const date = new Date(time * 1000);
  return date.toLocaleDateString();
}
