import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";
import { navigateToScreen } from "@/assets/res/utils";
import { useStore } from "@/store/store";

interface HeaderProps {
  screen: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { auth } = useStore();
  return (
    <View style={styles.container}>
      <Ionicons name="menu-outline" size={60} color={COLORS.orange} />
      <Text style={styles.logo}>{props.screen}</Text>
      <TouchableOpacity
        onPress={() => navigateToScreen(auth ? "/profile" : "/signin")}
      >
        <Text style={styles.logStatue}>{auth ? "profile" : "signin"}</Text>
      </TouchableOpacity>
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
