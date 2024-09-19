import Image from 'next/image';
import kakaoIcon from '@/assets/images/kakaoTalk.png';
import facebookIcon from '@/assets/images/facebook.png';
import copyLinkIcon from '@/assets/images/copyLink.png';
import { useFolder } from '@/lib/context';
import { useFolderShare } from '@/lib/hooks';
import { CommonButton } from '@/components';

export const ShareFolder = () => {
  const { kakaoTalkShare, facebookShare, clipboardCopy } = useFolderShare();
  const { selectedFolder } = useFolder();

  const shareMethodList = [
    {
      id: 1,
      src: kakaoIcon,
      text: '카카오톡',
      onClick: kakaoTalkShare,
    },
    {
      id: 2,
      src: facebookIcon,
      text: '페이스북',
      onClick: facebookShare,
    },
    {
      id: 3,
      src: copyLinkIcon,
      text: '링크 복사',
      onClick: clipboardCopy,
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 공유
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[0.875rem] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[1.375rem]">
        {selectedFolder.name}
      </h4>
      <ul className="flex justify-center items-center gap-8">
        {shareMethodList.map((shareMethod) => (
          <li
            className="flex flex-col justify-center items-center gap-[0.625rem]"
            key={shareMethod.id}
          >
            <CommonButton
              mode="default"
              className=""
              onClick={shareMethod.onClick}
            >
              <Image
                src={shareMethod.src}
                alt={`${shareMethod.text} 아이콘`}
                width={42}
                height={42}
              />
            </CommonButton>
            <p className="text-center text-[0.8125rem] text-[#373740] font-[Pretendard] not-italic leading-[0.9375rem]">
              {shareMethod.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
