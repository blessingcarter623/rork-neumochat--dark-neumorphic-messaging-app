import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // We can add custom fonts here if needed
  });

  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: Colors.dark.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </View>
    );
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
          <StatusBar style="light" />
          <RootLayoutNav />
        </View>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.dark.background,
        },
        headerTintColor: Colors.dark.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: Colors.dark.background,
        },
      }}
    >
      {!isAuthenticated ? (
        // Auth screens
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      ) : (
        // Main app screens
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="chat/[id]" 
            options={{ 
              title: "Chat",
              presentation: "card",
            }} 
          />
          <Stack.Screen 
            name="group/[id]" 
            options={{ 
              title: "Group",
              presentation: "card",
            }} 
          />
          <Stack.Screen 
            name="meeting/[id]" 
            options={{ 
              title: "Meeting",
              presentation: "fullScreenModal",
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="modal" 
            options={{ 
              presentation: "modal",
              title: "Info",
            }} 
          />
        </>
      )}
    </Stack>
  );
}