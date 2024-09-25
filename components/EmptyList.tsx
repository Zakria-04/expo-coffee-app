import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "@/assets/images/images";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/themes/colors";

interface EmptyListProps {
  message: string;
  icon: any;
  color: any;
}

const EmptyList: React.FC<EmptyListProps> = (props) => {
  return (
    <View style={styles.container}>
      <Image source={Images.emptyList} style={styles.emptyListImg} />
      <View style={styles.emptyListContainer}>
        <Text
          style={styles.emptyListText}
        >{`Your ${props.message} list is empty`}</Text>
        <Ionicons name={props.icon} size={40} color={props.color} />
      </View>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  emptyListText: {
    color: COLORS.white,
    fontSize: 20,
    marginRight: 5,
  },
  emptyListImg: {
    width: 150,
    height: 150,
  },
  emptyListContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
