import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { LoginParams, UserInfoDTO, getUserInfo } from '../api';
import { getFromStorage, setToStorage } from '../storage';
import { Routes } from '../route';
import { useModal } from './ModalProvider';
import { useLogin } from '../hooks';

export interface AuthContextType {
  userInfo: UserInfoDTO | null;
  isLoggedin: boolean;
  logout: () => void;
  updateUserInfo: (items: UserInfoDTO) => void;
  updateIsLoggedIn: (state: boolean) => void;
}

const localStorageName = 'userInfo';

export const useAuthHandler = () => {
  const router = useRouter();
  const { openModal } = useModal();
  const loginMutate = useLogin();
  const [userInfo, setUserInfo] = useState<UserInfoDTO | null>(null);
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

  const logout = async () => {
    try {
      setUserInfo(null);
      setIsLoggedin(false);
      await axios.post('/api/delete-token/cookie');
      router.push(Routes.HOME);
    } catch {}
  };

  const updateUserInfo = async (newInfo: UserInfoDTO) => {
    setUserInfo(newInfo);
  };

  const updateIsLoggedIn = (newState: boolean) => {
    setIsLoggedin(newState);
  };

  useEffect(() => {
    const savedUserInfo = async () => {
      try {
        const data = await axios.post<UserInfoDTO>(
          '/api/get-userInfo/with-cookie',
        );
        console.log(data);
        if (data) {
          setUserInfo({ ...data.data });
          setIsLoggedin(true);
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error);
        }
      }
    };
    savedUserInfo();
    // if (savedUserInfo) {
    //   updateUserInfo(savedUserInfo);
    //   updateIsLoggedIn(true);
    // }
  }, [isLoggedin]);

  const providerValue = useMemo(
    () => ({
      logout,
      updateUserInfo,
      updateIsLoggedIn,
    }),
    [],
  );

  return { ...providerValue, userInfo, isLoggedin };
};
