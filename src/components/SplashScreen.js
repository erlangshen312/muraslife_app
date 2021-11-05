import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ITEM_HEIGHT, ITEM_WIDTH } from '../configs/config';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT - ITEM_WIDTH,
        }}
        source={require('../assets/images/muraslife-logo.png')}
      />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
