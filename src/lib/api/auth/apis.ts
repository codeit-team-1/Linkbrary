import axios from 'axios';
import { API_PATH, NEXT_API_PATH, instance } from '../config';
import {
  AuthDTO,
  EmailConfirmParams,
  LoginParams,
  SignUpParams,
  SocialLoginDTO,
  SocialLoginParams,
  SocialSignUpParams,
} from './types';

export const signUp = async ({ email, name, password }: SignUpParams) => {
  const params = { email, name, password };
  const response = await instance.post<AuthDTO>(
    API_PATH.auth.signUp,
    JSON.stringify(params),
  );

  return response;
};

export const validateEmail = async ({ email }: EmailConfirmParams) => {
  const params = { email };
  const response = await instance.post(
    API_PATH.user.emailCheck,
    JSON.stringify(params),
  );

  return response;
};

export const login = async ({ email, password }: LoginParams) => {
  const params = { email, password };
  const response = await instance.post<AuthDTO>(
    API_PATH.auth.Login,
    JSON.stringify(params),
  );

  return response;
};

export const socialSignUp = async ({
  socialProvider,
  name,
  token,
}: SocialSignUpParams) => {
  const params = {
    name,
    token,
    redirectUri: process.env.NEXT_PUBLIC_OAUTH_SIGNUP_REDIRECT_URI,
  };

  const url =
    socialProvider === 'google'
      ? API_PATH.auth.googleSignUp
      : API_PATH.auth.kakaoSignUp;

  const response = await instance.post(url, JSON.stringify(params));

  return response;
};

export const socialLogin = async ({
  socialProvider,
  token,
}: SocialLoginParams) => {
  const params = {
    token,
    redirectUri: process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI,
  };
  const url =
    socialProvider === 'google'
      ? API_PATH.auth.googleLogin
      : API_PATH.auth.kakaoLogin;

  const response = await instance.post<SocialLoginDTO>(
    url,
    JSON.stringify(params),
  );

  return response;
};

export const saveToken = async (accessToken: string) => {
  const response = await axios.post(NEXT_API_PATH.token.save, { accessToken });
  return response;
};

export const deleteToken = async () => {
  await axios.post(NEXT_API_PATH.token.delete);
};

export const userInformation = async () => {
  const response = await axios.post(NEXT_API_PATH.userInfo);
  return response;
};
