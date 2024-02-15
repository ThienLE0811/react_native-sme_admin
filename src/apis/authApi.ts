import {appInfo} from '../constansts/appInfo';
import {headerLogin} from '../constansts/loginApp';
import {bodyLogin} from '../utils';
import axiosClient from './axiosClient';

interface bodyLoginType {
  username: string;
  password: string;
}

class AuthApi {
  HandleAuthentication = async (
    // url: string,
    data: bodyLoginType,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosClient(`${appInfo.URL_LOGIN}`, {
      headers: headerLogin,
      method: method ?? 'get',
      data: bodyLogin(data),
    });
  };
}

const authenticationAPI = new AuthApi();
export default authenticationAPI;
