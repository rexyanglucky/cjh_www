export function stringTruncat(str: string, num: number, fill: string) {
  fill = fill || '...';
  num = num || 6;
  return str.length > num ? str.substring(0, num) + fill : str;
}
// 字符串补齐 12 --> 000000012
export function prefixNum(num: string, length?: number) {
  length = length || 8;
  return (Array(length).join('0') + num).slice(-length);
}

export function numberToLetter(val: number): string {
  const charCode = 65;
  if (val <= 26 && val >= 0) {
    return String.fromCharCode(+val + charCode);
  } else {
    return val.toString();
    // throw new CustomError(
    //   'params is not valide',
    //   `numbers range is 1-26, unexception value ${val}`
    // );
  }
}
