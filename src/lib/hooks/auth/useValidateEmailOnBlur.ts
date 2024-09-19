import { AxiosError } from 'axios';
import { useState } from 'react';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { useModal } from '@/lib/context';
import { useValidateEmail } from '../query';

interface ValidatationParameter {
  isError: boolean;
  setError: UseFormSetError<FieldValues>;
  validationField: string;
}

export const useValidateEmailOnBlur = ({
  isError,
  setError,
  validationField,
}: ValidatationParameter) => {
  const { openModal } = useModal();
  const validateEmailMutate = useValidateEmail();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    if (target.value && !isError) {
      validateEmailMutate.mutate(target.value, {
        onSuccess(data) {
          if (data) {
            if (data.status === 200 && data.data?.isUsableEmail) {
              setIsSuccess(true);
            } else {
              setError(validationField, { message: '중복된 이메일입니다.' });
            }
          }
        },
        onError(error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 409) {
              setError(validationField, { message: '중복된 이메일입니다.' });
              return;
            }
          }
          openModal({
            type: 'alert',
            key: 'emailValidateError',
            message: '알 수 없는 에러입니다. 계속되면 관리자에게 문의해주세요.',
          });
        },
      });
    }
  };

  return {
    isValidateSuccess: isSuccess,
    isValidating: validateEmailMutate.isPending,
    validateEmail,
  };
};
