import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Link} from 'react-router-native';
import {dimensionWidth, dimensionHeight} from '../../configs/config';

export default function NewsDetails({route, navigation}) {
  const {item} = route.params;

  const regex = /(<([^>]+)>)/gi;
  const result = item.content.rendered.replace(regex, '');

  const openElgezit = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView>
      <Image
        source={{uri: item.jetpack_featured_media_url}}
        style={{
          width: dimensionWidth,
          height: dimensionHeight / 4,
          // borderRadius: ,
        }}
      />
      <View style={{padding: 10}}>
        <Text style={{fontWeight: '700', fontSize: 15}}>
          {item.title.rendered}
        </Text>
        <Text>{result}</Text>

        <View>
          {/* {item.jrp.map((i, ix) => {
            return (
              <TouchableOpacity key={i.id}>
                <Image
                  source={{uri: i.img.src}}
                  style={{
                    width: 100,
                    height: 100,
                    // borderRadius: ,
                  }}
                />
              </TouchableOpacity>
            );
          })} */}
        </View>

        <TouchableOpacity onPress={() => openElgezit(item.link)}>
          <Text>Elgezit.kg</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
