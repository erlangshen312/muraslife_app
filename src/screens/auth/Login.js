import React, { useState, useContext } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../AuthContext";

import { mlColors, API } from "../../configs/config";
import { setToken } from "../../utils/asyncStorage";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const onLoginHandler = async () => {
    // const method = {method: 'POST'};
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    //ИСПРАВИТЬ ПРОВЕРКУ
    if (email.length === "" || password.length === "") {
      return setWarning("Укажите почту");
    }
    try {
      const res = await axios.post(`${API.apiv1}/api/auth`, body, config);
      try {
        await setToken(res.data.token);
        signIn();
      } catch (err) {
        console.log("RESPONSE ERROR:", err);
        console.warn(err);
      }
    } catch (error) {
      console.log("ERROR IN LOGIN:", error);
      const warning = error.response.data.errors.map((er) => er.msg);
      setWarning(warning);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.input_container}>
        <Text style={styles.error}>{warning}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={"email-address"}
          style={styles.text_input}
          placeholder="email@mail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.text_input}
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity
          title="Login"
          style={styles.button}
          onPress={() => onLoginHandler()}
        >
          <Text style={styles.text_button}>ВОЙТИ</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  text_input: {
    height: 55,
    backgroundColor: mlColors.white,
    marginBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d0d0d0',
    elevation: 2,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: mlColors.white,
    height: 55,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  text_button: {
    color:'#0052CC',
    fontWeight: "700",
  },
  error: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    color: mlColors.white,
  },
});
