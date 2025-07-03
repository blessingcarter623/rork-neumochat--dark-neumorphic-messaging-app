import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await register(name, email, phone, password);
      // Navigation will be handled by the auth state change in _layout.tsx
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again");
    }
  };

  const navigateToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Create Account",
          headerShown: false,
        }} 
      />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the Amatyma community</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <User size={20} color={Colors.dark.subtext} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor={Colors.dark.subtext}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

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
                <Phone size={20} color={Colors.dark.subtext} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor={Colors.dark.subtext}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
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

              <View style={styles.inputContainer}>
                <Lock size={20} color={Colors.dark.subtext} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor={Colors.dark.subtext}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color={Colors.dark.subtext} />
                  ) : (
                    <Eye size={20} color={Colors.dark.subtext} />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
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
  registerButton: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
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