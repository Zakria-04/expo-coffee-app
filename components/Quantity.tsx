import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";

interface QuantityProps {
  quantity: number;
  id: number;
  size: any;
  newID: any;
  price: any;
  setTotalPrice: any;
  val: any;
}

const Quantity: React.FC<QuantityProps> = (props) => {
  const { increaseQuantity, decreaseQuantity, cartList, removeItemFromCart } =
    useStore();

  const [totalItemQuantity, setTotalItemQuantity] = useState(
    props.quantity * props.price
  );

  useEffect(() => {
    setTotalItemQuantity(props.quantity * props.price);
  }, [props.quantity, props.price]);

  useEffect(() => {
    props.setTotalPrice(totalItemQuantity);
  }, [totalItemQuantity]);

  const addQuantity = () => {
    increaseQuantity(props.newID, props.size);
    props.setTotalPrice(props.price * props.quantity);
  };

  const removeQuantity = () => {
    if (props.quantity > 1) {
      decreaseQuantity(props.newID, props.size);
    } else {
      removeItemFromCart(props.newID, props.size);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={addQuantity}>
        <View style={styles.iconContainer}>
          <Ionicons name="add-outline" size={30} />
        </View>
      </TouchableOpacity>
      <View style={styles.quantityTxtContainer}>
        <Text style={styles.quantityTxt}>{props.quantity}</Text>
      </View>
      <TouchableOpacity onPress={removeQuantity}>
        <View style={styles.iconContainer}>
          <Ionicons name="remove-outline" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  quantityTxt: {
    fontSize: 20,
    color: COLORS.white,
  },
  quantityTxtContainer: {
    borderWidth: 1,
    padding: 5,
    width: 50,
    borderRadius: 8,
    alignItems: "center",
    borderColor: COLORS.white,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.orange,
  },
});
