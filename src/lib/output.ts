import { Clipboard, getPreferenceValues, showHUD } from "@raycast/api";

export async function deliver(value: string, label: string): Promise<void> {
  const { action } = getPreferenceValues<Preferences>();
  if (action === "paste") {
    await Clipboard.paste(value);
    await showHUD(`Pasted ${label}: ${value}`);
  } else {
    await Clipboard.copy(value);
    await showHUD(`Copied ${label}: ${value}`);
  }
}
