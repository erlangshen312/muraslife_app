import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../AuthContext';

import { mlColors, API } from '../../configs/config';
import { setAuthData, setToken } from '../../utils/asyncStorage';
import styled from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');

  const onLoginHandler = async () => {
    setWarning('');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (email === '' || password === '') {
      return setWarning('Пустые поля! Заполните их!');
    }
    //ИСПРАВИТЬ ПРОВЕРКУ
    if (email.length === '' || password.length === '') {
      return setWarning('Укажите почту');
    }
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        `${API.apiv1}/api/users/login`,
        body,
        config,
      );
      await setToken(res.data.token);
      await setAuthData(res.data.user);
      signIn();
    } catch (error) {
      const warn = error.response.data.errors;
      setWarning(warn);
    }
  };
  return (
    <KeyboardWrapper behavior="padding">
      <View>
        <Warning>{warning}</Warning>
        <InputBase
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder="email или номер телефона"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputBase
          placeholder="пароль"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View>
        <LoginButton title="Login" onPress={() => onLoginHandler()}>
          <LoginText>Войти</LoginText>
        </LoginButton>
      </View>
    </KeyboardWrapper>
  );
};

export default Login;

const KeyboardWrapper = styled(KeyboardAvoidingView)``;

const LoginButton = styled(TouchableOpacity)`
  background-color: #1d77e8;
  margin: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 30px;
`;

const LoginText = styled(Text)`
  font-size: 17px;
  color: #fff;
  font-weight: 600;
`;

const InputBase = styled(TextInput)`
  background-color: #f5f5f5;
  margin-bottom: 10px;
  min-height: 55px;
  padding: 0 15px;
  border-radius: 10px;
`;

const Warning = styled(Text)`
  padding: 10px 0;
  color: #c1a800;
`;
