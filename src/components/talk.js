import React, {useState, useEffect} from 'react';
import {Alert, Linking} from "react-native";
import {WHATSAPPURL, TELEGRAMURL} from '../configs/config'


export const telephone = async (number) => {
    let url = '';
    if (Platform.OS === 'android') {
        url = `tel:+${number}`;
    } else {
        url = `telprompt:+${number}`;
    }
    await Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url)
                    .catch(() => null);
            }
        });
};

export const whatsapp = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(
        'https://api.whatsapp.com/send?phone=' + phoneNumber,
    ).catch((err) => Alert.alert('Number is not correct!', err));
};




