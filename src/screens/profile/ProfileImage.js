import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import USER_LOGO from '../../assets/images/user.png';

export default function ProfileImage({about}) {
  const [avatar, setAvatar] = useState();

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

    const createFormData = (photo, body) => {
      const data = new FormData();
      data.append('photo', {
        name: photo.fileName || '123',
        type: photo.type,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });

      Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
      });

      console.log(data);
      return data;
    };

    const _handleUploadPhoto = () => {
      const data = JSON.stringify(about);
      console.log('upload');
      try {
        axios('https://muras.life:5000/api/users/avatar', {
        method: 'POST',
        body: createFormData(avatar, {userId: data._id}),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('upload succes', response);
          alert('Upload success!');
          // this.setState({photo: null});
        })
        .catch((error) => {
          console.log('upload error', error);
          alert('Upload failed!');
        });
      } catch (error) {
        
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const path = {uri: response.uri}; 
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setAvatar(response);
        console.log(avatar, path);
        _handleUploadPhoto();
      }
    });
  };

  return (
    <TouchableOpacity onPress={() => _handleChooseAvatar()}>
      <Image
        source={avatar ? avatar : USER_LOGO}
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
