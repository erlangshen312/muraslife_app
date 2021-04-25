import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Text, StatusBar } from "react-native";
import {
  dimensionWidth,
  mlColors,
  dimensionHeight,
} from "../../configs/config";
import Login from "./Login";
import Registration from "./Registration";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={mlColors.dark_red}/>
      <View style={styles.logo_container}>
        <Image
          source={require("../../assets/images/muraslife-logo2.png")}
          style={styles.logo}
        />
      </View>
      {isLogin ? <Login /> : <Registration />}
      <TouchableOpacity style={{
        paddingVertical: 5,
      }} onPress={() => setIsLogin(!isLogin)}>
        <Text
          style={{
            textAlign: "center",
            color: "#eaeaea",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {isLogin ? "Регистрация" : "Войти"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: mlColors.dark_red,
    padding: 40,
  },
  logo_container: {
    alignItems: "center",
    flexGrow: 2,
    justifyContent: "center",
  },
  logo: {
    // padding:20,
    width: dimensionWidth ,
    height: dimensionHeight * 120 / dimensionWidth,

  },

});
