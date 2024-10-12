import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SubmitForm from "@/components/SubmitForm";
import { COLORS } from "@/assets/themes/colors";
import { goBackOneStep, navigateToScreen } from "@/assets/res/utils";
import { Ionicons } from "@expo/vector-icons";
import { registerUser, signinUser } from "@/assets/res/api";
import { useStore } from "@/store/store";
import LoadingIndicator from "@/components/LoadingIndicator";

const Signup = () => {
  const { user, logUser, isLoading, signupUser, auth } = useStore();
  const [loading, setLoading] = useState(false);

  const createNewUserFromAPI = async (form: any) => {
    signupUser(form).then(() => {
      logUser(form).then(() => {
        navigateToScreen("/home");
      });
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity onPress={goBackOneStep} style={styles.backBtn}>
          <Ionicons name="caret-back-outline" size={50} color={COLORS.white} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={styles.logTextMessage}>Create New</Text>
          <Text
            style={[
              styles.logTextMessage,
              { color: COLORS.orange, fontSize: 25 },
            ]}
          >
            Account
          </Text>
          <SubmitForm logStatus="signup" onSubmit={createNewUserFromAPI} />
          <View style={styles.goToLogin}>
            <Text style={styles.goToLoginText}>already have an account?</Text>
            <TouchableOpacity onPress={() => navigateToScreen("/signin")}>
              <Text
                style={[
                  styles.goToLoginText,
                  { textDecorationLine: "underline", color: COLORS.orange },
                ]}
              >
                {" "}
                login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  logTextMessage: {
    fontSize: 35,
    color: COLORS.white,
    textAlign: "center",
  },
  goToLogin: {
    flexDirection: "row",
    justifyContent: "center",
  },
  goToLoginText: {
    fontSize: 18,
    color: COLORS.white,
  },
  backBtn: {
    position: "absolute",
    top: 55,
    left: 10,
    zIndex: 1,
  },
});
