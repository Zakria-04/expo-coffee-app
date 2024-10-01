import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import Quantity from "./Quantity";
import { COLORS } from "@/assets/themes/colors";
import SingleCartItem from "./SingleCartItem";
import MultipleCartItem from "./MultipleCartItem";

const RenderCart = () => {
  const { cartList, userCart, auth } = useStore();
  const data = auth ? userCart : cartList;

  const cartListData = () => {
    const renderData = data.map((item: any, index: any) => {
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
