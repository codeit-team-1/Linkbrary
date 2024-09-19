import Image from 'next/image';
import { ComponentType } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { match } from 'ts-pattern';

import LoadingSpinner from '@/assets/icons/ic_loading_spinner.svg';
import ValidatedConfirm from '@/assets/icons/ic_confirm_circle.svg';
import { LoadingProps, withLoading } from '@/lib/hoc';
import {
  usePasswordVisuality,
  useSignUp,
  useValidateEmailOnBlur,
} from '@/lib/hooks';

import { CommonButton, CommonInputWithError } from '../common';
import { LoginFormProps, PasswordVisible } from './LoginForm';

type RHFPropertyType = {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
};
interface SignUpProps extends LoginFormProps {
  passwordConfirmVisible: PasswordVisible;
  RHFProperty: RHFPropertyType;
  emailValidation: {
    isValidateSuccess: boolean;
    isValidating: boolean;
    validatingIcon: React.ReactNode;
    validateEmail: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  };
}
const formClassName = 'w-full flex flex-col justify-center items-start gap-3';
const confirmIconClassName = 'absolute top-4 right-4 w-8 h-8';
const loadingIconClassName =
  'absolute top-4 right-4 w-8 h-8 text-green animate-spinner';
const passwordIconClassName =
  'absolute top-5 right-4 w-5 h-5 cursor-pointer before:animate-prixClipFix';
export const SignUpFormComponent = ({
  passwordVisible,
  passwordConfirmVisible,
  RHFProperty,
  emailValidation,
  onSubmit,
}: SignUpProps) => {
  const { register, errors, isValid, handleSubmit } = RHFProperty;
  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <CommonInputWithError
        htmlfor="email"
        placeholder="link@brary.com"
        errorMessage={`${errors.email?.message}`}
        errorMessageVisible={!!errors.email}
        onBlur={emailValidation.validateEmail}
        Icon={emailValidation.validatingIcon}
        register={register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
            message: '이메일 형식으로 작성해주세요.',
          },
        })}
      >
        이메일
      </CommonInputWithError>

      <CommonInputWithError
        htmlfor="name"
        placeholder="닉네임을 입력해주세요"
        errorMessage={`${errors.name?.message}`}
        errorMessageVisible={!!errors.name}
        register={register('name', {
          required: '닉네임을 입력해주세요',
          maxLength: { value: 10, message: '최대 10자까지 가능합니다.' },
          pattern: {
            value: /^[가-힣a-zA-Z0-9]*$/i,
            message: '한글, 영문, 숫자만 가능합니다.',
          },
        })}
      >
        이름
      </CommonInputWithError>
      <CommonInputWithError
        htmlfor="password"
        placeholder="대/소문자, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상"
        errorMessage={`${errors.password?.message}`}
        type={passwordVisible.visible ? 'text' : 'password'}
        errorMessageVisible={!!errors.password}
        Icon={
          <Image
            className={passwordIconClassName}
            src={passwordVisible.visibleIcon}
            alt="비밀번호 보기"
            onClick={passwordVisible.handleVisible}
          />
        }
        register={register('password', {
          required: '필수 항목입니다.',
          minLength: {
            value: 8,
            message: '8자 이상 입력해주세요.',
          },
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).*$/i,
            message: '영문(대/소), 숫자, 특수문자(!@#$%^&*)를 포함해주세요.',
          },
          deps: 'passwordConfirm',
        })}
      >
        비밀번호
      </CommonInputWithError>
      <CommonInputWithError
        htmlfor="passwordConfirm"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        errorMessage={`${errors.passwordConfirm?.message}`}
        type={passwordConfirmVisible.visible ? 'text' : 'password'}
        errorMessageVisible={!!errors.passwordConfirm}
        Icon={
          <Image
            src={passwordConfirmVisible.visibleIcon}
            className={passwordIconClassName}
            alt="비밀번호 확인 보기"
            onClick={passwordConfirmVisible.handleVisible}
          />
        }
        register={register('passwordConfirm', {
          validate: (passwordConfirm: string, formValue) => {
            if (formValue.password !== passwordConfirm) {
              return '비밀번호가 일치하지 않습니다.';
            }
            return true;
          },
          deps: 'password',
        })}
      >
        비밀번호 확인
      </CommonInputWithError>
      <CommonButton mode="submit" disabled={!isValid}>
        회원가입
      </CommonButton>
    </form>
  );
};

type SignUpWithLoading = SignUpProps & LoadingProps;

const withSignUpHandler =
  (WrappedComponent: ComponentType<SignUpWithLoading>) => () => {
    const signUpMutate = useSignUp();
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      setError,
    } = useForm({ mode: 'all' });

    const emailValidation = useValidateEmailOnBlur({
      isError: !!errors.email,
      setError,
      validationField: 'email',
    });

    const passowrdVisible = usePasswordVisuality();
    const passwordConfirmVisible = usePasswordVisuality();

    const RHFProperty: RHFPropertyType = {
      register,
      errors,
      handleSubmit,
      isValid,
    };

    const onSubmit = async (values: FieldValues) => {
      const { email, name, password } = values;
      signUpMutate.mutate({ email, name, password });
    };

    const validatingSuccess = match(emailValidation.isValidateSuccess)
      .with(true, () => (
        <Image
          className={confirmIconClassName}
          src={ValidatedConfirm}
          alt="인증된 이메일"
        />
      ))
      .with(false, () => <></>)
      .exhaustive();

    const validatingIcon = match(emailValidation.isValidating)
      .with(true, () => (
        <Image
          className={loadingIconClassName}
          src={LoadingSpinner}
          alt="이메일 검증 로딩"
        />
      ))
      .with(false, () => validatingSuccess)
      .exhaustive();
    return (
      <WrappedComponent
        emailValidation={{ ...emailValidation, validatingIcon }}
        RHFProperty={RHFProperty}
        isLoading={signUpMutate.isPending}
        onSubmit={onSubmit}
        passwordVisible={passowrdVisible}
        passwordConfirmVisible={passwordConfirmVisible}
      />
    );
  };

export const SignUpForm = withSignUpHandler(withLoading(SignUpFormComponent));
