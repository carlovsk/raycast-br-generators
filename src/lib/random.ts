export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDigits(count: number): number[] {
  return Array.from({ length: count }, () => randomInt(0, 9));
}

export function pick<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)];
}
