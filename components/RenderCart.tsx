import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import Quantity from "./Quantity";
import { COLORS } from "@/assets/themes/colors";
import SingleCartItem from "./SingleCartItem";
import MultipleCartItem from "./MultipleCartItem";

const RenderCart = () => {
  const { cartList } = useStore();

  const cartListData = () => {
    const renderData = cartList.map((item, index) => {
      const slectedSize = item.prices.filter((val: any) => val.quantity > 0);

      if (slectedSize.length > 1) {
        return (
          <View key={index} style={styles.cartcomponent}>
            <MultipleCartItem item={item} />
          </View>
        );
      } else {
        return (
          <View key={index} style={styles.cartcomponent}>
            <SingleCartItem item={item} />
          </View>
        );
      }
    });
    return renderData;
  };

  return <View style={styles.container}>{cartListData()}</View>;
};

export default RenderCart;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cartcomponent: {
    marginTop: 25,
    marginBottom: 25,
  },
});
