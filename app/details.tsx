import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { COLORS } from "@/assets/themes/colors";
import DetailsFooter from "@/components/DetailsFooter";
import DetailsHeader from "@/components/DetailsHeader";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "@/store/store";
import { PriceTypes } from "@/assets/res/types";

const Details = () => {
  const { data } = useLocalSearchParams();
  const getData = JSON.parse(data as string);

  const {
    id,
    name,
    description,
    detailsImage,
    prices,
    favorite,
    quantity,
    ingredients,
    average_rating,
  } = getData;

  const [sizeBorderSelected, setSizeBorderSelected] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(prices[0].price);
  const [selectedSize, setSelectedSize] = useState<PriceTypes[]>([]);
  const { imageURL } = useStore();

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{ uri: imageURL + detailsImage }}
          style={styles.detailsImage}
          imageStyle={styles.detailsImageStyle}
        >
          <DetailsHeader
            backBtn="arrow-back-outline"
            coffeeID={id}
            favorite={favorite}
          />
          <View style={styles.detailsImgFooter}>
            <Text style={styles.productName}>{name}</Text>
            <View>
              <View style={styles.productInfoContainer}>
                <Ionicons name="water" size={20} color={COLORS.orange} />
                <Text style={styles.productInfo}>{ingredients}</Text>
              </View>
              <View style={styles.productInfoContainer}>
                <Ionicons name="star" size={20} color={COLORS.orange} />
                <Text style={styles.productInfo}>{average_rating}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Text style={styles.productDescription}>{description}</Text>
        <View style={styles.sizeContainer}>
          {prices.map((val: PriceTypes, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSizeBorderSelected(index);
                setTotalPrice(val.price);
                setSelectedSize(val as any);
              }}
            >
              <View
                style={[
                  styles.borderContainer,
                  sizeBorderSelected === index && {
                    borderColor: COLORS.orange,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.productSize,
                    sizeBorderSelected === index && { color: COLORS.orange },
                  ]}
                >
                  {val.size}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <DetailsFooter
          totalPrice={totalPrice}
          coffeeID={id}
          data={getData}
          price={totalPrice}
          selectedSize={selectedSize}
        />
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  detailsImage: {
    height: 650,
  },
  detailsImageStyle: {
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  detailsImgFooter: {
    backgroundColor: "rgba(0,0,0,.6)",
    width: "100%",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    height: 100,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  productName: {
    color: COLORS.orange,
    fontSize: 25,
  },
  productInfo: {
    fontSize: 20,
    color: COLORS.white,
  },
  productInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  productDescription: {
    fontSize: 18,
    color: COLORS.white,
    marginTop: 30,
    marginLeft: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 60,
  },
  productSize: {
    fontSize: 25,
    color: COLORS.white,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 20,
    width: 100,
    alignItems: "center",
    borderRadius: 15,
  },
});
