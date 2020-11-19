import {Dimensions} from 'react-native';

//use niceColors lib

export const apiUrl = 'http://localhost:5000';
// export const apiUrl = 'http://muras.life'; //
export const baseUrl = 'http://localhost:5000';
export const imageUrl = 'http://localhost:5000';

//NEWS ELGEZIT
export const newsUrl = 'https://elgezit.kg/wp-json/wp/v2/posts';

export const globalConfig = {
  RUB: 'Руб',
  SOM: 'Сом',
};

export const dimensionWidth = Dimensions.get('window').width;
export const dimensionHeight = Dimensions.get('window').height;

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
