import "./global.css"
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <RootNavigator />
    </GluestackUIProvider>
  );
}