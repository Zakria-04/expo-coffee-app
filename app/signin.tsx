import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/assets/themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { navigateToScreen } from "@/assets/res/utils";
import SubmitForm from "@/components/SubmitForm";
import { useStore } from "@/store/store";
import LoadingIndicator from "@/components/LoadingIndicator";

interface SigninTypes {
  userName: string;
  userPass: string;
  email?: string;
}

const Signin = () => {
  const { logUser, isLoading, auth } = useStore();

  const signinUserFromAPI = async (form: SigninTypes) => {
    logUser(form);
  };

  useEffect(() => {
    if (!isLoading && auth) {
      navigateToScreen("/home");
    }
  }, [isLoading, auth]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigateToScreen("/home")}
          style={styles.backBtn}
        >
          <Ionicons name="caret-back-outline" size={50} color={COLORS.white} />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={styles.logTextMessage}>Login</Text>
          <Text
            style={[
              styles.logTextMessage,
              { color: COLORS.orange, fontSize: 25 },
            ]}
          >
            Account
          </Text>
          <SubmitForm logStatus="signin" onSubmit={signinUserFromAPI} />
          <View style={styles.goToLogin}>
            <Text style={styles.goToLoginText}>not a member yet?</Text>
            <TouchableOpacity onPress={() => navigateToScreen("/signup")}>
              <Text
                style={[
                  styles.goToLoginText,
                  { textDecorationLine: "underline", color: COLORS.orange },
                ]}
              >
                {" "}
                signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signin;

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
