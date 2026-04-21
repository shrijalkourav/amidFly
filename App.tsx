import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#171717" }}>
        <Box className="flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-[400px] p-6 bg-neutral-800 rounded-xl border border-neutral-700">
            <Text className="text-2xl font-bold text-white mb-4 text-center">
              amidFly Command
            </Text>
            
            <Box className="flex-row justify-between mb-6">
              <Box className="items-center">
                <Text className="text-gray-400 text-sm">Altitude (AGL)</Text>
                <Text className="text-green-400 font-mono text-xl">120m</Text>
              </Box>
              <Box className="items-center">
                <Text className="text-gray-400 text-sm">Link Quality</Text>
                <Text className="text-green-400 font-mono text-xl">98%</Text>
              </Box>
            </Box>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full mb-4 rounded-lg">
              <ButtonText>Initiate Auto-Mission</ButtonText>
            </Button>

            <Button size="lg" variant="outline" className="border-red-500 w-full rounded-lg">
              <ButtonText className="text-red-500">Emergency RTL</ButtonText>
            </Button>
          </Card>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}