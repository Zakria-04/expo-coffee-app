import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/assets/themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { goBackOneStep } from "@/assets/res/utils";
import UserInfoModal from "@/components/Modals/UserInfoModal";
import { useStore } from "@/store/store";

const Profile = () => {
  const { auth, user, logoutUser, deleteAccount } = useStore();
  const [userInfoModal, setUserInfoModal] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={goBackOneStep}>
            <Ionicons
              name="chevron-back"
              size={35}
              color={COLORS.white}
              style={styles.backBtn}
            />
          </TouchableOpacity>
          <Text style={styles.profileText}>{user.userName}</Text>
          <Ionicons name="person-circle-sharp" size={50} color={COLORS.white} />
        </View>
        <View style={styles.profileDetailsContainer}>
          <TouchableOpacity
            onPress={() => {
              setUserInfoModal(true);
            }}
          >
            <Text style={styles.profileDetailsText}>
              change account information
            </Text>
          </TouchableOpacity>

          <Ionicons name="person" size={20} color={COLORS.orange} />
        </View>
        <View style={styles.profileDetailsContainer}>
          <TouchableOpacity
            onPress={() => {
              deleteAccount(user._id);
              logoutUser();
              goBackOneStep();
            }}
          >
            <Text style={styles.profileDetailsText}>delete my account</Text>
          </TouchableOpacity>
          <Ionicons name="trash" size={20} color={COLORS.orange} />
        </View>
        <View style={styles.profileDetailsContainer}>
          <TouchableOpacity
            onPress={() => {
              goBackOneStep();
              logoutUser();
            }}
          >
            <Text style={styles.profileDetailsText}>logout</Text>
          </TouchableOpacity>
          <Ionicons name="log-out" size={20} color={COLORS.orange} />
        </View>
      </SafeAreaView>

      {/* Modals */}
      <UserInfoModal setModal={setUserInfoModal} modal={userInfoModal} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "10%",
    marginLeft: 12,
  },
  profileText: {
    fontSize: 40,
    color: COLORS.white,
    marginRight: 10,
  },
  profileDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginBottom: "5%",
  },
  profileDetailsText: {
    fontSize: 20,
    color: COLORS.white,
    marginRight: 10,
  },
  backBtn: {
    marginRight: 20,
    marginTop: 8,
  },
  userModal: {
    flex: 1,
    backgroundColor: "red",
    height: 200,
  },
});
