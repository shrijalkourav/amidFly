import React from "react";
import { TouchableOpacity, ScrollView, Image } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { 
  Icon, 
  SettingsIcon, 
  PhoneIcon, 
  CalendarDaysIcon, 
  MenuIcon, 
  InfoIcon 
} from "@/components/ui/icon";

export default function ProfileScreen() {
  // Tweaked some names to fit the Ground Station "Tech" vibe better
  const menuItems = [
    { name: "Account Info", icon: InfoIcon },
    { name: "My Devices", icon: MenuIcon },
    { name: "Flight Logs", icon: CalendarDaysIcon }, // Changed from "Orders"
    { name: "Settings", icon: SettingsIcon },
    { name: "Support", icon: PhoneIcon },
    { name: "About amidFly", icon: InfoIcon }, // Added a 6th item to balance the 2-column grid
  ];

  return (
    <Box className="flex-1 bg-black px-6 pt-16">
      <Heading className="text-white text-3xl font-bold mb-8">
        Pilot Profile
      </Heading>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Tech Profile Hero Section */}
        <VStack className="items-center bg-gray-900 rounded-3xl p-6 mb-8">
          {/* Avatar with a yellow tech-ring */}
          <Box className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden mb-4 border-2 border-yellow-400">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }} 
              className="w-full h-full" 
            />
          </Box>
          <Heading className="text-white text-xl font-bold">Shrajal Kaurav</Heading>
          <Text className="text-yellow-400 text-sm font-medium mt-1">Pro Pilot License Active</Text>
        </VStack>

        {/* Grid View for Menu Items (Matching Tools Screen) */}
        <HStack className="flex-wrap justify-between">
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => console.log(`${item.name} pressed`)} 
              activeOpacity={0.7}
              className="w-[48%] mb-4"
            >
              {/* Using the established bg-gray-900 and rounded-3xl for uniformity */}
              <Box className="w-full p-5 bg-gray-900 rounded-3xl items-center justify-center min-h-[140px]">
                
                {/* Subtle background behind the yellow icons */}
                <Box className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center mb-4">
                  <Icon as={item.icon} size="xl" className="text-yellow-400" />
                </Box>
                
                <Text className="text-white text-sm font-semibold text-center">
                  {item.name}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </HStack>

      </ScrollView>
    </Box>
  );
}