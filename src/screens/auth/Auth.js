import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import {
  dimensionWidth,
  mlColors,
  dimensionHeight,
  apiUrl,
} from '../../configs/config';
import Login from './Login';
import Registration from './Registration';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          source={require('../../assets/images/muraslife-logo2.png')}
          style={styles.logo}
        />
      </View>
      {isLogin ? <Login /> : <Registration />}
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text
          style={{
            textAlign: 'center',
            color: mlColors.white,
            fontSize: 14,
            fontWeight: '600',
          }}>
          {isLogin ? 'New account' : 'Back to login'}
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
    alignItems: 'center',
    flexGrow: 2,
    justifyContent: 'center',
  },
  logo: {
    width: dimensionWidth / 2 + 120,
    height: dimensionHeight / 5 + 30,
  },
  title: {
    color: mlColors.black,
    width: '100%',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 36,
    lineHeight: 30,
    marginTop: 30,
    opacity: 0.9,
  },
  input_container: {
    paddingTop: 30,
  },
  text_input: {
    height: 55,
    backgroundColor: 'rgba(236,239,241 ,1)',
    marginBottom: 15,
    paddingLeft: 20,
    borderRadius: 30,
  },
  button_container: {
    // paddingVertical: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlColors.white,
    height: 55,
    marginBottom: 20,
    borderRadius: 30,
  },
  text_button: {
    // fontFamily: 'RobotoBold',
    color: mlColors.black,
    fontWeight: '700',
  },
  error: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    color: mlColors.white,
  },
});
