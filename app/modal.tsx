import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import Colors from "@/constants/colors";
import { Info, Shield, Bell, HelpCircle, ChevronRight } from "lucide-react-native";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      
      <View style={styles.header}>
        <Info size={30} color={Colors.dark.tint} />
        <Text style={styles.title}>About Amatyma</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Amatyma is a community platform designed for The Men's Mental Health and Brotherhood Association (TTMBAH), providing a secure space for members to connect, communicate, and collaborate.
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Features</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Bell size={20} color="#FFFFFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Messaging</Text>
              <Text style={styles.featureDescription}>
                Connect with other members through private and group chats with media sharing capabilities.
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIconContainer, { backgroundColor: "#4A6FFF" }]}>
              <Shield size={20} color="#FFFFFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Video Meetings</Text>
              <Text style={styles.featureDescription}>
                Host or join video calls with up to 50 participants for virtual gatherings and events.
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.featureIconContainer, { backgroundColor: "#4CAF50" }]}>
              <HelpCircle size={20} color="#FFFFFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Business Directory</Text>
              <Text style={styles.featureDescription}>
                Discover and support businesses owned by brotherhood members.
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <Text style={styles.sectionText}>
            Amatyma prioritizes your privacy and data security. All messages are encrypted, and your personal information is never shared with third parties without your consent.
          </Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>View Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <Text style={styles.sectionText}>
            Need help or have questions? Our support team is available to assist you.
          </Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Amatyma. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.separator,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.text,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark.text,
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.dark.text,
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.text,
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.dark.subtext,
    lineHeight: 20,
  },
  linkButton: {
    paddingVertical: 10,
  },
  linkButtonText: {
    fontSize: 16,
    color: Colors.dark.tint,
    fontWeight: "500",
  },
  versionInfo: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  versionText: {
    fontSize: 14,
    color: Colors.dark.subtext,
    marginBottom: 5,
  },
  copyrightText: {
    fontSize: 12,
    color: Colors.dark.subtext,
  },
});