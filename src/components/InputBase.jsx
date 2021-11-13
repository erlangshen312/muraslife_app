import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';

const Input = styled(TextInput)`
  background-color: #ff8;
  margin: 10px;
  min-height: 55px;
`;

const InputBase = ({
  value,
  maxLength,
  minLength,
  onChange,
  placeholder,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  multiline,
  numberOfLines,
}) => (
  <Input
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    keyboardType={keyboardType}
    placeholder={placeholder}
    maxLength={maxLength}
    minLength={minLength}
    value={value}
    onChangeText={onChange}
    multiline={multiline}
    numberOfLines={numberOfLines}
  />
);

export { InputBase };
