import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Colors from "@/constants/colors";

interface NeumorphicCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: "low" | "medium" | "high";
}

export default function NeumorphicCard({ 
  children, 
  style, 
  intensity = "medium" 
}: NeumorphicCardProps) {
  // Determine shadow intensity
  let shadowOpacity;
  let elevation;
  
  switch (intensity) {
    case "low":
      shadowOpacity = 0.15;
      elevation = 3;
      break;
    case "high":
      shadowOpacity = 0.35;
      elevation = 8;
      break;
    case "medium":
    default:
      shadowOpacity = 0.25;
      elevation = 5;
      break;
  }
  
  return (
    <View
      style={[
        styles.card,
        {
          shadowOpacity,
          elevation,
        },
        style,
      ]}
    >
      <View style={styles.innerShadow} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 15,
    padding: 15,
    position: "relative",
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  innerShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.dark.highlight,
    opacity: 0.1,
  },
});