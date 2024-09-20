import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => <BlurView style={styles.blurViewStyle} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-sharp"
              size={30}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart"
              size={30}
              color={focused ? COLORS.orange : COLORS.grey}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 90,
    position: "absolute",
    backgroundColor: "rgba(2,21,38,0.5)",
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
  },
  blurViewStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
