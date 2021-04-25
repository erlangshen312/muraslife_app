import ImagePicker from 'react-native-image-crop-picker';

export async function IMAGEPICKER(cropit, circular, mediaType) {
  console.log('PICKER IMAGE SINGLE IMAGE CLICKED INTO');
  return await ImagePicker.openPicker({
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
      console.warn(image);
      return image;
    })
    .catch((e) => {
      console.error('ERROR in IMAGE PICKER:', e.message);
      // Alert.alert(e.message ? e.message : e);
    });
}
