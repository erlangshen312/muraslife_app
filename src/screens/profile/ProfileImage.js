import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  Fragment,
} from 'react';
import { SafeAreaView } from 'react-native';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import defaultAvatar from '../../assets/images/user.png';
import { API, mlColors } from '../../configs/config';
import ImageModal from '../../imageComponent/ImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import { getToken, setAuthData } from '../../utils/asyncStorage';
import axios from 'axios';
import FFormData from 'form-data';
import RNFetchBlob from 'rn-fetch-blob';

export default function ProfileImage({ bioData }) {
  const [img, setImg] = useState();
  const [ava, setAva] = useState();

  function pickSingle(cropit = true, circular = false, mediaType = 'photo') {
    console.log('PICK SINGLE IMAGE CLICKED INTO');
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      // cropping: cropit,
      // cropperCircleOverlay: circular,
      sortOrder: 'none',
      // mediaType: mediaType,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        _handleUploadPhoto(image);
        setImg(image);
      })
      .catch((e) => {
        console.error(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  const _handleUploadPhoto = async (image) => {
    const token = await getToken();
    console.log(image);
    RNFetchBlob.fetch(
      'POST',
      `${API.apiv1}/api/users/avatar`,
      {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: 'avatar.jpg',
          type: 'image/jpg',
          data: RNFetchBlob.wrap(image.path),
        },
        // elements without property `filename` will be sent as plain text
      ],
    )
      .then((res) => {
        const d = JSON.parse(res.data);
        console.log('RESPONSE RN_FETCH_BLOB:', d.user.avatar);
        setAva(d.user.avatar);
        // setAuthData(d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          margin: 7,
          borderRadius: 100,
          backgroundColor: mlColors.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.0,
          elevation: 1,
        }}
        onPress={() => pickSingle()}
      >
        <Image
          source={
            bioData.avatar
              ? {
                  uri: `${API.apiv1}/${bioData.avatar}`,
                }
              : defaultAvatar
          }
          PlaceholderContent={<ActivityIndicator />}
          style={{
            width: 90,
            height: 90,
            borderRadius: 100,
            margin: 3,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomsheet: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 14,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  bottomsheetscroll: {
    backgroundColor: '#fff',
    padding: 10,
  },
});
