import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";

const SearchItem = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="search here..."
        placeholderTextColor={COLORS.grey}
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
