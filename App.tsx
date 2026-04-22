import "./global.css"; 
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

// Import your screens
import Dashboard from "./src/screens/Dashboard";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens for your new tabs
function ToolsScreen() {
  return (
    <View className="flex-1 bg-[#171717] justify-center items-center">
      <Text className="text-white text-xl">Tools</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#171717] justify-center items-center">
      <Text className="text-white text-xl">Profile</Text>
    </View>
  );
}

function Store() {
  return (
    <View className="flex-1 bg-[#171717] justify-center items-center">
      <Text className="text-white text-xl">Store</Text>
    </View>
  );
}

function MainTabs() {
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

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="MainTabs" // App starts here
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}