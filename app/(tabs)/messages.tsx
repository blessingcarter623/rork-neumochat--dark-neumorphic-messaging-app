import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { Search, Plus } from "lucide-react-native";
import { useState } from "react";
import { useChats } from "@/hooks/useMessages";

export default function MessagesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const { chats, loading } = useChats();

  const filteredChats = activeTab === "all" 
    ? chats 
    : activeTab === "personal" 
      ? chats.filter(chat => !chat.isGroup) 
      : chats.filter(chat => chat.isGroup);

  const navigateToChat = (id: string) => {
    router.push(`/chat/${id}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Messages",
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.dark.subtext} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search messages</Text>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "all" && styles.activeTab]} 
            onPress={() => setActiveTab("all")}
          >
            <Text style={[styles.tabText, activeTab === "all" && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "personal" && styles.activeTab]} 
            onPress={() => setActiveTab("personal")}
          >
            <Text style={[styles.tabText, activeTab === "personal" && styles.activeTabText]}>Personal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "groups" && styles.activeTab]} 
            onPress={() => setActiveTab("groups")}
          >
            <Text style={[styles.tabText, activeTab === "groups" && styles.activeTabText]}>Groups</Text>
          </TouchableOpacity>
        </View>
        
        {/* Chat List */}
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.chatItem}
              onPress={() => navigateToChat(item.id)}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.avatar}</Text>
                </View>
                {item.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                <View style={styles.chatFooter}>
                  <Text 
                    style={styles.lastMessage}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.lastMessage}
                  </Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.chatList}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: Colors.dark.subtext,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
  },
  activeTab: {
    backgroundColor: Colors.dark.tint,
  },
  tabText: {
    color: Colors.dark.text,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  chatList: {
    paddingHorizontal: 15,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.separator,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.card,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: Colors.dark.tint,
    fontSize: 18,
    fontWeight: "bold",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.statusOnline,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  chatName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "600",
  },
  chatTime: {
    color: Colors.dark.subtext,
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    color: Colors.dark.subtext,
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});