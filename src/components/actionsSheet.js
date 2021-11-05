import { ActionSheet } from 'react-native-cross-actionsheet/index';

export const openActions = (data) => {
  console.log(data);
  ActionSheet.options({
    options: [
      {
        text: data.title,
        onPress: () => {
          data.func;
        },
      },
    ],
    cancel: { text: 'Назад', onPress: () => console.log('cancel') },
  });
};
