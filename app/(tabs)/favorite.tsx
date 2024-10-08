import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/assets/themes/colors";
import Header from "@/components/Header";
import { useStore } from "@/store/store";
import RenderFavorite from "@/components/RenderFavorite";
import EmptyList from "@/components/EmptyList";

const Favorite = () => {
  const { favoriteList, userFavorite, auth } = useStore();
  const data = auth ? userFavorite : favoriteList;
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {data.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <EmptyList message="favorite" icon={"heart"} color={COLORS.red} />
            </View>
          ) : (
            <View>
              <Header screen="Favorite List" />
              <RenderFavorite data={data} coffeeID={1} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Favorite;

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
