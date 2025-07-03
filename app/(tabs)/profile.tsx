import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";
import { Settings, Edit, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react-native";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileImageText}>M</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Marcus Johnson</Text>
            <Text style={styles.profileStatus}>Business Owner • Member since 2023</Text>
            <Text style={styles.profileBio}>Entrepreneur, mentor, and community builder passionate about economic empowerment.</Text>
          </View>
        </View>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Groups</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>
        
        {/* Business Card */}
        <View style={styles.businessCard}>
          <View style={styles.businessHeader}>
            <Text style={styles.businessTitle}>My Business</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.businessContent}>
            <View style={styles.businessLogoContainer}>
              <Text style={styles.businessLogoText}>MJ</Text>
            </View>
            
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>Johnson Consulting</Text>
              <Text style={styles.businessCategory}>Business Strategy • Johannesburg</Text>
              <Text style={styles.businessStats}>32 followers • 18 reviews</Text>
            </View>
          </View>
        </View>
        
        {/* Settings Menu */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, { backgroundColor: "#4A6FFF" }]}>
                <Bell size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.settingsItemText}>Notifications</Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, { backgroundColor: "#FF6B4A" }]}>
                <Shield size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.settingsItemText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, { backgroundColor: "#4CAF50" }]}>
                <HelpCircle size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.settingsItemText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <View style={[styles.settingsIconContainer, { backgroundColor: Colors.dark.tint }]}>
                <LogOut size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.settingsItemText}>Logout</Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Amatyma v1.0.0</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerButton: {
    marginRight: 15,
  },
  profileHeader: {
    padding: 20,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    position: "relative",
  },
  profileImageText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.dark.card,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    color: Colors.dark.text,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileStatus: {
    color: Colors.dark.subtext,
    fontSize: 14,
    marginBottom: 10,
  },
  profileBio: {
    color: Colors.dark.text,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    color: Colors.dark.subtext,
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.dark.separator,
  },
  businessCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
  },
  businessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  businessTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  editText: {
    color: Colors.dark.tint,
    fontSize: 14,
    fontWeight: "500",
  },
  businessContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  businessLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.dark.cardLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  businessLogoText: {
    color: Colors.dark.tint,
    fontSize: 18,
    fontWeight: "bold",
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  businessCategory: {
    color: Colors.dark.subtext,
    fontSize: 14,
    marginBottom: 3,
  },
  businessStats: {
    color: Colors.dark.subtext,
    fontSize: 12,
  },
  settingsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  settingsTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  settingsItemText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    marginVertical: 20,
  },
  footerText: {
    color: Colors.dark.subtext,
    fontSize: 12,
  },
});