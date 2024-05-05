export function msToTime(duration: number): string {
    const addLeadingZero = (n: number): string => n < 10 ? '0' + n : '' + n;

    const seconds = addLeadingZero(Math.floor((duration / 1000) % 60));
    const minutes = addLeadingZero(Math.floor((duration / (1000 * 60)) % 60));
    const hours = addLeadingZero(Math.floor((duration / (1000 * 60 * 60)) % 24));

    return `${hours}:${minutes}:${seconds}`;
}