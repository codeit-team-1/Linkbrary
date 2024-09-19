import { useEffect, useCallback } from 'react';
import { useFolder, useModal } from '@/lib/context';

export const useFolderShare = () => {
  const { openModal } = useModal();
  const { selectedFolder } = useFolder();

  const url = window.location.origin;
  const SHARING_URL = `${url}/shared/${selectedFolder.id}`;

  const { Kakao, open } = window;
  const initializeKakao = useCallback(() => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API_KEY);
    }
  }, []);
  useEffect(() => {
    initializeKakao();
  }, [initializeKakao]);

  const kakaoTalkShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      openModal({
        type: 'alert',
        key: 'kakaoInitError',
        message: `카카오톡 공유하기에 실패하였습니다. 공유를 다시 시도해주세요.`,
      });
      return;
    }

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `공유된 "${selectedFolder.name}" 폴더`,
        description: `"${selectedFolder.name}" 폴더에 저장된 링크 목록입니다`,
        imageUrl: '/src/assets/images/sharingDefaultImage.png',
        link: {
          mobileWebUrl: SHARING_URL,
          webUrl: SHARING_URL,
        },
      },
    });
  };

  const facebookShare = () => {
    return open(`http://www.facebook.com/sharer/sharer.php?u=${SHARING_URL}`);
  };

  const clipboardCopy = (): void => {
    if (!navigator.clipboard) {
      openModal({
        type: 'alert',
        key: 'invalidBrowserError',
        message: `복사하기가 지원되지 않는 브라우저입니다. 크롬 또는 사파리와 같은 최신 브라우저를 사용해주세요.`,
      });
      return;
    }

    navigator.clipboard
      .writeText(SHARING_URL)
      .then(() => {
        openModal({
          type: 'alert',
          key: 'addLinkSuccess',
          title: '✅ 확인',
          message: `클립보드에 복사되었습니다!`,
        });
      })
      .catch(() => {
        openModal({
          type: 'alert',
          key: 'copyError',
          message: `복사를 다시 시도해주세요.`,
        });
      });
  };

  return { kakaoTalkShare, facebookShare, clipboardCopy };
};
