import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import Colors from "@/constants/colors";
import { ArrowLeft, Video, Phone, MoreVertical, Send, Paperclip, Mic, Image as ImageIcon } from "lucide-react-native";
import { useState } from "react";
import { useMessages } from "@/hooks/useMessages";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const chatId = Array.isArray(id) ? id[0] : id;
  const { chat, messages, loading, sendMessage } = useMessages(chatId);
  
  const [message, setMessage] = useState("");
  
  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    
    await sendMessage(message);
    setMessage("");
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </View>
    );
  }

  if (!chat) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Chat not found</Text>
      </View>
    );
  }
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Text style={styles.headerName}>{chat.name}</Text>
              <Text style={styles.headerStatus}>
                {chat.isOnline ? "Active now" : chat.isGroup ? `${chat.participants} participants` : "Offline"}
              </Text>
            </View>
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
              <TouchableOpacity style={styles.headerButton}>
                <Phone size={24} color={Colors.dark.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
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
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageContainer,
              item.sender === "me" ? styles.myMessage : styles.theirMessage,
            ]}>
              <View style={[
                styles.messageBubble,
                item.sender === "me" ? styles.myMessageBubble : styles.theirMessageBubble,
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
            onPress={handleSendMessage}
            disabled={message.trim() === ""}
          >
            <Send size={24} color="#FFFFFF" />
          </TouchableOpacity>
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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: 16,
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
});