import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ITEM_HEIGHT, ITEM_WIDTH} from '../configs/config';

export default Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: ITEM_WIDTH ,
          height: ITEM_HEIGHT - ITEM_WIDTH,
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
