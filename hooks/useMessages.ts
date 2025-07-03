import { useState, useEffect } from "react";

// Define types for our messages
export interface Message {
  id: string;
  text: string;
  sender: string | { id: string; name: string };
  time: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
  isGroup?: boolean;
  participants?: number | Array<{ id: string; name: string; role: string }>;
  messages: Message[];
}

// Mock data for chats
const MOCK_CHATS: Record<string, Chat> = {
  "1": {
    id: "1",
    name: "Ofenste Tabane SG",
    avatar: "O",
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Good morning TTMBAH team. I've reviewed the proposal for The Department of Men's Mental Health and Wellness.",
        sender: "them",
        time: "9:15 AM",
      },
      {
        id: "2",
        text: "Good morning Secretary-General. Thank you for taking the time to review our comprehensive proposal.",
        sender: "me",
        time: "9:17 AM",
      },
      {
        id: "3",
        text: "The framework is impressive. The statistics on men's mental health crisis are concerning and your proposed solutions are well-structured.",
        sender: "them",
        time: "9:20 AM",
      },
      {
        id: "4",
        text: "We believe formalizing this department under government oversight will provide the resources and reach needed to address this crisis effectively.",
        sender: "me",
        time: "9:22 AM",
      },
    ],
  },
  "2": {
    id: "2",
    name: "TTMBAH Leadership",
    avatar: "T",
    isGroup: true,
    participants: 8,
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
    ],
  },
};

export function useMessages(chatId: string) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch messages
    const fetchMessages = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const mockChat = MOCK_CHATS[chatId];
        
        if (mockChat) {
          setChat(mockChat);
          setMessages(mockChat.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, [chatId]);
  
  const sendMessage = (text: string) => {
    if (!chat) return;
    
    const newMessage: Message = {
      id: String(Date.now()),
      text,
      sender: chat.isGroup ? { id: "2", name: "Marcus Johnson" } : "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // In a real app, you would send this to your API
    console.log("Sending message:", newMessage);
    
    return newMessage;
  };
  
  return {
    chat,
    messages,
    loading,
    sendMessage,
  };
}