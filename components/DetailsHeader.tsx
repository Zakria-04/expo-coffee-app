import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";
import { goBackOneStep } from "@/assets/res/utils";

const DetailsHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          goBackOneStep();
        }}
      >
        <Ionicons name="arrow-back-outline" size={50} color={COLORS.orange} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="heart" size={50} color={COLORS.darkBlue2} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
