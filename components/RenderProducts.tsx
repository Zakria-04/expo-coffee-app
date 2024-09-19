import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import React from "react";
import Products from "./Products";

interface ProductData {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  detailsImg: string;
  prices: any;
  favorite: boolean;
  quantity: number;
}

interface RenderProductsProps {
  data: ProductData[];
}

const RenderProducts: React.FC<RenderProductsProps> = (props) => {
  return (
    <View>
      <Products category="Americano" data={props.data} />
      <Products category="black coffee" data={props.data} />
      <Products category="cappuccino" data={props.data} />
      <Products category="espresso" data={props.data} />
      <Products category="latte" data={props.data} />
    </View>
  );
};

export default RenderProducts;

const styles = StyleSheet.create({});
