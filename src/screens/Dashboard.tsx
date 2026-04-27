import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Fab, FabIcon } from '@/components/ui/fab';
import { Icon, AddIcon, MenuIcon, InfoIcon } from '@/components/ui/icon';

export default function Dashboard({ navigation }: any) {
  // Mock data for devices
  const devices = [
    {
      id: '1',
      name: "AMID's TurtleFly v0",
      lastCharged: "20-04-26",
      battery: "70%",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
    },
    {
      id: '2',
      name: "AMID's Falcon v1",
      lastCharged: "18-04-26",
      battery: "45%",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
    },
  ];

  // Mock data for recent flights
  const recentFlights = [
    { id: '1', drone: "TurtleFly v0", date: "Today, 14:30", duration: "12m 45s", status: "Success" },
    { id: '2', drone: "Falcon v1", date: "Yesterday, 09:15", duration: "08m 20s", status: "Warning" },
    { id: '3', drone: "TurtleFly v0", date: "18 Apr, 16:00", duration: "15m 10s", status: "Success" },
  ];

  // Mock data for store items matching the "Shop for more" vibe
  const storeItems = [
    { id: '1', name: "Motors", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop" },
    { id: '2', name: "Props", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=300&h=300&fit=crop" },
    { id: '3', name: "Batteries", image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=300&h=300&fit=crop" },
  ];

  return (
    <Box className="flex-1 bg-black px-6 pt-16">
      {/* Header Area */}
      <HStack className="justify-between items-center mb-6">
        <Icon as={MenuIcon} size="xl" className="text-white" />
        <Heading className="text-white text-2xl font-bold">amidFly</Heading>
        <Box className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
           <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }} 
            className="w-full h-full" 
           />
        </Box>
      </HStack>

      {/* Main Scrollable Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Announcements Section */}
        <VStack space="md" className="mb-10">
          <Heading className="text-white text-xl font-semibold">Announcements</Heading>
          <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("Announcement pressed")}>
            <Box className="bg-gray-900 p-4 rounded-2xl">
                <HStack space="md" className="items-center">
                    <Icon as={InfoIcon} size="xl" className="text-yellow-400" />
                    <VStack className="flex-1">
                        <Heading className="text-white text-base">New Firmware Update Available!</Heading>
                        <Text className="text-gray-400 text-sm mt-1">Update to v1.2.3 for improved flight stability and new features.</Text>
                    </VStack>
                </HStack>
            </Box>
          </TouchableOpacity>
        </VStack>

        {/* Hero Section: My Devices Carousel */}
        <VStack space="md" className="mb-10">
          <Heading className="text-white text-xl font-semibold">My Devices ({devices.length})</Heading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {devices.map((device) => (
              <TouchableOpacity 
                key={device.id} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate("DeviceDetails", { device })}
              >
                <Box className="bg-gray-900 rounded-3xl p-4 mr-4 w-80">
                  <Image 
                    source={{ uri: device.image }} 
                    className="w-full h-40 rounded-2xl mb-4"
                    resizeMode="cover"
                  />
                  <VStack>
                    <Heading className="text-white text-lg">{device.name}</Heading>
                    <Text className="text-gray-500 text-xs">Last Charged : {device.lastCharged}</Text>
                    <Text className="text-gray-500 text-xs">Battery : {device.battery}</Text>
                  </VStack>
                </Box>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </VStack>

        {/* Last Flights Section */}
        <VStack space="md" className="mb-10">
          <HStack className="justify-between items-center mb-2">
            <Heading className="text-white text-xl font-semibold">Last Flights</Heading>
            <TouchableOpacity>
              <Text className="text-yellow-400 text-sm font-medium">View All</Text>
            </TouchableOpacity>
          </HStack>
          
          <VStack space="sm">
            {recentFlights.map((flight) => (
              <Box key={flight.id} className="bg-gray-900 p-4 rounded-2xl flex-row justify-between items-center">
                <VStack>
                  <Heading className="text-white text-base">{flight.drone}</Heading>
                  <Text className="text-gray-500 text-xs">{flight.date}</Text>
                </VStack>
                <VStack className="items-end">
                  <Text className="text-white text-sm font-medium">{flight.duration}</Text>
                  <Text className={flight.status === 'Success' ? "text-green-400 text-xs" : "text-yellow-400 text-xs"}>
                    {flight.status}
                  </Text>
                </VStack>
              </Box>
            ))}
          </VStack>
        </VStack>

      </ScrollView>

      {/* Floating Action Button */}
      <Fab
        size="lg"
        placement="bottom center"
        className="bg-white mb-6 rounded-full shadow-lg absolute"
        onPress={() => console.log("Add Device")}
      >
        <FabIcon as={AddIcon} className="text-black w-8 h-8" />
      </Fab>
    </Box>
  );
}