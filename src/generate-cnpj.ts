import { getPreferenceValues } from "@raycast/api";
import { formatCnpj, generateCnpj } from "./lib/cnpj";
import { deliver } from "./lib/output";

export default async function Command() {
  const { formatted, alphanumeric } = getPreferenceValues<Preferences.GenerateCnpj>();
  const cnpj = generateCnpj(alphanumeric);
  await deliver(formatted ? formatCnpj(cnpj) : cnpj, "CNPJ");
}
