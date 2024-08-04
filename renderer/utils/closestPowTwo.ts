export function nearestPowerOf2(n: number) {
    return 1 << 31 - Math.clz32(n);
}

export function blpo2(x: number) {
    x = x | (x >> 1);
    x = x | (x >> 2);
    x = x | (x >> 4);
    x = x | (x >> 8);
    x = x | (x >> 16);
    x = x | (x >> 32);
    return x - (x >> 1);
}