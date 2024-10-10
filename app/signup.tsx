import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SubmitForm from "@/components/SubmitForm";
import { COLORS } from "@/assets/themes/colors";
import { goBackOneStep, navigateToScreen } from "@/assets/res/utils";
import { Ionicons } from "@expo/vector-icons";
import { registerUser, signinUser } from "@/assets/res/api";
import { useStore } from "@/store/store";

const Signup = () => {
  const { user, logUser } = useStore();
  const [loading, setLoading] = useState(false);

  const createNewUserFromAPI = async (form: any) => {
    try {
      setLoading(true);
      const response = await registerUser(form);
      if (response) {
        console.log("user has been created");
        try {
          const logUserin = await signinUser(form);
          if (logUserin) {
            setLoading(false);
            logUser(logUserin);
            navigateToScreen("/home");
          }
        } catch (err) {
          setLoading(false);
          console.error("err with loggin in", err);
        }
      }
    } catch (err) {
      console.error("error with creating user", err);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={COLORS.orange} />
        <Text>loading...</Text>
      </View>
    );
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
