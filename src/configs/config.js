import { Dimensions } from 'react-native';

//use niceColors lib

export const configs = {
  language: {
    ru: {
      code: 'ru-RU',
      name: 'Русский',
      short: 'ru',
      active: true,
    },
    en: {
      code: 'en-US',
      name: 'English',
      short: 'en',
      active: true,
    },
    ky: {
      code: 'ky-KY',
      name: 'Кыргызча',
      short: 'ky',
      active: true,
    },
  },
};

export const API = {
  apiv1: 'http://192.168.82.101:5000',
};

//NEWS ELGEZIT
export const newsUrl = 'https://elgezit.kg/wp-json/wp/v2/posts';

export const WHATSAPPURL = 'https://api.whatsapp.com/send?phone=';
export const TELEGRAMURL = 'https://t.me/';

export const globalConfig = {
  RUB: 'Руб',
  SOM: 'Cом',
};

const { width, height } = Dimensions.get('screen');
export const ITEM_WIDTH = width;
export const ITEM_HEIGHT = height * 0.75;

export const dimensionWidth = Dimensions.get('screen').width;
export const dimensionHeight = Dimensions.get('screen').height;

//COLORS
export const mlColors = {
  card: '#eaeff7',
  text: '#DDD',
  note: '#606060',
  dark: '#000',

  brown: '#CFD8DC',
  light_brown: '#9E9E9E',
  white: '#FFFFFF',
  dark_white: '#EEEEEE',
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

  primary: '#0052CC',
};

export const appName = 'Muras Life';
export const socialLink = {
  insta: 'http://instagram.com/muras.life',
};
export const version = '1.0.0';

export const aboutAppInfo = {
  version: version,
  appName: appName,
  socialLink: socialLink,
};
