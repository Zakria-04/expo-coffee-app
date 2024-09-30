import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Images } from "@/assets/images/images";
import { Href, Redirect, router } from "expo-router";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";
import { getProducts } from "@/assets/res/api";
import Loading from "@/components/Loading";

const Index = () => {
  const { fetchStoreData } = useStore();
  const [isLoading, setIsLoading] = useState(true);


  

  useEffect(() => {
    getProducts()
      .then((response) => {
        const stringify_data = JSON.stringify(response);
        fetchStoreData(stringify_data);
        if (response) {
          setIsLoading(false);
          router.replace("/home");
        }
      })
      .catch((e) => console.log("error", e));
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
