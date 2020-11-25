import React, {useState, useEffect, useCallback} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    Linking, RefreshControl,
} from 'react-native';
import axios from 'axios';
import {apiUrl, globalConfig, mlColors} from '../../configs/config';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Dashboard = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getAllPostLists = async () => {
        try {
            const res = await axios.get(apiUrl + '/api/posts', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            res.data !== null && setPosts(res.data);
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        getAllPostLists();
    }, []);

    const [count, setCount] = React.useState(0);

    const handlerCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber).catch((err) =>
            Alert.alert('Number is not correct!', err),
        );
    };

    const handlerWhatsapp = (number) => {
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


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getAllPostLists();
        wait(2000).then(() => setRefreshing(false));
    }, []);


    return (
        <ScrollView style={styles.container}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
        >
            <View>
                {posts &&
                posts.map((data) => (
                    <TouchableOpacity
                        key={data._id}
                        onPress={() => navigation.navigate('Details', {data})}>
                        <View style={styles.block_container}>
                            <View style={styles.block}>
                                <Text style={styles.title_block}>{data.title} </Text>
                                <Text style={styles.cost_block}>
                                    {data.cost && data.cost + ' ' + globalConfig.RUB}
                                </Text>
                            </View>
                            <View>
                                <View style={{marginTop: 5, marginBottom: 15}}>
                                    <Text>{data.note}</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor: `${data.color}`,
                                                padding: 3,
                                                width: 30,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 5,
                                                borderRadius: 10,
                                            }}>
                                            <Text>{data.number}</Text>
                                        </View>
                                        <Text>{data._metro}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            // marginBottom: 5,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <Text>{data.adress}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f5f5',
    },
    cards: {
        padding: 10,
    },
    block_container: {
        margin: 6,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: 'black',
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 10,
        elevation: 1,
    },
    block: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: dimensionWidth / 1.2 - 35,
        // padding: 10,
    },
    title_block: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    cost_block: {
        position: 'relative',
        display: 'flex',
        right: 0,
        fontSize: 16,
        marginBottom: 10,
        color: mlColors.success,
        fontWeight: '700',
        // margin:20,
    },
    button_block: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 8,
    },
    text_button: {
        fontSize: 16,
        fontWeight: '500',
    },
    buttons: {
        // display: 'none',
        flexDirection: 'row',
    },
    metro_color: {
        backgroundColor: 'green',
        width: 15,
        height: 15,
        padding: 10,
        marginRight: 10,
        borderRadius: 100,
    },
});

export default Dashboard;
