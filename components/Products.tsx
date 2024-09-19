import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";

interface ProductData {
  id: number;
  category: string;
  name: string;
  description: string;
  image: any;
  detailsImg: string;
  prices: any;
  favorite: boolean;
  quantity: number;
}

interface ProductsProps {
  data: ProductData[];
  category: string;
}

const Products: React.FC<ProductsProps> = (props) => {
  const filterDataByCategory = props.data.filter(
    (item) => item.category === props.category
  );

  const renderData: ListRenderItem<ProductData> = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Image source={item.image} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.prices[0].price} $</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={filterDataByCategory}
        showsHorizontalScrollIndicator={false}
        renderItem={renderData}
        horizontal
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.darkBlue2,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  itemImage: {
    borderRadius: 25,
    width: 200,
    height: 200,
  },
  itemName: {
    fontSize: 25,
    color: COLORS.grey,
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 20,
    color: COLORS.orange,
    textAlign: "center",
  },
});
