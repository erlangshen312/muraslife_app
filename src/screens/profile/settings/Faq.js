import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {mlColors} from "../../../configs/config";

export default function Faq() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} >
        <Text>
          Text here
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{},
  scroll:{},
  button:{
    flexDirection:'row',
    alignItems:"center",
    backgroundColor:mlColors.white,
    margin:5,
    padding: 15,
  },
  button_title_general:{
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 5
  },
  button_title_danger:{
    color:mlColors.dark_red,
    fontWeight:'500',
    fontSize: 16,
    paddingLeft: 5
  },

});
