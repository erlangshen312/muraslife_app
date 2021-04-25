// import React, {useEffect, useState, useMemo, useRef, useCallback} from 'react';
// import {
//   StyleSheet,
//   ActivityIndicator,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import axios from 'axios';
// import ImagePicker from 'react-native-image-picker';
// import defaultAvatar from '../../assets/images/user.png';
// import {getToken, getAuthData, setAuthData} from '../../utils/asyncStorage';
// import {API} from '../../configs/config';
//
// const createFormData = (photo, body) => {
//   const photoForm = {
//     uri:
//       Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
//     name: photo.fileName,
//     type: photo.type,
//   };
//
//   const data = new FormData();
//   data.append('file', photoForm);
//
//   // Object.keys(body).forEach((key) => {
//   //   data.append(key, body[key]);
//   // });
//
//   console.warn('PHOTO:', photo);
//   console.warn('DATA:', data);
//   return data;
// };
//
// const options = {
//   title: 'Select Avatar',
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//     cameraRoll: true,
//     waitUntilSaved: true,
//   },
// };
//
// export default function Image() {
//   const [authData, setAuthData] = useState();
//   const [avatar, setAvatar] = useState({});
//
//   const _handleChooseAvatar = async () => {
//     ImagePicker.showImagePicker(options, (response) => {
//       console.warn('Response =>>>>>>>>>>>>>>>>>>> ', response);
//       if (response.didCancel) {
//         console.warn('User cancelled image picker');
//       } else if (response.error) {
//         console.warn('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.warn('User tapped custom button: ', response.customButton);
//       } else {
//         // const path = {uri: response.uri};
//         // You can also display the image using data:
//         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//         setAvatar(response);
//         _handleUploadPhoto();
//       }
//     });
//   };
//   const _handleUploadPhoto = async () => {
//     const user = JSON.stringify(bioData._id);
//     const token = await getToken();
//     console.log('upload');
//     try {
//       axios
//         .post(`${API.apiv1}/api/users/avatar`, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'x-auth-token': token,
//           },
//           body: createFormData(avatar, {userId: user._id}),
//         })
//         .then((response) => {
//           console.log('upload succes', response);
//           alert('Upload success!');
//           // this.setState({photo: null});
//         })
//         .catch((error) => {
//           console.warn('upload error', error);
//           setAvatar(defaultAvatar);
//           alert('Upload failed!');
//         });
//     } catch (error) {
//       console.error('IMAGE PICKER:', error);
//     }
//   };
//
//   return (
//     <TouchableOpacity onPress={() => _handleChooseAvatar()}>
//       <Image
//         source={avatar ? avatar : defaultAvatar}
//         PlaceholderContent={<ActivityIndicator />}
//         style={{
//           width: 90,
//           height: 90,
//           borderRadius: 100,
//           margin: 10,
//         }}
//       />
//     </TouchableOpacity>
//   );
// }
//
// const styles = StyleSheet.create({});
