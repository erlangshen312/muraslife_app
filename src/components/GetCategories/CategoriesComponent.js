import React from 'react';
import { FlatList, View, Text, TouchableHighlight } from 'react-native';
import { mlColors } from '../../configs/config';
import styled from 'styled-components';

import { Suspender } from '../_common/Suspender';

const CategoriesComponent = ({ categories, selectedCategory, isLoading }) => (
  <>
    <Suspender loading={isLoading} />
    <FlatList
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      refreshing={isLoading}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <Wrapper>
            <Button
              underlayColor={mlColors.light_blue}
              onPress={() => selectedCategory(item)}
            >
              <Title>{item.name}</Title>
            </Button>
          </Wrapper>
        );
      }}
    />
  </>
);
export { CategoriesComponent };

const Wrapper = styled(View)`
  margin: 10px 5px;
`;
const Button = styled(TouchableHighlight)`
  background-color: #fff;
  margin-end: 10px;
  padding: 15px;
  align-items: center;
  border-radius: 5px;
  min-width: 100px;
  max-width: 250px;
  margin: 2px;
  shadow-color: '#666';
  shadow-opacity: 0.1;
  elevation: 3;
`;
const Title = styled(Text)`
  color: ${mlColors.primary};
  font-size: 17px;
  font-family: 'SourceSansPro-SemiBold';
`;
