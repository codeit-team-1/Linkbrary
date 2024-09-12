import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { SocialSignUpParams, socialSignUp } from '@/lib/api';
import { useAuth, useModal } from '@/lib/context';
import { Routes } from '@/lib/route';
import { MUTATION_KEY } from '../config';

export const useSNSSignUp = ({
  socialProvider,
}: Pick<SocialSignUpParams, 'socialProvider'>) => {
  const { updateIsLoggedIn, updateUserInfo } = useAuth();
  const router = useRouter();
  const { openModal } = useModal();
  const muatateKey =
    socialProvider === 'google'
      ? MUTATION_KEY.googleSignUp
      : MUTATION_KEY.kakaoSignUp;

  return useMutation({
    mutationKey: [muatateKey],
    mutationFn: ({ name, token }: Omit<SocialSignUpParams, 'socialProvider'>) =>
      socialSignUp({ name, socialProvider, token }),
    onSuccess(res) {
      if (res) {
        const { id, email, name, imageSource, createdAt } = res.data.user;
        const newUserInfo = {
          id,
          email,
          name,
          imageSource,
          createdAt,
          accessToken: res.data.accessToken,
        };

        updateUserInfo(newUserInfo);
        updateIsLoggedIn(true);
        router.push(Routes.HOME);
      }
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          openModal({
            type: 'alert',
            key: 'SNSSignUpError400',
            message: '간편 로그인에 실패했습니다. 다시 시도해주세요.',
          });
          return;
        }
      }
      openModal({
        type: 'alert',
        key: 'SNSSignUpUnknownError',
        message: '알 수 없는 에러입니다. 계속될 경우 관리자에게 문의해주세요.',
      });
    },
  });
};
