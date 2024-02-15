import {Dimensions} from 'react-native';

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
  },
  BASE_URL: '',
  URL_LOGIN:
    'https://gwextdev.seabank.com.vn/seabank/seabank-external/api/v1/website-sme/jwtad/login',
};
