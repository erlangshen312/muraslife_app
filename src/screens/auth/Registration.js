import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AuthContext } from '../../AuthContext';

import { API, mlColors } from '../../configs/config';
import { getToken, setToken } from '../../utils/asyncStorage';
import styled from 'styled-components';

const Registration = () => {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');

  const onLoginHandler = async () => {
    if (password !== password2) {
      console.log('PASSWORD IS NOT MATCH');
      setWarning('Введенные пароли не совпадают!');
    } else {
      setWarning('');
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify({ nickname, phone, email, password });
      try {
        const res = await axios.post(
          `${API.apiv1}/api/users/register`,
          body,
          config,
        );
        try {
          console.log(res);
          await setToken(res.data.token);
          const token = await getToken();
          console.log(token);
          signUp();
        } catch (err) {
          console.warn(err);
        }
        signUp();
      } catch (error) {
        const warning = error.response.data.errors;
        setWarning(warning);
      }
    }
  };
  return (
    <KeyboardWrapper behavior="padding">
      <View>
        <Warning>{warning}</Warning>
        <InputBase
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'default'}
          placeholder="Псевдоним"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />
        <InputBase
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'phone-pad'}
          placeholder="Номер телефона"
          type="tel"
          value={phone}
          maxLength={11}
          onChangeText={(text) => setPhone(text)}
        />
        <InputBase
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder="Твоя почта"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputBase
          placeholder="Придумай пароль"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <InputBase
          placeholder="Повтори пароль"
          secureTextEntry
          value={password2}
          onChangeText={(text) => setPassword2(text)}
        />
      </View>
      <View>
        <RegistrationButton
          title="Registration"
          onPress={() => onLoginHandler()}
        >
          <RegistrationText>Зарегистрироваться</RegistrationText>
        </RegistrationButton>
      </View>
    </KeyboardWrapper>
  );
};

export default Registration;

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlColors.white,
    height: 55,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  text_button: {
    color: '#0052CC',
    fontWeight: '700',
  },
  error: {
    paddingTop: 10,
    paddingBottom: 10,
    color: mlColors.white,
  },
});

const RegistrationButton = styled(TouchableOpacity)`
  background-color: #1d77e8;
  margin: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 30px;
`;

const RegistrationText = styled(Text)`
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

const KeyboardWrapper = styled(KeyboardAvoidingView)``;

const Warning = styled(Text)`
  padding: 10px 0;
  color: #c1a800;
`;
