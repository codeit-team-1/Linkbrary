import { UserInfoDTO } from '../user';

export interface AuthDTO {
  accessToken?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams extends LoginParams {
  name: string;
}

export interface SNSSIgnUpParams {
  name: string;
}

export interface EmailConfirmParams {
  email: LoginParams['email'];
}

export type SocialProvider = 'google' | 'kakao';
export interface SocialLoginParams {
  socialProvider: SocialProvider;
  token: string;
}
export interface SocialSignUpParams extends SocialLoginParams {
  name: string;
}

interface SocialUserInfoDTO extends UserInfoDTO {
  updatedAt: string;
  teamId: string;
}
export interface SocialLoginDTO {
  user: SocialUserInfoDTO;
  access_token: string;
}
