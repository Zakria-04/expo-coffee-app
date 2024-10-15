import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import Quantity from "./Quantity";
import { COLORS } from "@/assets/themes/colors";
import SingleCartItem from "./SingleCartItem";
import MultipleCartItem from "./MultipleCartItem";
import { ListDataTypes } from "@/assets/res/types";

interface PriceTypes {
  price: number;
  size: "S" | "M" | "L";
  quantity: number;
}
interface RenderCartTypes {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  detailsImg: string;
  prices: PriceTypes[];
  price: number;
  size: string;
  ingredients: string;
  average_rating: number;
  favorite: boolean;
  quantity: number;
}

const RenderCart = () => {
  const { cartList, userCart, auth } = useStore();
  const data = auth ? userCart : cartList;

  const cartListData = () => {
    const renderData = data.map((item: RenderCartTypes, index: number) => {
      const slectedSize = item.prices.filter(
        (val: PriceTypes) => val.quantity > 0
      );

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
