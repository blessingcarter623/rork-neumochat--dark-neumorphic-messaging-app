import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Platform } from "react-native";
import Colors from "@/constants/colors";
import { Send, Paperclip, Mic, Image as ImageIcon } from "lucide-react-native";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  
  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };
  
  return (
    <View style={styles.container}>
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
        onPress={handleSend}
        disabled={message.trim() === ""}
      >
        <Send size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.separator,
    backgroundColor: Colors.dark.background,
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
    paddingTop: Platform.OS === "ios" ? 10 : 0,
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