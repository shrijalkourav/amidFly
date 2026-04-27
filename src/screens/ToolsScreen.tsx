import React from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon, AddIcon, MenuIcon } from "@/components/ui/icon";

export default function ToolsScreen() {
  const navigation = useNavigation<any>();

  // Array of tools. You can expand this as your app grows.
  const tools: Array<{ name: string; icon: any; screen?: string }> = [
    { name: "FC Firmware Recovery", icon: AddIcon },
    { name: "BLHeli_S Configurator", icon: MenuIcon },
    { name: "ELRS Configurator", icon: AddIcon },
    { name: "Blackbox Analyzer", icon: MenuIcon }, // Added for visual balance
    { name: "Controller", icon: MenuIcon, screen: "Controller" },
  ];

  return (
    <Box className="flex-1 bg-black px-6 pt-16">
      <Heading className="text-white text-3xl font-bold mb-8">
        Toolbox
      </Heading>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* flex-wrap allows items to drop to the next line. justify-between aligns the 2-column grid */}
        <HStack className="flex-wrap justify-between pb-20">
          {tools.map((tool, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => {
                if (tool.screen) {
                  navigation.navigate(tool.screen);
                } else {
                  console.log(`${tool.name} pressed`);
                }
              }}
              activeOpacity={0.7}
              className="w-[48%] mb-4"
            >
              {/* Updated Card Styling: 
                - bg-gray-900 to match the Dashboard drone cards 
                - rounded-3xl for that modern, bubbly SpeedyBee look 
              */}
              <Box className="w-full p-5 bg-gray-900 rounded-3xl items-center justify-center min-h-[140px]">
                
                {/* Icon Container with subtle background and Yellow accent */}
                <Box className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center mb-4">
                  <Icon as={tool.icon} size="xl" className="text-yellow-400" />
                </Box>
                
                <Text className="text-white text-sm font-semibold text-center">
                  {tool.name}
                </Text>
              </Box>
            </TouchableOpacity>
            
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
}