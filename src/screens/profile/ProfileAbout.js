import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {dimensionWidth, dimensionHeight} from '../../configs/config';

export default function ProfileAbout() {
  const avatar =
    'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';

  return (
    <View>
      <View>
        <Image
          source={{
            uri:
              'https://images.unsplash.com/photo-1602962447559-8e11b51f65ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
          }}
          style={{
            width: dimensionWidth,
            height: dimensionHeight / 4,
            // borderRadius: ,
          }}
        />
        <Image
          source={{
            uri: avatar,
          }}
          style={{
            width: 130,
            height: 130,
            alignSelf: 'center',
            borderRadius: 100,
            position: 'absolute',
            bottom: -40,
          }}
        />
      </View>
      <View style={{top: 30, padding: 20}}>
        <View
          style={{
            position: 'relative',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
            }}>
            Erick Malkovich
          </Text>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>
            Every body take new whear when someone can not buy bread
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
