import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/assets/themes/colors";

interface SearchItemProps {
  setData: any;
  coffeeList: any;
}

const SearchItem: React.FC<SearchItemProps> = (props) => {
  const [search, setSearch] = useState("");

  const filterDataBySearch = (category: any) => {
    if (search != "") {
      const filter = props.coffeeList.filter((item: any) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
      props.setData(filter);
    } else if (search === "") {
      props.setData(props.coffeeList);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="search here..."
        placeholderTextColor={COLORS.grey}
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          filterDataBySearch(value);
        }}
      />
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    fontSize: 20,
    padding: 15,
    color: COLORS.white,
    width: "90%",
    borderRadius: 20,
  },
});
