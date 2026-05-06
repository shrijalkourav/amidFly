import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Animated, PanResponder, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

/**
 * Reusable Virtual Joystick Component
 */
interface JoystickProps {
  onMove: (position: { x: number; y: number }) => void;
  radius?: number;
}

const Joystick: React.FC<JoystickProps> = ({ onMove, radius = 75 }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const knobRadius = radius / 2;
  const maxDistance = radius - knobRadius;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const distance = Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
        let x = gestureState.dx;
        let y = gestureState.dy;

        // Clamp movement to the outer circle's boundaries
        if (distance > maxDistance) {
          x = (x / distance) * maxDistance;
          y = (y / distance) * maxDistance;
        }

        pan.setValue({ x, y });

        // Normalize output from -1.0 to 1.0 (Inverting Y so UP is positive)
        onMove({
          x: x / maxDistance,
          y: -y / maxDistance,
        });
      },
      onPanResponderRelease: () => {
        // Auto-center the joystick when released
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
          friction: 5,
        }).start();
        
        onMove({ x: 0, y: 0 });
      },
    })
  ).current;

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          pan.getTranslateTransform(),
          {
            width: knobRadius * 2,
            height: knobRadius * 2,
            borderRadius: knobRadius,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          },
        ]}
      />
    </View>
  );
};

export default function Controller() {
  const navigation = useNavigation<any>();
  const [flightMode, setFlightMode] = useState("GPS");
  const { width, height } = useWindowDimensions();

  // Calculate dimensions to force a landscape layout programmatically
  const isPortrait = height > width;
  const containerWidth = isPortrait ? height : width;
  const containerHeight = isPortrait ? width : height;

  // Handlers for drone controls
  const handleLeftStick = (pos: { x: number; y: number }) => {
    // Left stick typically controls Yaw (x) and Throttle (y)
    // console.log(`Throttle: ${pos.y.toFixed(2)} | Yaw: ${pos.x.toFixed(2)}`);
  };

  const handleRightStick = (pos: { x: number; y: number }) => {
    // Right stick typically controls Roll (x) and Pitch (y)
    // console.log(`Pitch: ${pos.y.toFixed(2)} | Roll: ${pos.x.toFixed(2)}`);
  };

  return (
    <Box className="flex-1 bg-black items-center justify-center">
      {/* Main Controller Layout (Forced Landscape Container) */}
      <Box 
        style={{
          width: containerWidth,
          height: containerHeight,
          transform: isPortrait ? [{ rotate: "90deg" }] : [],
        }}
        className="flex-row items-center justify-between px-12"
      >
        
        {/* Back Button (Positioned Top Left Relative to Landscape Perspective) */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="absolute top-6 left-12 z-50 bg-gray-900 px-4 py-2 rounded-full border border-gray-700"
        >
          <Text className="text-white text-xs font-bold">BACK</Text>
        </TouchableOpacity>

        {/* Left Joystick: Throttle / Yaw */}
        <VStack className="items-center z-10 mt-6">
          <Text className="text-gray-400 font-bold mb-4">THROTTLE / YAW</Text>
          <Joystick onMove={handleLeftStick} />
        </VStack>

        {/* Center Console: Essential Flight Options */}
        <VStack className="flex-1 px-8 items-center justify-between h-full py-10 z-10">
          
          {/* Telemetry Display */}
          <HStack className="w-full justify-around bg-gray-900 p-3 rounded-xl border border-gray-800">
            <Text className="text-green-400 font-mono text-sm font-bold">ALT: 12.4m</Text>
            <Text className="text-yellow-400 font-mono text-sm font-bold">SPD: 5.2m/s</Text>
            <Text className="text-blue-400 font-mono text-sm font-bold">BAT: 84%</Text>
          </HStack>

          {/* Primary Action Buttons */}
          <HStack space="xl" className="items-center">
            <TouchableOpacity className="bg-gray-800 w-16 h-16 rounded-full border border-gray-600 items-center justify-center">
              <Text className="text-white text-xs font-bold">RTH</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-red-600 w-20 h-20 rounded-full border-2 border-red-800 items-center justify-center shadow-lg shadow-red-500/50">
              <Text className="text-white text-sm font-extrabold">STOP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-blue-600 w-16 h-16 rounded-full border border-green-800 items-center justify-center">
              <Text className="text-white text-xs font-bold text-center">TAKE OFF</Text>
            </TouchableOpacity>
          </HStack>

          {/* Flight Mode Toggle */}
          <HStack className="bg-gray-900 rounded-full p-1 border border-gray-800">
            {["GPS", "ATTI", "SPORT"].map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => setFlightMode(mode)}
                className={`px-6 py-2 rounded-full ${flightMode === mode ? "bg-white" : "bg-transparent"}`}
              >
                <Text className={`text-xs font-bold ${flightMode === mode ? "text-black" : "text-gray-400"}`}>{mode}</Text>
              </TouchableOpacity>
            ))}
          </HStack>
        </VStack>

        {/* Right Joystick: Pitch / Roll */}
        <VStack className="items-center z-10 mt-6">
          <Text className="text-gray-400 font-bold mb-4">PITCH / ROLL</Text>
          <Joystick onMove={handleRightStick} />
        </VStack>
        
      </Box>
    </Box>
  );
}
