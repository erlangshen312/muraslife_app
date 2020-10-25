import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.content}>
        <Text> Loading </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
