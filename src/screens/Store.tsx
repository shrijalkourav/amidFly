import React from "react";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

export default function Store() {
  // Mock data for store categories 
  // Using images curated from your Dashboard and a few additional unsplash placeholders
  const storeCategories = [
    { name: "Motors", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop" },
    { name: "Props", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=300&h=300&fit=crop" },
    { name: "Batteries", image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=300&h=300&fit=crop" },
    { name: "Frames", image: "https://images.unsplash.com/photo-1583122622475-10495f32eaeb?w=300&h=300&fit=crop" },
    { name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=300&h=300&fit=crop" },
  ];

  return (
    <Box className="flex-1 bg-black px-6 pt-16">
      <Heading className="text-white text-3xl font-bold mb-8">
        Store
      </Heading>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Featured Hero Banner */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          className="mb-8" 
          onPress={() => console.log("Hero Banner Pressed")}
        >
          <Box className="bg-gray-900 rounded-3xl overflow-hidden w-full">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1508614589041-895b88991e3e" }}
              className="w-full h-40"
              resizeMode="cover"
            />
            <Box className="p-5">
              <Heading className="text-white text-xl mb-1">New AMID's Parts</Heading>
              <Text className="text-yellow-400 text-sm font-semibold">Shop Now -></Text>
            </Box>
          </Box>
        </TouchableOpacity>

        <Heading className="text-white text-xl font-bold mb-4">
          Categories
        </Heading>

        {/* Horizontal Scroll View for Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row pb-10">
          {storeCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log(`${item.name} pressed`)}
              activeOpacity={0.7}
              className="mr-4"
            >
              <Box className="w-36 p-4 bg-gray-900 rounded-3xl items-center justify-center min-h-[160px]">
                <Box className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden mb-4 border-2 border-transparent hover:border-yellow-400">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </Box>
                <Text className="text-white text-sm font-semibold text-center">
                  {item.name}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>
    </Box>
  );
}