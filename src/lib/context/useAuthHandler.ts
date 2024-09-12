import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { LoginParams, UserInfoDTO, getUserInfo } from '../api';
import { getFromStorage, setToStorage } from '../storage';
import { useLogin } from '../hooks';
import { useModal } from './ModalProvider';
import { useRouter } from 'next/router';
import { Routes } from '../route';

interface UserInfo extends UserInfoDTO {
  accessToken: string;
}

export interface AuthContextType {
  userInfo: UserInfo | null;
  isLoggedin: boolean;
  login: (params: LoginParams) => void;
  logout: () => void;
  updateUserInfo: (items: UserInfo) => void;
  updateIsLoggedIn: (state: boolean) => void;
}

const localStorageName = 'userInfo';

export const useAuthHandler = () => {
  const { openModal } = useModal();
  const router = useRouter();
  const loginMutate = useLogin();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const login = ({ email, password }: LoginParams) => {
    loginMutate.mutate(
      { email, password },
      {
        onSuccess: async (res) => {
          if (res?.data.accessToken) {
            const { accessToken } = res.data;
            await getUserInfo({ accessToken })
              .then((response) => {
                if (response.data) {
                  updateUserInfo({
                    ...response.data,
                    accessToken,
                  });
                  updateIsLoggedIn(true);
                  router.push(Routes.HOME);
                }
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
        },
        onError: async (error) => {
          if (error instanceof AxiosError) {
            switch (error.status) {
              case 401:
                openModal({
                  type: 'alert',
                  key: 'loginError401',
                  message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
                });
                break;
              case 400:
                openModal({
                  type: 'alert',
                  key: 'loginError400',
                  message:
                    error.response?.data.message ??
                    '로그인에 실패하였습니다. 다시 시도해주세요',
                });
                break;
              default:
                openModal({
                  type: 'alert',
                  key: 'loginError',
                  message:
                    '알 수 없는 에러입니다. 이 에러가 계속되는 경우 관리자에게 문의해주세요.',
                });
                break;
            }
          }
        },
      },
    );
  };

  const logout = () => {
    setUserInfo(null);
    setIsLoggedin(false);
    localStorage.removeItem(localStorageName);
  };

  const updateUserInfo = (newInfo: UserInfo) => {
    setUserInfo(newInfo);
    setToStorage(localStorageName, newInfo);
  };

  const updateIsLoggedIn = (newState: boolean) => {
    setIsLoggedin(newState);
  };

  useEffect(() => {
    const savedUserInfo = getFromStorage<UserInfo>(localStorageName);
    if (savedUserInfo) {
      updateUserInfo(savedUserInfo);
      updateIsLoggedIn(true);
    }
  }, []);

  return {
    userInfo,
    isLoggedin,
    login,
    logout,
    updateUserInfo,
    updateIsLoggedIn,
  };
};
