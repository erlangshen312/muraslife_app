import {Dimensions} from 'react-native';

//use niceColors lib

export const apiUrl = 'http://localhost:5000';
export const baseUrl = 'http://localhost:5000';
export const imageUrl = 'http://localhost:5000';
// export const apiUrl = 'https://muras.life';
// export const baseUrl = 'https://muras.life';
// export const imageUrl = 'https://muras.life';

//NEWS ELGEZIT
export const newsUrl = 'https://elgezit.kg/wp-json/wp/v2/posts';

export const WHATSAPPURL = 'https://api.whatsapp.com/send?phone=';
export const TELEGRAMURL = 'https://t.me/';

export const globalConfig = {
  RUB: 'Руб',
  SOM: 'Сом',
};

const {width, height} = Dimensions.get('screen');
export const ITEM_WIDTH = width;
export const ITEM_HEIGHT = height * 0.75;

export const dimensionWidth = Dimensions.get('screen').width;
export const dimensionHeight = Dimensions.get('screen').height;

//COLORS
export const mlColors = {
  white: '#FFF',
  brown: '#CFD8DC',
  light_black: '#B0BEC5',
  black: '#455A64',
  blue: '#2196F3',
  light_blue: '#64B5F6',
  dark_blue: '#1565C0',
  yellow: '#FFEB3B',
  light_yellow: '#FFF176',
  dark_yellow: '#F9A825',
  red: '#f44336',
  light_red: '#e57373',
  dark_red: '#c62828',
  green: '#4CAF50',
  light_green: '#81C784',
  dark_green: '#2E7D32',
};

export const appName = 'Muras Life';
export const socialLink = {
  insta: 'http://instagram.com/muras.life',
  // teleg: 'http://instagram.com/muras.life',
};
export const version = '1.0.0';

export const aboutAppInfo = {
  version: version,
  appName: appName,
  socialLink: socialLink,
};
