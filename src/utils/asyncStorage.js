import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== 'null') {
      return value;
    }
  } catch (e) {
    console.log('getToken : ' + e);
    return null;
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (e) {
    console.log('setToken : ' + e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@token');
  } catch (e) {
    console.log('removeToken : ' + e);
    return null;
  }
};
