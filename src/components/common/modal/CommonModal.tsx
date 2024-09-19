import { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import closeIcon from '@/assets/icons/ic_close.svg';
import { CommonButton } from '@/components';

interface CommonModalProps extends ComponentPropsWithoutRef<'div'> {
  closeModal: () => void;
}

export const CommonModal = ({ closeModal, children }: CommonModalProps) => {
  return (
    <div
      className="fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <section
        className="w-[22.5rem] relative px-10 py-8 bg-white rounded-[15px] border solid border-[#ccd5e3]"
        onClick={(e) => e.stopPropagation()}
      >
        <CommonButton
          mode="default"
          className="absolute top-4 right-4"
          onClick={closeModal}
        >
          <Image src={closeIcon} alt="닫기 아이콘" width={24} height={24} />
        </CommonButton>
        {children}
      </section>
    </div>
  );
};
