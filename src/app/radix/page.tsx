import { ExchangeRadixSection } from "@/containers/radix/exchange-radix-section/exchange-radix-section";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function Radix() {
  return (
    <Theme
      accentColor="blue"
      grayColor="slate"
      style={{ height: "100%" }}
      radius="medium"
      panelBackground="translucent"
      appearance="dark"
    >
      <main>
        <ExchangeRadixSection />
      </main>
    </Theme>
  );
}
