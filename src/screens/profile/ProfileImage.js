import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
// import ImagePicker from 'react-native-image-picker';
import USER_LOGO from '../../assets/images/user.png';
import {getToken, getAuthData, setAuthData} from '../../utils/asyncStorage';
import {apiUrl} from '../../configs/config';

export default function ProfileImage({bioData}) {
  const [avatar, setAvatar] = useState();
  const [imageDetail, setImageDetail] = useState();
  const [aboutData, setAboutData] = useState();

  const _handleChooseAvatar = async () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };

    const createFormData = async (avatar) => {
      const data = new FormData();
      data.append('avatar', {
        name: avatar.fileName ? avatar.fileName : 'Unknown',
        type: avatar.type,
        uri:
          Platform.OS === 'android'
            ? avatar.uri
            : avatar.uri.replace('file://', ''),
      });

      // Object.keys(body).forEach((key) => {
      //   data.append(key, body[key]);
      // });

      // console.log('DATA formData: ', JSON.stringify(data) + 'FUCK FUCK ');
      return data;
    };

    const _handleUploadPhoto = async () => {
      const token = await getToken();
      let formData = new FormData();
      formData.append('name', avatar.fileName);
      formData.append('type', avatar.type);
      formData.append(
        'uri',
        Platform.OS === 'android'
          ? avatar.uri
          : avatar.uri.replace('file://', ''),
      );

      // formData.append('file', {
      //   name: avatar.fileName !== 'null' ? avatar.fileName : 'Unknown',
      //   type: avatar.type,
      //   uri:
      //     Platform.OS === 'android'
      //       ? avatar.uri
      //       : avatar.uri.replace('file://', ''),
      // });
      try {
        const config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          },
        };
        const body = {
          formData,
          user_id: aboutData._id,
        };
        const res = await axios.post(
          'http://localhost:5000/api/users/avatar',
          body,
          config,
        );
        console.log('RESPONSE', res.data);
        alert(JSON.stringify(res.data));
      } catch (error) {
        const warning = error.response.data;
        console.log('ERROR', warning);
      }
    };

    // ImagePicker.showImagePicker(options, (response) => {
    //   console.log('Response = ', response);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     setImageDetail({
    //       ...imageDetail,
    //       fileName: response.fileName ? response.fileName : 'NONE',
    //       path: response.path ? response.path : 'NONE',
    //       type: response.type,
    //       uri: response.uri,
    //       width: response.width,
    //       height: response.height,
    //     });
    //     console.log(imageDetail);
    //     console.log('response data:', response);
    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     setAvatar(response);
    //     setAboutData(bioData);
    //     _handleUploadPhoto();
    //   }
    // });
  };

  return (
    <TouchableOpacity onPress={() => _handleChooseAvatar()}>
      <Image
        source={
          typeof avatar === 'undefined'
            ? {uri: apiUrl + '/' + bioData.avatar}
            : avatar
        }
        style={{
          width: 130,
          height: 130,
          borderRadius: 100,
          margin: 10,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
