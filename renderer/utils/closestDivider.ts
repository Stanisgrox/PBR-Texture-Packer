export function closestDivider(n: number, start: number) {

    for (let i = Math.min(start, Math.floor(Math.sqrt(n))); i >= 1; i--) {
        if (n % i === 0) {
            return i;
        }
    }

    return 1;
}