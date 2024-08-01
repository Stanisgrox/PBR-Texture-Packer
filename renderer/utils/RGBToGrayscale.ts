export function RGBToGrayScale(red: number, green: number, blue: number){
  return (red * 6966 + green * 23436 + blue * 2366) >> 15;
}