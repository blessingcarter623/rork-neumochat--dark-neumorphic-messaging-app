import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      // Navigation will be handled by the auth state change in _layout.tsx
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  const navigateToRegister = () => {
    router.push("/auth/register");
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Welcome Back",
          headerShown: false,
        }} 
      />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to Amatyma</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Mail size={20} color={Colors.dark.subtext} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={Colors.dark.subtext}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={Colors.dark.subtext} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.dark.subtext}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={Colors.dark.subtext} />
                ) : (
                  <Eye size={20} color={Colors.dark.subtext} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark.subtext,
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 18,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: 16,
  },
  eyeButton: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: Colors.dark.tint,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: Colors.dark.subtext,
    fontSize: 14,
  },
  footerLink: {
    color: Colors.dark.tint,
    fontSize: 14,
    fontWeight: "600",
  },
});