import { getPreferenceValues } from "@raycast/api";
import { formatCpf, generateCpf } from "./lib/cpf";
import { deliver } from "./lib/output";

export default async function Command() {
  const { formatted } = getPreferenceValues<Preferences.GenerateCpf>();
  const cpf = generateCpf();
  await deliver(formatted ? formatCpf(cpf) : cpf, "CPF");
}
