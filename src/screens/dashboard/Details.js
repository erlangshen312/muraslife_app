import React from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
    imageUrl,
    dimensionWidth,
    dimensionHeight,
    mlColors,
} from '../../configs/config';
import Icon from 'react-native-vector-icons/Ionicons';
import {phoneCall, whatsapp} from "../../components/talk";

export default function Details({route, navigation}) {
    const {item} = route.params;

    const itemClick = [
        {
            type: 'comment',
            title: 'Comments',
        },
        {
            type: 'view',
            title: 'Views',
        },
        {
            type: 'like',
            title: 'Likes',
        },
    ];
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text>{item.id}</Text>
                    <Image
                        source={{uri: imageUrl + `${item.banner}`}}
                        style={{
                            width: dimensionWidth,
                            height: dimensionHeight / 4,
                            margin: 0,
                            padding: 0,
                        }}
                    />
                    <View style={styles.service}>
                        <TouchableOpacity>
                            <Text style={styles.service_button}>Комментарии</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.service_button}>Просмотры</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.service_button}>Нравится</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.info_title}>{item.title}</Text>
                        <Text style={styles.info_note}>{item.note}</Text>
                    </View>
                    <View style={styles.coordinate}>
                        <TouchableOpacity style={styles.coordinate_adress}>
                            <Text>{item.adress}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.coordinate_metro}>
                            <View
                                style={[
                                    styles.coordinate_metro_icon,
                                    {backgroundColor: `${item.color}`},
                                ]}>
                                <Text>{item.number}</Text>
                            </View>
                            <Text>{item._metro}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.conversation}>
                        <TouchableOpacity
                            onPress={() => telephone(item.phone)}
                            style={styles.conversation_phone}>
                            <Icon name="call-outline" size={22} style={{color:mlColors.white}}/>
                            <Text style={styles.conversation_phone_title}> Позвонить </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>whatsapp(item.phone)}
                            style={styles.conversation_whatsapp}>
                            <Icon name="logo-whatsapp" size={22} style={{color:mlColors.white}}/>
                            <Text style={styles.conversation_whatsapp_title}> WhatsApp </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f5f5',
    },
    info: {padding: 10},
    info_title: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 10,
    },
    info_note: {},

    coordinate: {padding: 10},
    coordinate_adress: {
        flex:1,
        flexDirection: 'row',

        alignItems: 'center',
        marginBottom: 10,
    },
    coordinate_metro: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coordinate_metro_icon: {
        padding: 3,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 10,
    },
    service: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    service_button: {
        color: mlColors.dark_blue,
    },
    conversation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        position: 'relative',
        // bottom: 60,
    },
    conversation_phone: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: mlColors.blue,
        padding: 15,
        borderRadius: 10,
    },
    conversation_phone_title: {
        color:mlColors.white,
        fontWeight: '700'
    },
    conversation_whatsapp: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: mlColors.green,
        padding: 15,
        borderRadius: 10,
    },
    conversation_whatsapp_title: {
        color:mlColors.white,
        fontWeight: '700'
    },
    conversation_like: {
        backgroundColor: mlColors.light_green,
        padding: 15,
        borderRadius: 30,
    },
    conversation_like_title: {},
});
