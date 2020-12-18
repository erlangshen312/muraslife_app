import React from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';
import {mlColors} from "../../../configs/config";
import Icon from "react-native-vector-icons/Ionicons";


const DATA = [
    // {
    //     id: 1,
    //     title: 'Some title text',
    //     note: 'Some text desc',
    //     date: '12.08.2020',
    //     status: 'active',
    // }
]

export default function Notification() {
    return (
        <View style={styles.container}>
            {DATA.length !== 0
                ? <FlatList data={DATA} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.button}>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.note}>{item.note}</Text>
                            </View>
                            <View>
                                <Text style={styles.status}>{item.status}</Text>
                                <Text style={styles.date}>{item.date}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}/>
                : <View style={styles.empty}>
                        <Icon name="notifications-outline" size={120}/>
                        <Text>Notification is empty</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: mlColors.white,
        margin: 2,
        padding: 15,
    },
    title: {
        fontWeight: "500",
        fontSize: 16,
    },
    status: {
        fontWeight: "500",
        fontSize: 16,
        textAlign: 'right',
    },
    date: {
        textAlign: 'right',
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
    }

});
