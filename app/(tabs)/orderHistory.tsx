import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";
import { useStore } from "@/store/store";
import Header from "@/components/Header";
import EmptyList from "@/components/EmptyList";
import RenderOrderHistory from "@/components/RenderOrderHistory";

const OrderHistory = () => {
  const { orderHistory, userOrderHistory, auth } = useStore();

  const data = auth ? userOrderHistory : orderHistory;

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {data.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <EmptyList
                icon={"sad"}
                message="order history"
                color={COLORS.orange}
              />
            </View>
          ) : (
            <View>
              <View style={{ marginBottom: 30 }}>
                <Header screen="Order-History" />
              </View>
              <View style={{ marginBottom: 50 }}>
                <RenderOrderHistory />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    padding: 15,
  },
  emptyListContainer: {
    alignItems: "center",
    marginTop: "80%",
  },
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
