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
import axios from "axios";

const Home = () => {
  const CoffeeList = useStore((state) => state.coffeeList);
  const [data, setData] = useState(CoffeeList);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Header />
          <SearchItem setData={setData} coffeeList={CoffeeList} />
          <Category setData={setData} coffeeList={CoffeeList} />
          <RenderProducts data={data} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  image: {
    width: 300,
    height: 300, // Adjust the height to maintain aspect ratio
    resizeMode: "contain", // Change to 'cover' or 'stretch' as needed
  },
});
