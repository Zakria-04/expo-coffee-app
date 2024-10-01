import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/assets/themes/colors";
import { Ionicons } from "@expo/vector-icons";

interface SubmitFormProps {
  logStatus: string;
  onSubmit: (form: {
    userName: string;
    email?: string;
    userPass: string;
  }) => void;
}

const SubmitForm: React.FC<SubmitFormProps> = (props) => {
  const { logStatus, onSubmit } = props;
  const [form, setForm] = useState({
    userName: "",
    userPass: "",
    email: "",
  });

  console.log(form);

  const handleFormTextChange = (key: string, value: any) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

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
        <TextInput
          style={styles.userInput}
          onChangeText={(value: any) => handleFormTextChange("userName", value)}
        />
        {logStatus === "signup" && (
          <View>
            <Text style={styles.userInputText}>
              email
              {addRequiredText()}
            </Text>
            <TextInput
              style={styles.userInput}
              onChangeText={(value) => handleFormTextChange("email", value)}
            />
          </View>
        )}
        <Text style={styles.userInputText}>
          Password
          {addRequiredText()}
        </Text>
        <TextInput
          style={styles.userInput}
          secureTextEntry
          onChangeText={(value) => handleFormTextChange("userPass", value)}
        />
        <TouchableOpacity
          onPress={() => {
            onSubmit(form);
          }}
        >
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
