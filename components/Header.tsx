import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="menu-outline" size={60} color={COLORS.orange} />
      <Text style={styles.logo}>Coffee-App</Text>
      <Text style={styles.logStatue}>signup</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  logo: {
    color: COLORS.white,
    fontSize: 25,
  },
  logStatue: {
    fontSize: 15,
    color: COLORS.white,
  },
});
