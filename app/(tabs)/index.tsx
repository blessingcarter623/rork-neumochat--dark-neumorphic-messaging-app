import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";
import { Users, Building, Calendar, ArrowRight } from "lucide-react-native";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Amatyma" }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" }} 
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>AMATYMA</Text>
        </View>
        
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome to <Text style={styles.highlightText}>Amatyma</Text>
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Connect with the brotherhood, discover local businesses, and access exclusive merchandise.
          </Text>
          
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Join the Brotherhood</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Discover Businesses</Text>
            <Building size={20} color={Colors.dark.tint} />
          </TouchableOpacity>
        </View>
        
        {/* Why Join Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Why Join Amatyma?</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Users size={24} color={Colors.dark.tint} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Brotherhood Network</Text>
              <Text style={styles.featureDescription}>
                Connect with like-minded individuals and build meaningful relationships.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Building size={24} color={Colors.dark.tint} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Business Directory</Text>
              <Text style={styles.featureDescription}>
                Discover and support businesses owned by brotherhood members.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Calendar size={24} color={Colors.dark.tint} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Events & Meetings</Text>
              <Text style={styles.featureDescription}>
                Participate in exclusive events, workshops, and networking opportunities.
              </Text>
            </View>
          </View>
        </View>
        
        {/* Upcoming Events Teaser */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>Weekly Business Roundtable</Text>
              <Text style={styles.eventTime}>Today, 3:00 PM • 1 hour</Text>
              <Text style={styles.eventParticipants}>12 people attending</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  logoText: {
    color: Colors.dark.tint,
    fontSize: 22,
    fontWeight: "bold",
  },
  welcomeSection: {
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeTitle: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  highlightText: {
    color: Colors.dark.tint,
  },
  welcomeSubtitle: {
    color: Colors.dark.subtext,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: Colors.dark.buttonBackground,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.dark.separator,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.cardLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDescription: {
    color: Colors.dark.subtext,
    fontSize: 14,
    lineHeight: 20,
  },
  eventCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventTime: {
    color: Colors.dark.subtext,
    fontSize: 14,
    marginBottom: 5,
  },
  eventParticipants: {
    color: Colors.dark.subtext,
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: Colors.dark.buttonBackground,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});