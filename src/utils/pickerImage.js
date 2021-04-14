import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export async function pickerImage(
  cropit = true,
  circular = false,
  mediaType = 'photo',
) {
  console.log('PICKER IMAGE SINGLE IMAGE CLICKED INTO');
  try {
    const image = await ImagePicker.openPicker({
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
    });
    return image;
  } catch (e) {
    console.error('Error in pickerImage:', e);
    Alert.alert('Error in pickerImage:', e.message ? e.message : e);
  }
}
