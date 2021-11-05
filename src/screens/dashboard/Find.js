import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native';

import { SubGetCategories } from '../../components/SubGetCategories';
import { Lists } from '../../components/Lists';

const Find = ({ route }) => {
  const { item } = route.params;
  return (
    <Container>
      <SubGetCategories item={item} />
      <Lists sub_category={item} />
    </Container>
  );
};

export default Find;

const Container = styled(SafeAreaView)`
  background-color: #ffffff;
`;
