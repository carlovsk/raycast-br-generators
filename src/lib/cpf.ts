import { randomDigits } from "./random";

function checkDigit(digits: number[]): number {
  const firstWeight = digits.length + 1;
  const sum = digits.reduce((acc, digit, i) => acc + digit * (firstWeight - i), 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCpf(): string {
  let base: number[];
  // Sequences of one repeated digit (111.111.111-11) pass the checksum but are invalid.
  do {
    base = randomDigits(9);
  } while (base.every((d) => d === base[0]));

  const d1 = checkDigit(base);
  const d2 = checkDigit([...base, d1]);
  return [...base, d1, d2].join("");
}

export function formatCpf(cpf: string): string {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
