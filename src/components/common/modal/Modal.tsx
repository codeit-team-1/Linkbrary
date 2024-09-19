import Image from 'next/image';
import { ComponentType } from 'react';
import { match } from 'ts-pattern';

import closeIcon from '@/assets/icons/ic_close.svg';

import { useModal } from '@/lib/context';
import { ModalStyle as S } from './Modal.style';
import { CommonButton } from '../buttons';

export interface ModalContentsProps {
  type?: 'alert' | 'confirm' | 'custom';
  title?: string;
  message?: string;
  confirmPhrase?: string;
  onConfirm?: () => void;
  cancelPhrase?: string;
  onCancel?: () => void;
  Component?: React.ReactNode;
}

const AlertModalContents = ({
  title,
  message,
  confirmPhrase,
  onConfirm,
}: Omit<
  ModalContentsProps,
  'type' | 'cancelPhrase' | 'onCancel' | 'Component'
>) => {
  return (
    <>
      <div className={S.ContentContainer}>
        <h1 className={S.TitleStyle}>{title}</h1>
        <p className={S.MessageStyle}>{message}</p>
      </div>

      <CommonButton
        className={S.ConfirmButtonStyle}
        mode="default"
        onClick={onConfirm}
      >
        {confirmPhrase}
      </CommonButton>
    </>
  );
};
const ConfirmModalContents = ({
  title,
  message,
  confirmPhrase,
  onConfirm,
  cancelPhrase,
  onCancel,
}: Omit<ModalContentsProps, 'type' | 'Component'>) => {
  return (
    <>
      <div className={S.ContentContainer}>
        <h1 className={S.TitleStyle}>{title}</h1>
        <p className={S.MessageStyle}>{message}</p>
      </div>
      <div className={S.ButtonContainerStyle}>
        <CommonButton
          className={S.ConfirmButtonStyle}
          mode="default"
          onClick={onConfirm}
        >
          {confirmPhrase}
        </CommonButton>
        <CommonButton
          className={S.CancelButtonStyle}
          mode="default"
          onClick={onCancel}
        >
          {cancelPhrase}
        </CommonButton>
      </div>
    </>
  );
};

const ModalContents = ({
  type = 'custom',
  title,
  message,
  confirmPhrase,
  onConfirm,
  cancelPhrase,
  onCancel,
  Component,
}: ModalContentsProps) => {
  const TModalContent = {
    type,
  };
  const modalComponent = match(TModalContent)
    .with(
      {
        type: 'alert',
      },
      () => (
        <AlertModalContents
          title={title ?? '❗️오류'}
          message={message}
          confirmPhrase={confirmPhrase ?? '확인'}
          onConfirm={onConfirm}
        />
      ),
    )
    .with(
      {
        type: 'confirm',
      },
      () => (
        <ConfirmModalContents
          title={title ?? '✅ 확인'}
          message={message ?? '내용을 입력해주세요'}
          confirmPhrase={confirmPhrase ?? '확인'}
          onConfirm={onConfirm}
          cancelPhrase={cancelPhrase ?? '취소'}
          onCancel={onCancel}
        />
      ),
    )
    .with({ type: 'custom' }, () => Component)
    .exhaustive();

  return <article>{modalComponent}</article>;
};

interface CommonModalProps extends ModalContentsProps {
  modalName: string;
}

const withModalContainer = (
  WrappedComponent: ComponentType<ModalContentsProps>,
) => {
  return ({
    modalName,
    onConfirm = () => {},
    onCancel = () => {},
    ...rest
  }: CommonModalProps) => {
    const { closeModal } = useModal();
    const handleConfirm = () => {
      onConfirm();
      closeModal(modalName);
    };
    const handleCancel = () => {
      onCancel();
      closeModal(modalName);
    };

    return (
      <div className={S.BackgroundStyle} onClick={() => closeModal(modalName)}>
        <section
          className={S.SectionStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={S.CloseButtonStyle}
            type="button"
            onClick={() => closeModal(modalName)}
          >
            <Image src={closeIcon} alt="닫기 버튼" width={24} height={24} />
          </button>
          <WrappedComponent
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            {...rest}
          />
        </section>
      </div>
    );
  };
};

export const Modal = withModalContainer(ModalContents);
