import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Quantity from "./Quantity";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";
import { ListDataTypes, PriceTypes } from "@/assets/res/types";

interface SingleCartItemProps {
  item: ListDataTypes;
}

const SingleCartItem: React.FC<SingleCartItemProps> = (props) => {
  const { cartList, imageURL } = useStore();
  const { name, ingredients, image, prices } = props.item;

  const [totalPrice, setTotalPrice] = useState(
    prices.reduce((sum: number, price: PriceTypes) => sum + price.price, 0)
  );

  return (
    <View style={styles.container}>
      <Image style={styles.itemImg} source={{ uri: imageURL + image }} />
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemIngredients}>with {ingredients}</Text>
        {props.item.prices.map((val: PriceTypes, index: number) => {
          const renderSizeBasedOnQuantity = val.quantity;
          if (renderSizeBasedOnQuantity) {
            return (
              <View key={index}>
                <View style={styles.valContainer}>
                  <View style={styles.selectedSizeContainer}>
                    <Text style={styles.selectedSize}>{val.size}</Text>
                  </View>
                  <Text style={styles.selectedPrice}>
                    $ {totalPrice.toFixed(2)}
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Quantity
                    quantity={val.quantity}
                    id={index}
                    size={val.size}
                    newID={props.item.id}
                    price={val.price}
                    setTotalPrice={setTotalPrice}
                    val={val}
                  />
                </View>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default SingleCartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 20,
    borderColor: COLORS.white,
  },
  valContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImg: {
    width: 180,
    height: 180,
    borderRadius: 20,
    marginRight: 20,
  },
  itemName: {
    fontSize: 20,
    color: COLORS.white,
  },
  itemIngredients: {
    fontSize: 13,
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 10,
  },
  selectedSize: {
    fontSize: 20,
    color: COLORS.white,
  },
  selectedPrice: {
    fontSize: 20,
    marginLeft: 30,
    color: COLORS.white,
  },
  selectedSizeContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 5,
    width: 50,
    alignItems: "center",
    borderRadius: 8,
  },
  itemContainer: {
    // marginLeft: 20,
  },
  totalPriceContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: 10,
  },
});
