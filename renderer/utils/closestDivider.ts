export function closestDivider(n: number, start: number) {

    for (start; start >= 1; start--) {
        if (n % start === 0) return start;
    }

    return 1;
}