import Image from 'next/image';
import linkIcon from '@/assets/icons/ic_link.svg';
import { CommonButton } from '@/components';
import { useAddLink } from '@/lib/hooks';

const addLinkButtonClassName =
  'shrink-0 px-4 py-[0.625rem] rounded-lg bg-gradient-color text-[0.875rem] font-semibold text-[#f5f5f5] font-[Pretendard] not-italic leading-[normal]';

export const AddLink = () => {
  const { url, getInputValue, handleAddLinkButtonClick } = useAddLink();

  return (
    <div className="m-auto max-w-[50rem] h-auto px-[0.625rem] py-2 flex justify-between items-center rounded-[15px] bg-white border border-solid border-primary md:px-5 md:py-4 ">
      <div className="w-full flex justify-center items-center gap-3">
        <Image src={linkIcon} alt="링크 아이콘" width={20} height={20} />
        <input
          className="w-full focus:outline-none placeholder-secondary-60 font-[Pretendard] not-italic leading-[1.5rem]"
          type="text"
          placeholder="링크를 추가해 보세요"
          value={url}
          onChange={getInputValue}
        />
      </div>
      <CommonButton
        mode="default"
        className={addLinkButtonClassName}
        onClick={handleAddLinkButtonClick}
      >
        추가하기{' '}
      </CommonButton>
    </div>
  );
};
