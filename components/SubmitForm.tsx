import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "@/assets/themes/colors";
import { Ionicons } from "@expo/vector-icons";

interface SubmitFormProps {
  logStatus: string;
}

const SubmitForm: React.FC<SubmitFormProps> = (props) => {
  const { logStatus } = props;

  const addRequiredText = () => {
    return (
      <View>
        <Text style={styles.requireText}> (required)</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.userInputText}>
          {logStatus === "signup" ? "userName" : "UserName or Email"}
          {addRequiredText()}
        </Text>
        <TextInput style={styles.userInput} />
        {logStatus === "signup" && (
          <View>
            <Text style={styles.userInputText}>
              email
              {addRequiredText()}
            </Text>
            <TextInput style={styles.userInput} />
          </View>
        )}
        <Text style={styles.userInputText}>
          Password
          {addRequiredText()}
        </Text>
        <TextInput style={styles.userInput} secureTextEntry />
        <TouchableOpacity>
          <View style={styles.logBtn}>
            <Text style={styles.logBtnText}>
              {logStatus === "signup" ? "sign me up!" : "login"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubmitForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  userInputText: {
    color: COLORS.white,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 50,
  },
  userInput: {
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 15,
    width: 300,
    borderRadius: 8,
    color: COLORS.white,
  },
  logBtnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
  },
  logBtn: {
    borderWidth: 1,
    backgroundColor: COLORS.orange,
    padding: 20,
    alignItems: "center",
    borderRadius: 15,
    marginTop: "15%",
  },
  requireText: {
    fontSize: 11,
    color: COLORS.orange,
  },
});
