import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Image, Dimensions} from 'react-native';
import {dimensionWidth, mlColors} from "../../../configs/config";
import Icon from "react-native-vector-icons/Ionicons";

const {width: width, height: height} = Dimensions.get("screen");


const IMAGES = [
    {
        id:1,
        url:'https://images.unsplash.com/photo-1600953438062-f8f1db3510b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80'
    },
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1587732305677-5bc3c4bda871?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1567&q=80'
    },
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1606005506909-b5df4ae4636b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80'
    },
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1605977216813-2db4874819b4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=975&q=80'
    },
]

const Banners = () => {
    return (
        <FlatList
            horizontal={true}
            pagingEnabled={true}
            legacyImplementation={false}
            showsHorizontalScrollIndicator={false}
            data={IMAGES}
            keyExtractor={((item, index) => index.toString())}
            renderItem={({item}) => {
                return (
                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={{uri: item.url}}
                        />
                    </View>
                )
            }}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    image: {
        width: width,
        height: undefined,
        alignSelf: 'center',
        aspectRatio: 3 / 2
    }

});

export default Banners;
