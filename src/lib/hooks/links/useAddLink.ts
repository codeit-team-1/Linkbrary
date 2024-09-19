import { useState } from 'react';
import { addLink } from '@/lib/api';
import { useFolder, useModal } from '@/lib/context';
import { useQueryClient } from '@tanstack/react-query';
import {
  linkOptions,
  TLinkDto,
  TLinksResponse,
  TQueryResponse,
} from '@/lib/react-query';
import { useLinksContextSelector } from '@/components/links-component';

export const useAddLink = () => {
  const { selectedFolder } = useFolder();
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const { linksQueryAction } = useLinksContextSelector();

  const currentQuerykey = linkOptions.find(linksQueryAction.data).queryKey;
  const currentQueryData = queryClient.getQueryData(currentQuerykey);

  const folderId = selectedFolder.id;

  const [url, setUrl] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleAddLinkButtonClick = async () => {
    if (!url.trim()) {
      openModal({
        type: 'alert',
        key: 'addLinkError_invalidLink',
        message: `유효한 링크를 입력해주세요.`,
      });
      return;
    }

    if (!folderId) {
      openModal({
        type: 'alert',
        key: 'addLinkError_noFolder',
        message: `아래에서 저장할 폴더를 선택해주세요.`,
      });
      return;
    }

    try {
      const data = await addLink({ url, folderId });
      const oldList = currentQueryData?.data.list as TLinkDto[];
      const newQueryData = {
        data: {
          totalCount: currentQueryData?.data.totalCount,
          list: [...oldList, data?.data],
        },
      } as TQueryResponse<TLinksResponse<TLinkDto[]>>;
      queryClient.setQueryData(currentQuerykey, newQueryData);
      queryClient.refetchQueries({ queryKey: ['folders', 'all'], stale: true });

      openModal({
        type: 'alert',
        key: 'addLinkSuccess',
        title: '✅ 확인',
        message: `링크가 추가되었습니다!`,
      });
      setUrl('');
    } catch {
      openModal({
        type: 'alert',
        key: 'addLinkError400',
        message: `이미 존재하는 링크 또는 올바르지 않은 링크입니다.`,
      });
    }
  };

  return { url, getInputValue, handleAddLinkButtonClick };
};
