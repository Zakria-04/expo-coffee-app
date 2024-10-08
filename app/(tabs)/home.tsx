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

const Home = () => {
  const CoffeeList = useStore((state) => state.coffeeList);
  const [data, setData] = useState(CoffeeList);
  const { user, userCart, cartList } = useStore();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.darkBlue}}>
      <View style={styles.container}>
        <ScrollView>
          <Header screen="Coffee-App" />
          <SearchItem setData={setData} coffeeList={CoffeeList} />
          <Category setData={setData} coffeeList={CoffeeList} />
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
    backgroundColor: COLORS.darkBlue,
  },
});
