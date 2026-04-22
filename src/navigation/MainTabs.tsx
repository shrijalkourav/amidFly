import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your screens
import Dashboard from "../screens/Dashboard";
import ToolsScreen from "../screens/ToolsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Store from "../screens/Store";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#171717', borderTopColor: '#262626' },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#737373',
      }}
    >
      <Tab.Screen name="Devices" component={Dashboard} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
