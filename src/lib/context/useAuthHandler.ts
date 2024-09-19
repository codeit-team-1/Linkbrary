import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { UserInfoDTO } from '../api';
import { getFromStorage, setToStorage } from '../storage';
import { Routes } from '../route';

export interface UserInfo extends UserInfoDTO {
  accessToken: string;
}

export interface AuthContextType {
  userInfo: UserInfo | null;
  isLoggedin: boolean;
  logout: () => void;
  updateUserInfo: (items: UserInfo) => void;
  updateIsLoggedIn: (state: boolean) => void;
}

const localStorageName = 'userInfo';

export const useAuthHandler = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const logout = () => {
    setUserInfo(null);
    setIsLoggedin(false);
    localStorage.removeItem(localStorageName);
    router.push(Routes.HOME);
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
