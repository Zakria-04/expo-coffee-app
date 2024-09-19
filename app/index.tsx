import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Images } from "@/assets/images/images";
import { Href, router } from "expo-router";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";

const index = () => {
  const { fetchStoreData } = useStore();

  useEffect(() => {
    fetchStoreData();
  }, []);

  setTimeout(() => {
    router.replace("/home" as Href);
  }, 1 * 1000);
  return (
    <View style={styles.container}>
      <Image source={Images.coffeeCup} alt="logo" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
  },
  loadingText: {
    fontSize: 20,
    marginTop: 20,
  },
});
