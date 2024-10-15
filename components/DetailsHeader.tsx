import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";
import { goBackOneStep } from "@/assets/res/utils";
import { useStore } from "@/store/store";
import { ListDataTypes } from "@/assets/res/types";

interface DetailsHeaderProps {
  backBtn?: keyof typeof Ionicons.glyphMap;
  coffeeID?: number;
  favorite?: boolean;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = (props) => {
  const { addToFavorite, favoriteList, userFavorite, auth } = useStore();
  const data = auth ? userFavorite : favoriteList;

  const checkIFCofeeIDInFavoriteList = data.some(
    (id: ListDataTypes) => id.id === props.coffeeID
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackOneStep}>
        <Ionicons name={props.backBtn} size={50} color={COLORS.orange} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (props.coffeeID !== undefined) {
            addToFavorite(props.coffeeID);
          }
        }}
      >
        <Ionicons
          name="heart"
          size={50}
          color={checkIFCofeeIDInFavoriteList ? COLORS.red : COLORS.darkBlue2}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
});
