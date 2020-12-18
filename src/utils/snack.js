import Snackbar from 'react-native-snackbar';
export const snack = (title) => {
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_LONG,
  });
};
