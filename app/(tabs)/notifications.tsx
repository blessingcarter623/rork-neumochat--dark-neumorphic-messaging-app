import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";
import { MessageCircle, Users, Heart, UserPlus, MoreVertical, Settings } from "lucide-react-native";

// Mock data for notifications
const NOTIFICATIONS = [
  {
    id: "1",
    type: "message",
    title: "New message from Ofenste Tabane SG",
    description: "The Department proposal looks promising...",
    time: "5 min ago",
    isNew: true,
  },
  {
    id: "2",
    type: "group",
    title: "TTMBAH Leadership",
    description: "You were added to the group",
    time: "1 hour ago",
    isNew: true,
  },
  {
    id: "3",
    type: "like",
    title: "Your business listing received 5 new likes",
    description: "People are interested in your services",
    time: "2 hours ago",
    isNew: false,
  },
  {
    id: "4",
    type: "follow",
    title: "John Doe started following you",
    description: "Check out their business profile",
    time: "3 hours ago",
    isNew: false,
  },
  {
    id: "5",
    type: "message",
    title: "Amatyma Personal Group Chat",
    description: "3 new messages in the group",
    time: "1 day ago",
    isNew: false,
  },
  {
    id: "6",
    type: "group",
    title: "Business Development Team",
    description: "New document shared: Q3 Strategy",
    time: "2 days ago",
    isNew: false,
  },
];

export default function NotificationsScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Notifications",
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.markAllText}>Mark all read</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconButton}>
                <Settings size={22} color={Colors.dark.text} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <View style={styles.container}>
        <Text style={styles.subtitle}>2 unread notifications</Text>
        
        <FlatList
          data={NOTIFICATIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.notificationItem,
                item.isNew && styles.newNotification
              ]}
            >
              <View style={[
                styles.iconContainer,
                { backgroundColor: getIconBackgroundColor(item.type) }
              ]}>
                {getNotificationIcon(item.type)}
              </View>
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <TouchableOpacity>
                    <MoreVertical size={18} color={Colors.dark.subtext} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.notificationDescription}>{item.description}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
              
              {item.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>New</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.notificationsList}
        />
      </View>
    </>
  );
}

// Helper functions for notification icons
function getNotificationIcon(type) {
  switch (type) {
    case "message":
      return <MessageCircle size={22} color="#FFFFFF" />;
    case "group":
      return <Users size={22} color="#FFFFFF" />;
    case "like":
      return <Heart size={22} color="#FFFFFF" />;
    case "follow":
      return <UserPlus size={22} color="#FFFFFF" />;
    default:
      return <MessageCircle size={22} color="#FFFFFF" />;
  }
}

function getIconBackgroundColor(type) {
  switch (type) {
    case "message":
      return Colors.dark.tint;
    case "group":
      return "#4A6FFF";
    case "like":
      return "#FF4A8D";
    case "follow":
      return "#FF6B4A";
    default:
      return Colors.dark.tint;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    marginRight: 15,
  },
  headerIconButton: {
    marginRight: 15,
  },
  markAllText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: "500",
  },
  subtitle: {
    color: Colors.dark.subtext,
    fontSize: 14,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  notificationsList: {
    paddingHorizontal: 15,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    position: "relative",
  },
  newNotification: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.tint,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  notificationTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  notificationDescription: {
    color: Colors.dark.subtext,
    fontSize: 14,
    marginBottom: 5,
  },
  notificationTime: {
    color: Colors.dark.subtext,
    fontSize: 12,
  },
  newBadge: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: Colors.dark.tint,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});