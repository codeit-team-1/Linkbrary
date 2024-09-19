import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import {
  SocialLoginParams,
  UserInfoDTO,
  saveToken,
  socialLogin,
} from '@/lib/api';
import { useAuth, useModal } from '@/lib/context';
import { MUTATION_KEY } from '../config';

export const useSNSLogin = ({
  socialProvider,
}: Pick<SocialLoginParams, 'socialProvider'>) => {
  const { updateIsLoggedIn, updateUserInfo } = useAuth();
  const { openModal } = useModal();
  return useMutation({
    mutationKey: [
      socialProvider === 'google'
        ? MUTATION_KEY.googleLogin
        : MUTATION_KEY.kakaoLogin,
    ],
    mutationFn: ({ token }: Pick<SocialLoginParams, 'token'>) =>
      socialLogin({ socialProvider, token }),
    onSuccess: async (res) => {
      if (res) {
        const { id, email, name, imageSource, createdAt } = res.data.user;
        const newUserInfo: UserInfoDTO = {
          id,
          email,
          name,
          imageSource,
          createdAt,
        };
        try {
          await saveToken(res.data.access_token);
          updateUserInfo(newUserInfo);
          updateIsLoggedIn(true);
        } catch (error) {
          openModal({
            type: 'alert',
            key: 'failSaveToken',
            message: '토큰 저장에 실패했습니다 다시 로그인해주세요.',
          });
        }
      }
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          openModal({
            type: 'alert',
            key: 'SNSLoginError400',
            message: '로그인에 실패했습니다. 다시 시도해주세요.',
          });
        } else {
          openModal({
            type: 'alert',
            key: 'SNSLoginUnknownError',
            message: '알 수 없는 에러입니다. 관리자에게 문의해주세요.',
          });
        }
      } else {
        openModal({
          type: 'alert',
          key: 'SNSLoginUnknownError',
          message: '알 수 없는 에러입니다. 관리자에게 문의해주세요.',
        });
      }
    },
  });
};
