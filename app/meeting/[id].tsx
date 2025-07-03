import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare, MoreVertical, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

// Mock data for meetings
const MEETINGS = {
  "1": {
    id: "1",
    title: "Weekly Business Roundtable",
    time: "Today, 3:00 PM",
    duration: "1 hour",
    participants: [
      { id: "1", name: "James Wilson", isMuted: false, isVideoOn: true },
      { id: "2", name: "Marcus Johnson", isMuted: false, isVideoOn: true },
      { id: "3", name: "Sarah Lee", isMuted: true, isVideoOn: false },
      { id: "4", name: "David Thompson", isMuted: false, isVideoOn: true },
      { id: "5", name: "Michael Brown", isMuted: true, isVideoOn: true },
      { id: "6", name: "Lisa Chen", isMuted: false, isVideoOn: false },
      { id: "7", name: "Robert Davis", isMuted: true, isVideoOn: false },
      { id: "8", name: "Emily Taylor", isMuted: false, isVideoOn: true },
      { id: "9", name: "John Smith", isMuted: true, isVideoOn: true },
      { id: "10", name: "Patricia Moore", isMuted: false, isVideoOn: false },
      { id: "11", name: "Richard Wilson", isMuted: true, isVideoOn: false },
      { id: "12", name: "Jennifer Adams", isMuted: false, isVideoOn: true },
    ],
  },
};

export default function MeetingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const meetingId = Array.isArray(id) ? id[0] : id;
  const meeting = MEETINGS[meetingId];
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const endCall = () => router.back();
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Meeting Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => setShowParticipants(false)}>
          <ChevronDown size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{meeting?.title}</Text>
          <Text style={styles.headerSubtitle}>
            {meeting?.participants.length} participants • {meeting?.duration}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <MoreVertical size={24} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
      
      {showParticipants ? (
        <View style={styles.participantsContainer}>
          <Text style={styles.participantsTitle}>Participants ({meeting?.participants.length})</Text>
          
          <FlatList
            data={meeting?.participants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.participantItem}>
                <View style={styles.participantAvatar}>
                  <Text style={styles.participantAvatarText}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.participantName}>{item.name}</Text>
                <View style={styles.participantStatus}>
                  {item.isMuted && <MicOff size={16} color={Colors.dark.subtext} style={styles.statusIcon} />}
                  {!item.isVideoOn && <VideoOff size={16} color={Colors.dark.subtext} style={styles.statusIcon} />}
                </View>
              </View>
            )}
            contentContainerStyle={styles.participantsList}
          />
        </View>
      ) : (
        <View style={styles.videoGrid}>
          {/* Main speaker view */}
          <View style={styles.mainSpeakerContainer}>
            <View style={styles.mainSpeakerVideo}>
              <View style={styles.speakerAvatar}>
                <Text style={styles.speakerAvatarText}>J</Text>
              </View>
              <Text style={styles.speakerName}>James Wilson</Text>
              <View style={styles.speakerStatus}>
                {meeting?.participants[0].isMuted && (
                  <View style={styles.statusIndicator}>
                    <MicOff size={16} color="#FFFFFF" />
                  </View>
                )}
              </View>
            </View>
          </View>
          
          {/* Thumbnails of other participants */}
          <View style={styles.thumbnailsContainer}>
            <FlatList
              data={meeting?.participants.slice(1, 5)}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.thumbnailVideo}>
                  <View style={styles.thumbnailAvatar}>
                    <Text style={styles.thumbnailAvatarText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                  <Text style={styles.thumbnailName}>{item.name}</Text>
                  <View style={styles.thumbnailStatus}>
                    {item.isMuted && (
                      <View style={styles.statusIndicator}>
                        <MicOff size={12} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </View>
              )}
              contentContainerStyle={styles.thumbnailsList}
            />
          </View>
        </View>
      )}
      
      {/* Call Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlsRow}>
          <TouchableOpacity 
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={toggleMute}
          >
            {isMuted ? (
              <MicOff size={24} color="#FFFFFF" />
            ) : (
              <Mic size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, !isVideoOn && styles.controlButtonActive]}
            onPress={toggleVideo}
          >
            {isVideoOn ? (
              <Video size={24} color="#FFFFFF" />
            ) : (
              <VideoOff size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.endCallButton]}
            onPress={endCall}
          >
            <PhoneOff size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, showParticipants && styles.controlButtonActive]}
            onPress={() => setShowParticipants(!showParticipants)}
          >
            <Users size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <MessageSquare size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 15,
    backgroundColor: Colors.dark.card,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    alignItems: "center",
  },
  headerTitle: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: Colors.dark.subtext,
    fontSize: 12,
  },
  videoGrid: {
    flex: 1,
    padding: 10,
  },
  mainSpeakerContainer: {
    flex: 1,
    marginBottom: 10,
  },
  mainSpeakerVideo: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  speakerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  speakerAvatarText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  speakerName: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  speakerStatus: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
  },
  thumbnailsContainer: {
    height: 120,
  },
  thumbnailsList: {
    gap: 10,
  },
  thumbnailVideo: {
    width: 100,
    height: 120,
    backgroundColor: Colors.dark.card,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  thumbnailAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailAvatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  thumbnailName: {
    color: Colors.dark.text,
    fontSize: 12,
    position: "absolute",
    bottom: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  thumbnailStatus: {
    position: "absolute",
    top: 5,
    right: 5,
    flexDirection: "row",
  },
  statusIndicator: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    padding: 4,
    marginLeft: 5,
  },
  participantsContainer: {
    flex: 1,
    padding: 15,
  },
  participantsTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  participantsList: {
    paddingBottom: 20,
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.separator,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  participantAvatarText: {
    color: Colors.dark.tint,
    fontSize: 16,
    fontWeight: "bold",
  },
  participantName: {
    color: Colors.dark.text,
    fontSize: 16,
    flex: 1,
  },
  participantStatus: {
    flexDirection: "row",
  },
  statusIcon: {
    marginLeft: 8,
  },
  controlsContainer: {
    backgroundColor: Colors.dark.card,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.cardLight,
    alignItems: "center",
    justifyContent: "center",
  },
  controlButtonActive: {
    backgroundColor: Colors.dark.tint,
  },
  endCallButton: {
    backgroundColor: "#FF3B30",
  },
});