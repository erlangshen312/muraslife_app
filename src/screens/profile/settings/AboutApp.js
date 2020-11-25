import React from 'react';
import {StyleSheet,Text, SafeAreaView} from 'react-native';
import {aboutAppInfo} from "../../../configs/config";

export default function AboutApp() {
  return (
    <SafeAreaView style={styles.container}>
     <Text>
       {aboutAppInfo.appName}</Text>
       {/*{aboutAppInfo.socialLink}*/}
       <Text>{aboutAppInfo.version}
     </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    alignSelf:'center',
  },
});
