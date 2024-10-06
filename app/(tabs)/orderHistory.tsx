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

const OrderHistory = () => {
  const { orderHistory, imageURL, userOrderHistory, auth } = useStore();

  const data = auth ? userOrderHistory : orderHistory;

  const renderOrderHistory = () => {
    return data.map((item: any, index) => {
      const day = item.date.getDate();
      const month = item.date.getMonth() + 1;
      const year = item.date.getFullYear();
      const orderDate = `${day}/${month}/${year}`;

      return (
        <View key={index}>
          <View style={styles.itemBorder}>
            <Text style={[styles.itemDate, { fontSize: 20 }]}>order date:</Text>
            <Text style={styles.itemDate}>{orderDate}</Text>
            {item.orderItem.map((val: any) => (
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
                {val.prices.map((price: any) => (
                  <View style={styles.priceContainer}>
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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginBottom: 30 }}>
            <Header />
          </View>
          <View style={{ marginBottom: 50 }}>{renderOrderHistory()}</View>
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
