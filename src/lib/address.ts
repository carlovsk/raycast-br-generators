import { pick, randomInt } from "./random";

export interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface ViaCepResult {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const CITIES: readonly [string, string][] = [
  ["SP", "São Paulo"],
  ["SP", "Campinas"],
  ["SP", "Santos"],
  ["RJ", "Rio de Janeiro"],
  ["RJ", "Niterói"],
  ["MG", "Belo Horizonte"],
  ["PR", "Curitiba"],
  ["RS", "Porto Alegre"],
  ["SC", "Florianópolis"],
  ["BA", "Salvador"],
  ["PE", "Recife"],
  ["CE", "Fortaleza"],
  ["GO", "Goiânia"],
  ["DF", "Brasília"],
  ["AM", "Manaus"],
  ["PA", "Belém"],
  ["ES", "Vitória"],
  ["MT", "Cuiabá"],
  ["MS", "Campo Grande"],
  ["PB", "João Pessoa"],
];

// ViaCEP's street search needs at least 3 characters; these are common in every city.
const STREET_TERMS = ["Brasil", "Santos", "Silva", "Flores", "José", "Paulo", "Maria", "Pedro", "Rio", "Nova"];

async function search(state: string, city: string, term: string): Promise<ViaCepResult[]> {
  const url = `https://viacep.com.br/ws/${state}/${encodeURIComponent(city)}/${encodeURIComponent(term)}/json/`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`ViaCEP returned HTTP ${response.status}`);
  const data = (await response.json()) as ViaCepResult[] | { erro: boolean };
  // Suffixes 900-999 are special CEPs (large users, post offices, PO boxes), not street addresses.
  return Array.isArray(data) ? data.filter((r) => r.logradouro && r.bairro && Number(r.cep.slice(-3)) < 900) : [];
}

export async function generateAddress(): Promise<Address> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const [state, city] = pick(CITIES);
    const results = await search(state, city, pick(STREET_TERMS));
    if (results.length === 0) continue;

    const r = pick(results);
    return {
      cep: r.cep,
      street: r.logradouro,
      number: String(randomInt(1, 2500)),
      complement: "",
      neighborhood: r.bairro,
      city: r.localidade,
      state: r.uf,
    };
  }
  throw new Error("ViaCEP returned no addresses, try again");
}

export function formatAddress(a: Address): string {
  return `${a.street}, ${a.number} - ${a.neighborhood}, ${a.city} - ${a.state}, ${a.cep}`;
}
