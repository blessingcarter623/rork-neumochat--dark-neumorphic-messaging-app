import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";
import { Video as VideoIcon, Calendar, Clock, Users, Plus } from "lucide-react-native";

// Mock data for upcoming meetings
const MEETINGS = [
  {
    id: "1",
    title: "Weekly Business Roundtable",
    time: "Today, 3:00 PM",
    duration: "1 hour",
    participants: 12,
  },
  {
    id: "2",
    title: "Client Consultation",
    time: "Tomorrow, 10:00 AM",
    duration: "30 min",
    participants: 2,
  },
  {
    id: "3",
    title: "Marketing Strategy Session",
    time: "Jul 5, 2:00 PM",
    duration: "45 min",
    participants: 5,
  },
  {
    id: "4",
    title: "Product Development Review",
    time: "Jul 7, 11:00 AM",
    duration: "1 hour",
    participants: 8,
  },
];

export default function VideoScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Video Calls",
          headerRight: () => (
            <TouchableOpacity style={styles.newCallButton}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.newCallText}>New Call</Text>
            </TouchableOpacity>
          ),
        }} 
      />
      <View style={styles.container}>
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <VideoIcon size={28} color={Colors.dark.tint} />
            </View>
            <Text style={styles.actionTitle}>Start Video Call</Text>
            <Text style={styles.actionSubtitle}>Instant video meeting</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Calendar size={28} color={Colors.dark.tint} />
            </View>
            <Text style={styles.actionTitle}>Schedule Call</Text>
            <Text style={styles.actionSubtitle}>Plan a meeting</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Clock size={20} color={Colors.dark.text} />
            <Text style={styles.tabText}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Calendar size={20} color={Colors.dark.text} />
            <Text style={styles.tabText}>Scheduled</Text>
          </TouchableOpacity>
        </View>
        
        {/* Upcoming Meetings */}
        <View style={styles.meetingsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
          
          <FlatList
            data={MEETINGS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.meetingCard}>
                <View style={styles.meetingAvatarContainer}>
                  {item.id === "1" ? (
                    <Users size={24} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.meetingAvatarText}>
                      {item.title.charAt(0)}
                    </Text>
                  )}
                </View>
                
                <View style={styles.meetingInfo}>
                  <Text style={styles.meetingTitle}>{item.title}</Text>
                  <Text style={styles.meetingTime}>
                    {item.time} • {item.duration}
                  </Text>
                </View>
                
                <View style={styles.meetingActions}>
                  {item.participants > 0 && (
                    <Text style={styles.participantsText}>
                      {item.participants} {item.participants === 1 ? 'person' : 'people'}
                    </Text>
                  )}
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.meetingsList}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  newCallButton: {
    backgroundColor: Colors.dark.tint,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 15,
  },
  newCallText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 5,
  },
  quickActionsContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 15,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.cardLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  actionTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  actionSubtitle: {
    color: Colors.dark.subtext,
    fontSize: 14,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: Colors.dark.card,
    borderRadius: 30,
    padding: 5,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  activeTab: {
    backgroundColor: Colors.dark.cardLight,
  },
  tabText: {
    color: Colors.dark.text,
    fontWeight: "500",
  },
  meetingsContainer: {
    flex: 1,
    marginTop: 10,
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  meetingsList: {
    paddingHorizontal: 15,
  },
  meetingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  meetingAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  meetingAvatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  meetingTime: {
    color: Colors.dark.subtext,
    fontSize: 14,
  },
  meetingActions: {
    alignItems: "flex-end",
  },
  participantsText: {
    color: Colors.dark.subtext,
    fontSize: 14,
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: Colors.dark.tint,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});