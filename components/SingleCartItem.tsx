import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Quantity from "./Quantity";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";

interface SingleCartItemProps {
  item: any;
}

const SingleCartItem: React.FC<SingleCartItemProps> = (props) => {
  const { cartList } = useStore();
  const { name, ingredients, image, size, price, prices } = props.item;

  console.log(props.item);

  const [totalPrice, setTotalPrice] = useState(
    prices.map((price: any) => price.price)
  );
  return (
    <View style={styles.container}>
      <Image style={styles.itemImg} source={image} />
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemIngredients}>with {ingredients}</Text>
        {props.item.prices.map((val: any, index: number) => {
          const renderSizeBasedOnQuantity = val.quantity;
          if (renderSizeBasedOnQuantity) {
            return (
              <View key={index}>
                <View style={styles.valContainer}>
                  <View style={styles.selectedSizeContainer}>
                    <Text style={styles.selectedSize}>{val.size}</Text>
                  </View>
                  <Text style={styles.selectedPrice}>$ {totalPrice}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
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
