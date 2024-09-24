import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { getUserInfo, login } from '@/lib/api';
import { useAuth, useModal } from '@/lib/context';
import { Routes } from '@/lib/route';
import { MUTATION_KEY } from '../config';

export const useLogin = () => {
  const router = useRouter();
  const { openModal } = useModal();
  const { updateUserInfo, updateIsLoggedIn } = useAuth();

  return useMutation({
    mutationKey: [MUTATION_KEY.login],
    mutationFn: login,
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
              message: '잘못된 로그인 정보입니다. 다시 확인해주세요.',
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
  });
};
