import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import styled from 'styled-components/native';

import {
  GRAY_FIVE,
  GRAY_FOUR,
  WHITE_ONE,
  GREEN_TWO,
} from '../constants/colors';

const Wrapper = styled(View)`
  display: flex;
  flex-direction: row;
`;

const BaseField = styled(TextInput)`
  height: 50px;
  align-items: flex-start;
  font-size: 16px;
  padding-left: 10px;
  background: ${WHITE_ONE};
  border: 1px solid ${GRAY_FIVE};
  border-radius: 8px;
`;
const Input = styled(BaseField)`
  flex-grow: 2;
  padding-right: 10px;
`;

const Icons = styled(View)`
  color: ${GRAY_FOUR};
  padding-left: 10px;
`;
//
// const FilterButton = styled(Pressable)``;
// const Title = styled(BaseField)``;

const BaseButton = styled(Pressable)`
  background: ${(props) => (props.primary ? GREEN_TWO : WHITE_ONE)};
  color: ${(props) => (props.primary ? WHITE_ONE : GREEN_TWO)};
  font-size: 16px;
  margin: 12px;
  border-radius: 30px;
`;

const SearchComponent = () => {
  return (
    <>
      <Wrapper>
        <Input placeholder="Поиск объявлений" placeholderColor={GRAY_FOUR} />
        {/*<FilterButton>*/}
        {/*  <Title>Hello</Title>*/}
        {/*</FilterButton>*/}
      </Wrapper>
      <BaseButton />
      <BaseButton primary />
    </>
  );
};
export default SearchComponent;
