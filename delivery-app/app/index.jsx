import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import DeliveryDashboardScreen from "./DeliveryDashboardScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3bff90",
          },
          headerShown: false,
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: { backgroundColor: "#fffaef" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DeliveryDashboardScreen}
          options={{
            title: "Delivery Dashboard",
            headerLeft: null, // Prevents going back to login
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
