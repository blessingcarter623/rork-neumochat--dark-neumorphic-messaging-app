import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { View, ActivityIndicator } from "react-native";
import Colors from "@/constants/colors";

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth/login");
      }
    }
  }, [isAuthenticated, isLoading]);

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