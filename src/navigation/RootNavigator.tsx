import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens and tabs
import Login from "../screens/Login";
import MainTabs from "./MainTabs";
import DeviceDetailsScreen from "../screens/DeviceDetailsScreen";
import Controller from "../screens/Controller";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="MainTabs" // App starts here
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="DeviceDetails" component={DeviceDetailsScreen} />
        <Stack.Screen name="Controller" component={Controller} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
