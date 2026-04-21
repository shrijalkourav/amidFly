import "./global.css"; 
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
import Dashboard from "./src/screens/Dashboard";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login" // App starts here
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}