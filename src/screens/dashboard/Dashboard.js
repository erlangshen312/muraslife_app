import React from 'react';
import { SafeAreaView } from 'react-native';
import { GetCategories } from '../../components/GetCategories';
import { Lists } from '../../components/Lists';
import styled from 'styled-components';

export const Dashboard = () => {
  return (
    <Container>
      <GetCategories />
      <Lists />
    </Container>
  );
};

export default Dashboard;

const Container = styled(SafeAreaView)`
  background-color: #ffffff;
`;
