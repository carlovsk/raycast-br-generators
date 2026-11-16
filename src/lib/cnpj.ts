import { pick, randomDigits } from "./random";

const WEIGHTS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_2 = [6, ...WEIGHTS_1];
const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Receita Federal rule: each character counts as its ASCII code minus 48,
// so digits keep their value and letters A..Z become 17..42.
function charValue(char: string): number {
  return char.charCodeAt(0) - 48;
}

function checkDigit(chars: string[], weights: number[]): number {
  const sum = chars.reduce((acc, char, i) => acc + charValue(char) * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCnpj(alphanumeric = false): string {
  let root: string[];
  do {
    root = alphanumeric ? Array.from({ length: 8 }, () => pick(ALPHANUMERIC.split(""))) : randomDigits(8).map(String);
  } while (root.every((c) => c === root[0]));

  // Branch 0001 is the head office, same as most generators.
  const base = [...root, "0", "0", "0", "1"];
  const d1 = checkDigit(base, WEIGHTS_1);
  const d2 = checkDigit([...base, String(d1)], WEIGHTS_2);
  return [...base, d1, d2].join("");
}

export function formatCnpj(cnpj: string): string {
  return cnpj.replace(/^(\w{2})(\w{3})(\w{3})(\w{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}
