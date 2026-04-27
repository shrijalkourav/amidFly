import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import your screens
import Dashboard from "../screens/Dashboard";
import ToolsScreen from "../screens/ToolsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Store from "../screens/Store";

const Tab = createMaterialTopTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Devices"
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarShowIcon: true,
        tabBarStyle: { 
          backgroundColor: '#171717', 
          borderTopColor: '#262626',
          borderTopWidth: 1,
          paddingBottom: insets.bottom, // Prevents tabs from hiding under iOS home indicator
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#facc15', // The animated yellow slider
          height: 3, // Thickness of the slider
          top: 0, // Puts the slider at the top edge of the bottom tab bar
        },
        tabBarActiveTintColor: '#facc15',
        tabBarInactiveTintColor: '#737373',
        tabBarIcon: ({ color }) => {
          const size = 24; // Top tabs don't pass a default size, so we define it
          if (route.name === "Devices") {
            return <MaterialCommunityIcons name="quadcopter" size={size} color={color} />;
          } else if (route.name === "Tools") {
            return <MaterialCommunityIcons name="wrench" size={size} color={color} />;
          } else if (route.name === "Store") {
            return <MaterialCommunityIcons name="storefront" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <MaterialCommunityIcons name="account" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Devices" component={Dashboard} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
