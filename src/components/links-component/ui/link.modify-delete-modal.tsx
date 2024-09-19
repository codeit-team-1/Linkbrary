import Image from 'next/image';
import closeIcon from '@/assets/icons/ic_close.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  linkOptions,
  TLinkDto,
  TLinksResponse,
  TQueryResponse,
} from '@/lib/react-query';
import { CommonButton } from '@/components/common';
import { useLinksContextSelector, useModalStore } from '../providers';
import Modal from './link-modal';

export const ModifyAndDeleteModal = () => {
  const { state, closeModal } = useModalStore();
  const { linksAction } = useLinksContextSelector();
  const { isLoading } = linksAction;
  if (!state.mode || isLoading) return undefined;
  const currentLink = linksAction.data?.data.list.find(
    (item: TLinkDto) => item.id === state.linkId,
  );
  let title;
  let body;
  if (state.mode === 'MODIFY') {
    title = '수정하기';
    body = <ModifyModalBody currentLink={currentLink} />;
  } else {
    title = '삭제하기';
    body = <DeleteModalBody currentLink={currentLink} />;
  }

  return (
    <Modal.Root open={!!state.mode}>
      <Modal.Frame>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Close onClick={closeModal}>
          <Image src={closeIcon} alt="X" width={24} height={24} />
        </Modal.Close>
        {body}
      </Modal.Frame>
    </Modal.Root>
  );
};

const ModifyModalBody = ({ currentLink }: { currentLink?: TLinkDto }) => {
  const queryClient = useQueryClient();
  const { linksQueryAction } = useLinksContextSelector();
  const { closeModal } = useModalStore();
  const [input, setInput] = useState('');
  const mutateAction = useMutation({
    ...linkOptions.modify(),
    onSuccess: (data) => {
      const currentQuerykey = linkOptions.find(linksQueryAction.data).queryKey;
      const currentQueryData = queryClient.getQueryData(currentQuerykey);
      const newQueryData = {
        data: {
          totalCount: currentQueryData?.data.totalCount,
          list: currentQueryData?.data.list.map((item: TLinkDto) =>
            item.id === data?.data.id ? { ...data.data } : item,
          ),
        },
      } as TQueryResponse<TLinksResponse<TLinkDto[]>>;
      queryClient.setQueryData(currentQuerykey, newQueryData);
      closeModal();
    },
  });
  const onClick = () => {
    if (input) {
      mutateAction.mutate({ id: currentLink?.id as number, url: input });
    }
  };
  return (
    <>
      <h2>{currentLink?.title || currentLink?.url}</h2>
      <input
        className="border-2 p-3"
        placeholder="내용 입력"
        onChange={(e) => setInput(e.target.value)}
      />
      {mutateAction.isError && (
        <div>중복된 URL이거나, 등록할 수 없는 URL입니다.</div>
      )}
      {mutateAction.isPending ? (
        <div>요청 처리 중...</div>
      ) : (
        <CommonButton mode="default" onClick={onClick}>
          링크수정
        </CommonButton>
      )}
    </>
  );
};

const DeleteModalBody = ({ currentLink }: { currentLink?: TLinkDto }) => {
  const { linksQueryAction } = useLinksContextSelector();
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const mutateAction = useMutation({
    ...linkOptions.delete(),
    onSuccess: () => {
      const currentQuerykey = linkOptions.find(linksQueryAction.data).queryKey;
      queryClient.invalidateQueries({
        queryKey: currentQuerykey,
      });
      closeModal();
    },
  });
  const onClick = () => mutateAction.mutate({ id: currentLink?.id as number });
  return (
    <>
      <h2>{currentLink?.title || currentLink?.url}</h2>
      {mutateAction.isError && (
        <div>삭제에 실패했습니다. 다시 시도해주세요.</div>
      )}
      {mutateAction.isPending ? (
        <div>요청 처리 중...</div>
      ) : (
        <CommonButton mode="default" onClick={onClick}>
          링크삭제
        </CommonButton>
      )}
    </>
  );
};
