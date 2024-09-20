import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";

interface DetailsFooterProps {
  totalPrice: number;
}

const DetailsFooter: React.FC<DetailsFooterProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>
        {`Total price: ${props.totalPrice}`}
        <Text style={{ color: COLORS.orange }}>$</Text>
      </Text>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.cartContainer}>
          <Text style={styles.cart}>Add to cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, .38)",
    padding: 25,
    paddingBottom: 40,
  },
  totalPrice: {
    fontSize: 20,
    color: COLORS.white,
  },
  cart: {
    fontSize: 20,
    color: COLORS.white,
  },
  cartContainer: {
    borderWidth: 1,
    padding: 15,
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
  },
});
