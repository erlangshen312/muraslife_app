import React, {useState, useContext} from 'react';
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
import {AuthContext} from '../../AuthContext';

import {API, mlColors} from '../../configs/config';
import {getToken, setToken} from '../../utils/asyncStorage';

const Registration = () => {
  const {signUp} = useContext(AuthContext);

  const [name, setUsername] = useState('');
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
      const config = {headers: {'Content-Type': 'application/json'}};
      const body = JSON.stringify({name, email, password});
      try {
        const res = await axios.post(`${API.apiv1}/api/users`, body, config);
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
        const warning = error.response.data.errors.map((er) => er.msg);
        console.warn(error);
        setWarning(warning);
      }
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.input_container}>
        <Text style={styles.error}>{warning}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          // keyboardType={'text'}
          style={styles.text_input}
          placeholder="nickname"
          // placeholderTextColor="white"
          value={name}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          // keyboardType={'text'}
          style={styles.text_input}
          placeholder="nickname"
          // placeholderTextColor="white"
          value={name}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={'email-address'}
          style={styles.text_input}
          placeholder="email@mail.com"
          // placeholderTextColor="white"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.text_input}
          placeholder="*********"
          secureTextEntry
          // placeholderTextColor="white"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.text_input}
          placeholder="*********"
          secureTextEntry
          // placeholderTextColor="white"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
        />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity
          title="Login"
          style={styles.button}
          onPress={() => onLoginHandler()}>
          <Text style={styles.text_button}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    color: mlColors.white,
  },
});
