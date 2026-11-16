import { Action, ActionPanel, Icon, Keyboard, List, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { formatAddress, generateAddress } from "./lib/address";

export default function Command() {
  const {
    data: address,
    isLoading,
    revalidate,
  } = usePromise(generateAddress, [], {
    onError: (error) => {
      showToast({ style: Toast.Style.Failure, title: "Could not generate address", message: error.message });
    },
  });

  const fields: { title: string; value: string; icon: Icon }[] = address
    ? [
        { title: "Full address", value: formatAddress(address), icon: Icon.Map },
        { title: "CEP", value: address.cep, icon: Icon.Hashtag },
        { title: "CEP (digits only)", value: address.cep.replace(/\D/g, ""), icon: Icon.Hashtag },
        { title: "Street", value: address.street, icon: Icon.Pin },
        { title: "Number", value: address.number, icon: Icon.Hashtag },
        { title: "Neighborhood", value: address.neighborhood, icon: Icon.House },
        { title: "City", value: address.city, icon: Icon.Building },
        { title: "State", value: address.state, icon: Icon.Flag },
      ]
    : [];

  return (
    <List isLoading={isLoading}>
      {fields.map((field) => (
        <List.Item
          key={field.title}
          icon={field.icon}
          title={field.value}
          subtitle={field.title}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={field.value} />
              <Action.Paste content={field.value} />
              <Action
                title="Generate New Address"
                icon={Icon.ArrowClockwise}
                shortcut={Keyboard.Shortcut.Common.Refresh}
                onAction={revalidate}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
