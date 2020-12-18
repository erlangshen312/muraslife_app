import React, {useContext} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../../AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {mlColors} from "../../../configs/config";
import {removeAuthData} from "../../../utils/asyncStorage";

export default function Settings({navigation}) {
  const {signOut} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} >
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Faq')}>
          <Icon name="information-circle-outline" size={22}/>
          <Text style={styles.button_title_general}>Справка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('App')}>
          <Icon name="construct-outline" size={22}/>
          <Text style={styles.button_title_general}>О приложении</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Icon name="at-outline" size={22}/>
          <Text style={styles.button_title_general}>Написать разработчикам</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Icon name="play-outline" size={22}/>
          <Text style={styles.button_title_general}>Оценить приложение</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {signOut(); removeAuthData()}}>
          <Icon name="exit-outline" size={22}/>
          <Text style={styles.button_title_danger}>Exit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button:{
    flexDirection:'row',
    alignItems:"center",
    backgroundColor:mlColors.white,
    margin:2,
    padding: 15,
  },
  button_title_general:{
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 10
  },
  button_title_danger:{
    color:mlColors.dark_red,
    fontWeight:'500',
    fontSize: 16,
    paddingLeft: 10
  },
});
