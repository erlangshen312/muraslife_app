import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    console.log('setValueToken : ' + value);
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

export const getAuthData = async () => {
  try {
    const object = await AsyncStorage.getItem('@authData');
    const obj = JSON.parse(object);
    if (obj !== 'null') {
      return obj;
    }
  } catch (e) {
    console.log('getAuthData : ' + e);
    return null;
  }
};

export const setAuthData = async (authData) => {
  try {
    await AsyncStorage.setItem('@authData', JSON.stringify(authData))
      .then(() => {
        console.log('‘It was saved successfully set to asyncStorage’');
      })
      .catch(() => {
        console.log('‘There was an error saving the authData');
      });
  } catch (e) {
    console.log('setAuthData : ' + e);
    return null;
  }
};

export const removeAuthData = async () => {
  try {
    const object = await AsyncStorage.removeItem('@authData');
    const obj = JSON.parse(object);
    if (obj !== 'null') {
      return obj;
    }
  } catch (e) {
    console.log('removeAuthData : ' + e);
    return null;
  }
};
