import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#171717] justify-center items-center">
      <Text className="text-white text-xl">Profile</Text>
    </View>
  );
}