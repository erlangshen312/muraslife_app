import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import {dimensionWidth, mlColors} from "../../../configs/config";
import Icon from "react-native-vector-icons/Ionicons";


const Search = () => {
    return (
        <View style={styles.container}>
            <Icon name='search-outline' size={22} style={styles.icon}/>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                style={styles.input}
                placeholder="Поиск"
                // value={title}
            />
            {/*<TouchableOpacity style={styles.clear}>*/}
            {/*    <Text>Стереть</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor: mlColors.white,
        borderRadius: 5,
    },
    icon:{
      paddingLeft: 5
    },
    input: {
        height: 45,
        alignItems:'flex-start',
        fontSize:17,
        width: dimensionWidth / 1.15,
        paddingLeft: 10,
    },
    clear:{}
});

export default Search;
