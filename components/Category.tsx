import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useStore } from "@/store/store";
import { COLORS } from "@/assets/themes/colors";

interface CategoryProps {
  setData: any;
  coffeeList: any;
}

const Category: React.FC<CategoryProps> = (props) => {
  const { coffeeList } = useStore();
  const [pressedCategory, setPressedCategory] = useState(0);

  const category = [...new Set(coffeeList.map((item) => item.category))];
  category.unshift("All");

  const changePressedCategoryColor = (inedx: number) => {
    setPressedCategory(inedx);
  };

  const filterItemByCategory = (val: string) => {
    if (val === "All") {
      props.setData(props.coffeeList);
    } else {
      const filteredItem = props.coffeeList.filter(
        (cate: any) => cate.category === val
      );
      props.setData(filteredItem);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {category.map((cate, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                filterItemByCategory(cate);
                changePressedCategoryColor(index);
              }}
            >
              <Text
                style={[
                  styles.categoryTxt,
                  pressedCategory === index && { color: COLORS.orange },
                ]}
              >
                {cate}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  categoryTxt: {
    fontSize: 24,
    color: COLORS.white,
    marginLeft: 10,
  },
});
