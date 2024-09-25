import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";

interface UserInfoModalProps {
  modal: boolean;
  setModal: any;
}

const UserInfoModal: React.FC<UserInfoModalProps> = (props) => {
  const { setModal, modal } = props;
  return (
    <Modal visible={modal} transparent>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.checkPasswordText}>Enter your password</Text>
          <TextInput style={styles.checkPasswordInput} secureTextEntry />
          <TouchableOpacity>
            <View style={styles.sendBtnContainer}>
              <Text style={styles.sendBtnText}>send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserInfoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.8)",
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 350,
    width: 350,
    borderRadius: 20,
  },
  checkPasswordText: {
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 15,
  },
  checkPasswordInput: {
    borderWidth: 1,
    borderColor: COLORS.white,
    width: 250,
    padding: 15,
    color: COLORS.orange,
    borderRadius: 8,
    fontSize: 18,
  },
  sendBtnContainer: {
    backgroundColor: COLORS.orange,
    padding: 12,
    borderRadius: 8,
    width: 150,
    alignItems: "center",
    marginTop: 30,
  },
  sendBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
});
