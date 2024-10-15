import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import { COLORS } from "@/assets/themes/colors";
import {
  ListDataTypes,
  OrderHistoryTypes,
  PriceTypes,
} from "@/assets/res/types";

const RenderOrderHistory = () => {
  const { orderHistory, imageURL, userOrderHistory, auth } = useStore();

  const data = auth ? userOrderHistory : orderHistory;

  const renderOrderHistory = () => {
    return data.map((item: OrderHistoryTypes, index: number) => {
      return (
        <View key={index}>
          <View style={styles.itemBorder}>
            <Text style={[styles.itemDate, { fontSize: 20 }]}>order date:</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
            {item.ordersItem.map((val: ListDataTypes) => (
              <View key={val.id}>
                <View style={styles.itemContainer}>
                  <Image
                    source={{ uri: imageURL + val.image }}
                    style={styles.itemImage}
                  />
                  <View style={styles.valContainer}>
                    <Text style={styles.itemname}>{val.name}</Text>
                    <Text style={styles.itemingredients}>
                      {val.ingredients}
                    </Text>
                  </View>
                </View>
                {val.prices.map((price: PriceTypes, index: number) => (
                  <View key={index} style={styles.priceContainer}>
                    <Text style={styles.itemPirce}>{price.price}$</Text>
                    <Text style={styles.itemPirce}>x{price.quantity}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      );
    });
  };

  return <View>{renderOrderHistory()}</View>;
};

export default RenderOrderHistory;

const styles = StyleSheet.create({
  itemBorder: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 20,
    marginBottom: "10%",
    borderRadius: 25,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDate: {
    fontSize: 17,
    color: COLORS.white,
    marginTop: 5,
  },
  itemImage: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  valContainer: {
    marginLeft: "5%",
  },
  itemname: {
    fontSize: 25,
    color: COLORS.white,
    marginBottom: 10,
  },
  itemingredients: {
    fontSize: 16,
    color: COLORS.white,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
    borderRadius: 15,
    backgroundColor: COLORS.orange,
  },
  itemPirce: {
    color: COLORS.white,
    fontSize: 15,
  },
});
