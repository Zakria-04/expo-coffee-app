import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";
import EmptyList from "@/components/EmptyList";
import RenderCart from "@/components/RenderCart";
import Header from "@/components/Header";

const Cart = () => {
  const { cartList, userCart, auth } = useStore();
  const data = auth ? userCart : cartList;
  console.log("data is", userCart);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {data.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <EmptyList message="cart" color={COLORS.brown} icon="cafe" />
            </View>
          ) : (
            <View>
              <Header />
              <RenderCart />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  emptyListContainer: {
    alignItems: "center",
    marginTop: "80%",
  },
});
