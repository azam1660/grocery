import React from "react";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
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
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
