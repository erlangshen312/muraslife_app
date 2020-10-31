import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import axios from 'axios';
import {getToken, setAuthData, getAuthData} from '../../utils/asyncStorage';
import {
  dimensionWidth,
  dimensionHeight,
  apiUrl,
  imageUrl,
} from '../../configs/config';

export default function ProfileAbout() {
  const [about, setAbout] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/auth', config);
        setAbout(res.data);
        setAuthData(res.data);
      } catch (error) {
        const warning = error.response.data.errors.map((er) => er.msg);
        console.log(warning);
      }
    };
    fetchData();
    // if (about.avatar === null) {
    //   console.log('if about', about);
    // } else {
    //   console.log('else about', about, authData);
    // }
  }, []);

  const avatar =
    'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';

  return (
    <View>
      <View>
        {about && (
          <Image
            source={{
              uri: imageUrl + about.banner,
            }}
            style={{
              width: dimensionWidth,
              height: dimensionHeight / 4,
              // borderRadius: ,
            }}
          />
        )}
        <Image
          source={{
            uri: imageUrl + about.avatar,
          }}
          style={{
            width: 130,
            height: 130,
            alignSelf: 'center',
            borderRadius: 100,
            position: 'absolute',
            bottom: -40,
          }}
        />
      </View>
      <View style={{top: 30, padding: 20}}>
        <View
          style={{
            position: 'relative',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
            }}>
            {about && about.name}
          </Text>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>{about && about.bio}</Text>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>{about && about.company}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
