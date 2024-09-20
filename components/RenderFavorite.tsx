import {
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import DetailsHeader from "./DetailsHeader";
import { navigateToScreen } from "@/assets/res/utils";

interface RenderFavoriteProps {
  data: any;
  coffeeID: any;
}

const RenderFavorite: React.FC<RenderFavoriteProps> = (props) => {
  const renderFavorite: ListRenderItem<any> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToScreen("details", item);
        }}
      >
        <ImageBackground
          source={item.detailsImg}
          imageStyle={styles.detailsImg}
          style={styles.detailsImg}
        >
          <DetailsHeader coffeeID={item.id} />
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderFavorite}
        scrollEnabled={false}
      />
    </View>
  );
};

export default RenderFavorite;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  detailsImg: {
    height: 400,
    width: 350,
    borderRadius: 50,
    marginBottom: 50,
  },
});
