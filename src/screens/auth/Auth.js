import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Login from './Login';
import Registration from './Registration';
import styled from 'styled-components';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Container>
      <SloganTitle>Привет! </SloganTitle>
      <SloganSubtitle>
        Теперь сможешь искать объявления легко, а так же добавлять...
      </SloganSubtitle>
      {isLogin ? <Login /> : <Registration />}
      <SwitchButton onPress={() => setIsLogin(!isLogin)}>
        <SwitchText>{isLogin ? 'Регистрация' : 'Войти'}</SwitchText>
      </SwitchButton>
    </Container>
  );
};
export default Auth;

const Container = styled(ScrollView)`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const SloganTitle = styled(Text)`
  font-size: 55px;
  color: #1d77e8;
  font-weight: 700;
`;

const SloganSubtitle = styled(Text)`
  font-size: 38px;
  color: #000;
  font-weight: 700;
`;

const SwitchButton = styled(TouchableOpacity)`
  padding: 15px;
`;

const SwitchText = styled(Text)`
  text-align: center;
  color: #1d77e8;
  font-weight: 600;
  font-size: 16px;
`;
