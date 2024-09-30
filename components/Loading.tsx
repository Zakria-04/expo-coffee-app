import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "@/assets/images/images";
import { COLORS } from "@/assets/themes/colors";

const Loading = () => {
  return (
    <View>
      <Image source={Images.coffeeCup} alt="logo" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 20,
    marginTop: 20,
    color: COLORS.white,
    textAlign: "center",
  },
});
