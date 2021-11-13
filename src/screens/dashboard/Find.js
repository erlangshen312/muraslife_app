import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native';

import { SubGetCategories } from '../../components/SubGetCategories';
import { ListsCategoriesPosts } from '../../components/ListsCategoriesPosts';

const Find = ({ route }) => {
  const { item } = route.params;
  return (
    <Container>
      <SubGetCategories item={item} />
      <ListsCategoriesPosts />
    </Container>
  );
};

export default Find;

const Container = styled(SafeAreaView)`
  background-color: #ffffff;
`;
