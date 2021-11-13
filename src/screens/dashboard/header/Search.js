import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { ITEM_WIDTH, mlColors, ITEM_HEIGHT } from '../../../configs/config';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = () => {
  return (
    // <View style={{flex: 1, flexDirection: 'row'}}>
    <View style={styles.container}>
      <Icon name="search-outline" size={22} style={styles.icon} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={'default'}
        style={styles.input}
        placeholder="Поиск по названию"
        placeholderTextColor={mlColors.light_brown}
        // value={title}
      />
      {/*<TouchableOpacity style={styles.clear}>*/}
      {/*    <Text>Стереть</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
    // <TouchableOpacity
    //   style={{
    //     position: 'absolute',
    //     bottom: 0,
    //     right: 0,
    //     top: 0,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     padding: 10,
    //   }}>
    //   <Image
    //     style={{
    //       width: 25,
    //       height: 25,
    //     }}
    //     source={require('../../../assets/images/metro.png')}
    //   />
    // </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mlColors.white,
    borderRadius: 5,
    borderColor: mlColors.dark_white,
    borderWidth: 2,
    margin: 10,
  },
  icon: {
    color: mlColors.light_brown,
    paddingLeft: 10,
  },
  input: {
    height: 45,
    alignItems: 'flex-start',
    fontSize: 17,
    // width: dimensionWidth / 1.15,
    width: ITEM_WIDTH / 1.15,
    paddingLeft: 10,
    fontFamily: 'SourceSansPro-Regular',

    // color: mlColors.text,
  },
  clear: {},
});

export default Search;
