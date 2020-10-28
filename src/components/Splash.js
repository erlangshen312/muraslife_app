import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 320,
            height: 200,
          }}
          source={require('../assets/images/muraslife-logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
