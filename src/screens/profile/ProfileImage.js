import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  Fragment,
} from 'react';
import {SafeAreaView} from 'react-native';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import defaultAvatar from '../../assets/images/user.png';
import {API, mlColors} from '../../configs/config';
import ImageModal from '../../imageComponent/ImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import {getToken} from '../../utils/asyncStorage';
import axios from 'axios';
import FFormData from 'form-data';

export default function ProfileImage({bioData}) {
  const [img, setImg] = useState();

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
    console.log(image.mime, image.filename);
    const token = await getToken();
    const formData = new FormData();
    formData.append('file', image[0]);
    formData.append('user_id', bioData._id);
    console.log('boundary:', formData._boundary);


    try {
      await axios(`${API.apiv1}/api/users/avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
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
        onPress={() => pickSingle()}>
        <Image
          source={img ? img : defaultAvatar}
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
