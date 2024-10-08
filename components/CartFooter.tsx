import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";

interface CartFooterProps {
  cartTotal: number;
}

const CartFooter: React.FC<CartFooterProps> = (props) => {
  const { userCart, cartList, auth, calculateTotalCart, placeOrder } =
    useStore();

  const currentUser = auth ? userCart : cartList;

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <Text style={styles.total}>
          cart total: {props.cartTotal.toFixed(2)}$
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("pressed");
            placeOrder();
          }}
        >
          <View style={styles.checkBtn}>
            <Text style={styles.checkText}>check out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartFooter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.38)",
    padding: 20,
  },
  borderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    color: COLORS.white,
    fontSize: 20,
  },
  checkBtn: {
    borderWidth: 1,
    backgroundColor: COLORS.orange,
    padding: 15,
    borderRadius: 10,
  },
  checkText: {
    fontSize: 15,
    color: COLORS.white,
    textTransform: "uppercase",
  },
});
