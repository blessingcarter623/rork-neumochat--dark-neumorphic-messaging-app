import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";
import { ArrowLeft, Video, MoreVertical, Send, Paperclip, Mic, Image as ImageIcon, Users } from "lucide-react-native";
import { useState } from "react";

// Mock data for groups
const GROUPS = {
  "2": {
    id: "2",
    name: "TTMBAH Leadership",
    avatar: "T",
    participants: [
      { id: "1", name: "James Wilson", role: "Admin" },
      { id: "2", name: "Marcus Johnson", role: "Member" },
      { id: "3", name: "Sarah Lee", role: "Member" },
      { id: "4", name: "David Thompson", role: "Member" },
      { id: "5", name: "Michael Brown", role: "Member" },
      { id: "6", name: "Lisa Chen", role: "Member" },
      { id: "7", name: "Robert Davis", role: "Member" },
      { id: "8", name: "Emily Taylor", role: "Member" },
    ],
    messages: [
      {
        id: "1",
        text: "Welcome to the TTMBAH Leadership group!",
        sender: { id: "1", name: "James Wilson" },
        time: "Yesterday",
      },
      {
        id: "2",
        text: "Thank you for adding me to the group. Looking forward to collaborating with everyone.",
        sender: { id: "2", name: "Marcus Johnson" },
        time: "Yesterday",
      },
      {
        id: "3",
        text: "Our next meeting is scheduled for Friday at 2 PM. Please prepare your department updates.",
        sender: { id: "1", name: "James Wilson" },
        time: "Yesterday",
      },
      {
        id: "4",
        text: "I've shared the Q2 report in our shared drive. Please review before the meeting.",
        sender: { id: "3", name: "Sarah Lee" },
        time: "10:30 AM",
      },
      {
        id: "5",
        text: "Thanks Sarah. I'll take a look at it today.",
        sender: { id: "5", name: "Michael Brown" },
        time: "11:15 AM",
      },
    ],
  },
};

export default function GroupScreen() {
  const { id } = useLocalSearchParams();
  const groupId = Array.isArray(id) ? id[0] : id;
  const group = GROUPS[groupId];
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(group?.messages || []);
  const [showInfo, setShowInfo] = useState(false);
  
  const sendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage = {
      id: String(messages.length + 1),
      text: message,
      sender: { id: "2", name: "Marcus Johnson" },
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerTitle: () => (
            <TouchableOpacity 
              style={styles.headerTitle}
              onPress={() => setShowInfo(!showInfo)}
            >
              <Text style={styles.headerName}>{group?.name}</Text>
              <Text style={styles.headerStatus}>
                {group?.participants.length} participants
              </Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity style={styles.headerButton}>
              <ArrowLeft size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity style={styles.headerButton}>
                <Video size={24} color={Colors.dark.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setShowInfo(!showInfo)}
              >
                <MoreVertical size={24} color={Colors.dark.text} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {showInfo ? (
          <View style={styles.groupInfoContainer}>
            <View style={styles.groupAvatarLarge}>
              <Text style={styles.groupAvatarTextLarge}>{group?.avatar}</Text>
            </View>
            
            <Text style={styles.groupNameLarge}>{group?.name}</Text>
            <Text style={styles.groupDescription}>
              Official leadership group for The The Men's Mental Health and Brotherhood Association
            </Text>
            
            <View style={styles.participantsHeader}>
              <View style={styles.participantsHeaderLeft}>
                <Users size={20} color={Colors.dark.text} />
                <Text style={styles.participantsTitle}>
                  {group?.participants.length} Participants
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.addParticipantText}>Add</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={group?.participants}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.participantItem}>
                  <View style={styles.participantAvatar}>
                    <Text style={styles.participantAvatarText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.participantInfo}>
                    <Text style={styles.participantName}>{item.name}</Text>
                    <Text style={styles.participantRole}>{item.role}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <>
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[
                  styles.messageContainer,
                  item.sender.id === "2" ? styles.myMessage : styles.theirMessage,
                ]}>
                  {item.sender.id !== "2" && (
                    <Text style={styles.messageSender}>{item.sender.name}</Text>
                  )}
                  <View style={[
                    styles.messageBubble,
                    item.sender.id === "2" ? styles.myMessageBubble : styles.theirMessageBubble,
                  ]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                    <Text style={styles.messageTime}>{item.time}</Text>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.messagesList}
            />
            
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.attachButton}>
                <Paperclip size={24} color={Colors.dark.subtext} />
              </TouchableOpacity>
              
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type a message..."
                  placeholderTextColor={Colors.dark.subtext}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />
                
                <View style={styles.inputActions}>
                  <TouchableOpacity style={styles.inputActionButton}>
                    <ImageIcon size={22} color={Colors.dark.subtext} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.inputActionButton}>
                    <Mic size={22} color={Colors.dark.subtext} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  message.trim() === "" ? styles.sendButtonDisabled : null,
                ]}
                onPress={sendMessage}
                disabled={message.trim() === ""}
              >
                <Send size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerTitle: {
    alignItems: "center",
  },
  headerName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerStatus: {
    color: Colors.dark.subtext,
    fontSize: 12,
  },
  headerButton: {
    marginHorizontal: 8,
  },
  headerRightContainer: {
    flexDirection: "row",
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
  },
  theirMessage: {
    alignSelf: "flex-start",
  },
  messageSender: {
    color: Colors.dark.tint,
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 12,
  },
  messageBubble: {
    borderRadius: 18,
    padding: 12,
    paddingBottom: 8,
  },
  myMessageBubble: {
    backgroundColor: Colors.dark.tint,
  },
  theirMessageBubble: {
    backgroundColor: Colors.dark.card,
  },
  messageText: {
    color: Colors.dark.text,
    fontSize: 16,
    lineHeight: 22,
  },
  messageTime: {
    color: Colors.dark.subtext,
    fontSize: 11,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.separator,
  },
  attachButton: {
    marginRight: 10,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: 16,
    maxHeight: 100,
  },
  inputActions: {
    flexDirection: "row",
  },
  inputActionButton: {
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: Colors.dark.tint,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.dark.subtext,
    opacity: 0.5,
  },
  groupInfoContainer: {
    flex: 1,
    padding: 20,
  },
  groupAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  groupAvatarTextLarge: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  groupNameLarge: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  groupDescription: {
    color: Colors.dark.subtext,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  participantsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  participantsHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantsTitle: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addParticipantText: {
    color: Colors.dark.tint,
    fontSize: 16,
    fontWeight: "500",
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
  participantInfo: {
    flex: 1,
  },
  participantName: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 3,
  },
  participantRole: {
    color: Colors.dark.subtext,
    fontSize: 14,
  },
});