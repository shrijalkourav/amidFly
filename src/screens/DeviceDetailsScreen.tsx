import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon, SettingsIcon } from '@/components/ui/icon';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeviceDetailsScreen({ navigation, route }: any) {
  // Receive device data from navigation, with a fallback just in case
  const device = route?.params?.device || {
    id: '1',
    name: "AMID's TurtleFly v0",
    lastCharged: "20-04-26",
    battery: "70%",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
  };

  // Enriched mock data based on the device
  const enrichedDevice = {
    ...device,
    firmware: "v4.4.2",
    flightTime: "12h 45m",
    status: "Ready to Fly"
  };

  const recentFlights = [
    { id: '1', date: "Today, 14:30", duration: "12m 45s", status: "Success" },
    { id: '2', date: "18 Apr, 16:00", duration: "15m 10s", status: "Success" },
    { id: '3', date: "15 Apr, 10:20", duration: "05m 30s", status: "Warning" },
  ];

  return (
    <Box className="flex-1 bg-black">
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Top Header */}
        <HStack className="px-6 py-4 justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          <Heading className="text-white text-xl font-bold">Device Details</Heading>
          <TouchableOpacity className="p-2 -mr-2">
            <Icon as={SettingsIcon} size="xl" className="text-white" />
          </TouchableOpacity>
        </HStack>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Device Image Hero */}
          <Box className="w-full h-64 bg-gray-900 rounded-b-[40px] overflow-hidden mb-8">
            <Image 
              source={{ uri: enrichedDevice.image }} 
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Overlay Status Bubble */}
            <Box className="absolute top-4 right-4 bg-black/60 px-4 py-2 rounded-full">
              <Text className="text-yellow-400 font-semibold text-sm">{enrichedDevice.status}</Text>
            </Box>
          </Box>

          <Box className="px-6">
            <Heading className="text-white text-3xl font-bold mb-2">{enrichedDevice.name}</Heading>
            
            {/* Quick Stats Grid */}
            <HStack className="flex-wrap justify-between mt-6 mb-8">
              <Box className="w-[48%] bg-gray-900 p-4 rounded-3xl mb-4">
                <Text className="text-gray-400 text-xs mb-1">Battery Level</Text>
                <Heading className="text-yellow-400 text-2xl">{enrichedDevice.battery}</Heading>
                <Text className="text-gray-500 text-xs mt-1">Last charged: {enrichedDevice.lastCharged}</Text>
              </Box>
              <Box className="w-[48%] bg-gray-900 p-4 rounded-3xl mb-4">
                <Text className="text-gray-400 text-xs mb-1">Total Flight Time</Text>
                <Heading className="text-white text-2xl">{enrichedDevice.flightTime}</Heading>
              </Box>
              <Box className="w-[48%] bg-gray-900 p-4 rounded-3xl justify-center">
                <Text className="text-gray-400 text-xs mb-1">Firmware</Text>
                <Heading className="text-white text-xl">{enrichedDevice.firmware}</Heading>
              </Box>
              <Box className="w-[48%] bg-gray-900 p-4 rounded-3xl justify-center items-center">
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-blue-400 font-semibold">Check Updates</Text>
                </TouchableOpacity>
              </Box>
            </HStack>

            {/* Device Last Flights */}
            <VStack space="md" className="mb-4">
              <Heading className="text-white text-xl font-semibold mb-2">Flight History</Heading>
              <VStack space="sm">
                {recentFlights.map((flight) => (
                  <Box key={flight.id} className="bg-gray-900 p-4 rounded-2xl flex-row justify-between items-center">
                    <VStack>
                      <Heading className="text-white text-base">{flight.date}</Heading>
                      <Text className="text-gray-500 text-xs">Duration: {flight.duration}</Text>
                    </VStack>
                    <VStack className="items-end">
                      <Text className={flight.status === 'Success' ? "text-green-400 text-sm font-medium" : "text-yellow-400 text-sm font-medium"}>
                        {flight.status}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}