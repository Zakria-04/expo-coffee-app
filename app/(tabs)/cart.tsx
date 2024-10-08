import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";
import EmptyList from "@/components/EmptyList";
import RenderCart from "@/components/RenderCart";
import Header from "@/components/Header";
import CartFooter from "@/components/CartFooter";

const Cart = () => {
  const { cartList, userCart, auth, calculateTotalCart, cartTotal } =
    useStore();
  const data = auth ? userCart : cartList;
  console.log("my cart total iss", cartList);

  useEffect(() => {
    calculateTotalCart();
  }, [cartList, userCart]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {data.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <EmptyList message="cart" color={COLORS.brown} icon="cafe" />
          </View>
        ) : (
          <View style={styles.contentWrapper}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Header screen="Cart" />
              <RenderCart />
            </ScrollView>
            <CartFooter cartTotal={cartTotal} />
          </View>
        )}
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
  safeArea: {
    flex: 1,
  },
  emptyListContainer: {
    alignItems: "center",
    marginTop: "80%",
  },
  contentWrapper: {
    flex: 1,
    marginBottom: 50,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
