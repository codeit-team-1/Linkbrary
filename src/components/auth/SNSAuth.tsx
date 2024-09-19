import Image from 'next/image';
import { ComponentType, useEffect } from 'react';
import { match } from 'ts-pattern';

import googleLogin from '@/assets/icons/sns/ic_google.svg';
import kakaoLogin from '@/assets/icons/sns/ic_kakao.svg';

import { useModal } from '@/lib/context';
import { useSNSLogin, useSignWithKakao } from '@/lib/hooks';
import { API_PATH } from '@/lib/api';
import { Routes } from '@/lib/route';
import { LoadingProps, withLoading } from '@/lib/hoc';

interface SNSLoginProps {
  handleGoogleLogin: () => void;
  handleKakaoLogin: () => void;
}

type SNSLoginPropsWithLoading = LoadingProps & SNSLoginProps;

const SNSAuthComponent = ({
  handleGoogleLogin,
  handleKakaoLogin,
}: SNSLoginProps) => {
  const sectionWrapper =
    'flex w-full py-3 px-6 justify-between items-center rounded-[8px] border-[1px] bg-secondary-10';
  const textStyle = 'font-[Pretendard] text-[14px] not-italic leading-[normal]';
  const iconContainer = 'flex items-start gap-[16px]';

  return (
    <section className={sectionWrapper}>
      <p className={textStyle}>간편 로그인</p>
      <div className={iconContainer}>
        <Image
          onClick={handleGoogleLogin}
          className="cursor-pointer"
          src={googleLogin}
          alt="구글로그인"
          width={42}
          height={42}
        />
        <Image
          className="cursor-pointer"
          onClick={handleKakaoLogin}
          src={kakaoLogin}
          alt="카카오로그인"
          width={42}
          height={42}
        />
      </div>
    </section>
  );
};

interface SocialLoginProps {
  type: 'login' | 'signup';
}

type SocialLoginType = { type: 'login' } | { type: 'signup' };

const withSocialAuthHandler = (
  WrappedComponent: ComponentType<SNSLoginPropsWithLoading>,
) => {
  return ({ type }: SocialLoginProps) => {
    const { openModal } = useModal();
    const { kakaoCode } = useSignWithKakao(Routes.LOGIN);
    const kakaoMutate = useSNSLogin({
      socialProvider: 'kakao',
    });
    const TSocialLogin: SocialLoginType = { type };

    const handleSocialLogin = match(TSocialLogin)
      .with({ type: 'login' }, () => ({
        handleGoogleLogin: () => {
          openModal({
            type: 'alert',
            key: 'SNSGoogleIsMissing',
            title: '알림 🔊',
            message: '구글 로그인은 아직 준비중입니다. 😅',
            confirmPhrase: '이해하기 😉',
          });
        },
        handleKakaoLogin: () => {
          if (window) {
            window.location.assign(API_PATH.oauth.kakao.login);
          }
        },
      }))
      .with({ type: 'signup' }, () => ({
        handleGoogleLogin: () => {
          openModal({
            type: 'alert',
            key: 'SNSGoogleIsMissing',
            title: '알림 🔊',
            message: '구글 로그인은 아직 준비중입니다. 😅',
            confirmPhrase: '이해하기 😉',
          });
        },
        handleKakaoLogin: () => {
          if (window) {
            window.location.assign(API_PATH.oauth.kakao.signup);
          }
        },
      }))
      .otherwise(() => ({
        handleGoogleLogin: () => {
          openModal({
            type: 'alert',
            key: 'SNSGoogleError',
            message: '잘못된 소셜 로그인 로직 타입입니다.(Google)',
          });
        },
        handleKakaoLogin: () => {
          openModal({
            type: 'alert',
            key: 'SNSKakaoError',
            message: '잘못된 소셜 로그인 로직 타입입니다.(Kakao)',
          });
        },
      }));

    useEffect(() => {
      if (kakaoCode) {
        kakaoMutate.mutate({ token: kakaoCode });
      }
    }, [kakaoCode]);

    return (
      <WrappedComponent
        isLoading={kakaoMutate.isPending}
        {...handleSocialLogin}
      />
    );
  };
};

export const SNSAuth = withSocialAuthHandler(
  withLoading<SNSLoginPropsWithLoading>(SNSAuthComponent),
);
