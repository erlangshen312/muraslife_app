import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (err) {
    console.warn(err);
  }
};
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (err) {
    console.warn(err);
  }
};
