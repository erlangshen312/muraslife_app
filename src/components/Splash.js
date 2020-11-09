import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {dimensionHeight, dimensionWidth} from '../configs/config';

export default Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: dimensionWidth,
          height: dimensionHeight / 3.2,
        }}
        source={require('../assets/images/muraslife-logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
