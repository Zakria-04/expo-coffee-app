import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Quantity from "./Quantity";
import { COLORS } from "@/assets/themes/colors";
import index from "./../app/index";
import { useStore } from "@/store/store";
import { ListDataTypes, PriceTypes } from "@/assets/res/types";

interface MultipleCartItemProps {
  item: ListDataTypes;
}

const MultipleCartItem: React.FC<MultipleCartItemProps> = (props) => {
  const { imageURL } = useStore();
  const { name, ingredients, image, prices } = props.item;

  const [cartItemsTotal, setCartItemsTotal] = useState<number>(0);

  const [totalPrice, setTotalPrice] = useState(
    prices.reduce((sum: number, price: any) => sum + price.price, 0)
  );

  useEffect(() => {
    let newTotalPrice = prices.reduce((acc: number, val: PriceTypes) => {
      return acc + val.price * val.quantity;
    }, 0);

    setCartItemsTotal(newTotalPrice);
  }, [prices]);

  return (
    <View style={styles.container}>
      <View style={styles.itemDetails}>
        <Image style={styles.itemImg} source={{ uri: imageURL + image }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemIngredients}>with {ingredients}</Text>
        </View>
      </View>
      {props.item.prices.map((val: any, index: number) => {
        const renderSizeBasedOnQuantity = val.quantity;
        let newTotal = val.price * val.quantity;

        if (renderSizeBasedOnQuantity) {
          return (
            <View key={index} style={styles.valContainer}>
              <View style={styles.selectedSizeContainer}>
                <Text style={styles.selectedSize}>{val.size}</Text>
              </View>
              <Text style={styles.selectedPrice}>$ {newTotal.toFixed(2)}</Text>
              <View style={{ width: 170 }}>
                <Quantity
                  quantity={val.quantity}
                  id={val.key}
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
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceTxt}>
          total price: $ {cartItemsTotal.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default MultipleCartItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 20,
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontSize: 25,
    color: COLORS.white,
  },
  itemIngredients: {
    fontSize: 15,
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
    color: COLORS.white,
  },
  valContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  selectedSizeContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 5,
    width: 70,
    alignItems: "center",
    borderRadius: 8,
  },
  itemImg: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
  detailsContainer: {
    marginLeft: 25,
  },
  totalPriceContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  totalPriceTxt: {
    fontSize: 20,
    color: COLORS.white,
  },
});
