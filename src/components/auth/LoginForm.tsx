import Image from 'next/image';
import { ComponentType } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { LoadingProps, withLoading } from '@/lib/hoc';
import { useLogin, usePasswordVisuality } from '@/lib/hooks';
import { CommonButton, CommonInputWithError } from '../common';

export type PasswordVisible = {
  visible: boolean;
  visibleIcon: string;
  handleVisible: () => void;
};
export interface LoginFormProps {
  onSubmit: (v: FieldValues) => void;
  passwordVisible: PasswordVisible;
}

const LoginFormComponent = ({ onSubmit, passwordVisible }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const formClassName =
    'w-full flex flex-col justify-center items-start gap-[12px]';
  const iconClassName = 'absolute top-6 right-4 cursor-pointer';

  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <CommonInputWithError
        htmlfor="email"
        placeholder="link@brary.com"
        errorMessage={`${errors.email?.message}`}
        errorMessageVisible={!!errors.email}
        register={register('email', {
          required: '이메일을 입력해주세요.',
        })}
      >
        이메일
      </CommonInputWithError>

      <CommonInputWithError
        htmlfor="password"
        placeholder="********"
        errorMessage={`${errors.password?.message}`}
        type={passwordVisible.visible ? 'text' : 'password'}
        errorMessageVisible={!!errors.password}
        Icon={
          <Image
            className={iconClassName}
            src={passwordVisible.visibleIcon}
            alt="비밀번호 보기"
            onClick={passwordVisible.handleVisible}
          />
        }
        register={register('password', {
          required: '비밀번호를 입력해주세요',
        })}
      >
        비밀번호
      </CommonInputWithError>
      <CommonButton mode="submit" disabled={!isValid}>
        로그인
      </CommonButton>
    </form>
  );
};

type LoginFormPropsWithLoading = LoginFormProps & LoadingProps;

const withLoginHandler = (
  WrappedComponent: ComponentType<LoginFormPropsWithLoading>,
) => {
  return () => {
    const loginMutate = useLogin();
    const passwordVisible = usePasswordVisuality();

    const onSubmit = async (values: FieldValues) => {
      const { email, password } = values;
      loginMutate.mutate({ email, password });
    };
    return (
      <WrappedComponent
        onSubmit={onSubmit}
        passwordVisible={passwordVisible}
        isLoading={loginMutate.isPending}
      />
    );
  };
};

export const LoginForm = withLoginHandler(withLoading(LoginFormComponent));
