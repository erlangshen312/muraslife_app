import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';

import { ITEM_HEIGHT, ITEM_WIDTH } from '../configs/config';

const SplashScreen = () => (
  <Container>
    <MaskImage
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      source={require('../assets/images/muraslife-logo.png')}
    />
  </Container>
);

export { SplashScreen };

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const MaskImage = styled(Image)`
  width: ${(props) => props.itemWidth};
  height: ${(props) => props.itemHeight - props.itemWidth};
`;
