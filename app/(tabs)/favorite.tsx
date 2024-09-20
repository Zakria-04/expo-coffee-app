import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/assets/themes/colors";
import Header from "@/components/Header";
import { useStore } from "@/store/store";
import RenderFavorite from "@/components/RenderFavorite";
import EmptyList from "@/components/EmptyList";

const Favorite = () => {
  const { favoriteList } = useStore();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          {favoriteList.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <EmptyList />
            </View>
          ) : (
            <View>
              <Header />
              <RenderFavorite data={favoriteList} coffeeID={1} />
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
