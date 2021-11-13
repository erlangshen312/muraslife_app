import { ActivityIndicator } from 'react-native';
import React from 'react';
import styled from 'styled-components';

const Loader = styled(ActivityIndicator)`
  color: ${(props) => props?.color};
`;

const Suspender = ({ loading, color, size }) => (
  <>
    {loading && (
      <Loader
        animating={loading}
        hidesWhenStopped={loading}
        size={size || 'large'}
        color={color || '#1d77e8'}
      />
    )}
  </>
);

export { Suspender };
