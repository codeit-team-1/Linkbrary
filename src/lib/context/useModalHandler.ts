import { ModalContentsProps } from '@/components/common/modal/Modal';
import { useMemo, useState } from 'react';

export interface ModalType extends ModalContentsProps {
  key: string;
}

export interface ModalContextType {
  modalList: ModalType[];
  openModal: (modalContent: ModalType) => void;
  closeModal: (modalName: string) => void;
}

export const useModalHandler = () => {
  const [modalList, setModalList] = useState<ModalType[]>([]);
  const openModal = (modalContent: ModalType) => {
    if (modalList.some((e) => e.key === modalContent.key)) {
      throw new Error('이미 열려있는 Modal Key 입니다.');
    }
    setModalList((prev) => [...prev, { ...modalContent }]);
  };
  const closeModal = (modalKey: string) => {
    setModalList((prev) => prev.filter((e) => e.key !== modalKey));
  };

  const modalHanlder = useMemo(() => ({ openModal, closeModal }), []);

  return { modalList, ...modalHanlder };
};
