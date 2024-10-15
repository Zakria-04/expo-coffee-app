import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";

import Loading from "@/components/Loading";

const Index = () => {
  const { fetchStoreData, isLoading } = useStore();
  useEffect(() => {
    fetchStoreData().then(() => {
      router.replace("/home");
    });
  }, []);

  return <View style={styles.container}>{isLoading && <Loading />}</View>;
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
  },
});
