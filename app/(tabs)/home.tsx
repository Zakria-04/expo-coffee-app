import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { COLORS } from "@/assets/themes/colors";
import SearchItem from "@/components/SearchItem";
import Category from "@/components/Category";
import { useStore } from "@/store/store";
import RenderProducts from "@/components/RenderProducts";
import { ListDataTypes } from "@/assets/res/types";

const Home = () => {
  const CoffeeList = useStore((state) => state.coffeeList);
  const [data, setData] = useState<ListDataTypes[]>(CoffeeList);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          {/* Header */}
          <Header screen="Coffee-App" />
          {/* Search Bar */}
          <SearchItem setData={setData} coffeeList={CoffeeList} />
          {/* Category */}
          <Category setData={setData} coffeeList={CoffeeList} />
          {/* Render Data */}
          <RenderProducts data={data} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
});
