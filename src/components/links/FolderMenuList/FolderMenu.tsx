import { useCallback, useState } from 'react';
import Image from 'next/image';
import { CommonButton, CommonModal, ModalRenderer } from '@/components';
import { useFolder, useModal } from '@/lib/context';
import { deleteFolder, getFolderList, updateFolder } from '@/lib/api';
import { useLinksContextSelector } from '@/components/links-component';

type ModalType = 'add' | 'share' | 'changeName' | 'delete';

interface FolderMenuProps {
  src: string;
  text: string;
  modalType: ModalType;
}

export const FolderMenu = ({ src, text, modalType }: FolderMenuProps) => {
  const { setFolderList, selectedFolder, setSelectedFolder } = useFolder();
  const {
    linksAction: { data: linkData },
  } = useLinksContextSelector();
  const { openModal } = useModal();
  const [newFolderName, setNewFolderName] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const toggleModal = () => {
    let modalTypeText = '';
    switch (modalType) {
      case 'share':
        modalTypeText = '공유';
        break;
      case 'changeName':
        modalTypeText = '변경';
        break;
      case 'delete':
        modalTypeText = '삭제';
        break;
      default:
        modalTypeText = '';
        break;
    }
    if (selectedFolder.id === 0) {
      openModal({
        type: 'alert',
        key: `preventDefaultFolder${modalType}`,
        message: `전체 폴더는 ${modalTypeText}할 수 없습니다.`,
      });
      return;
    }
    if (modalType === 'share' && linkData && linkData.data.totalCount < 1) {
      openModal({
        type: 'alert',
        key: 'preventEmptyFolderShare',
        message: '폴더가 비어있습니다. 먼저 링크를 추가해주세요 😄',
      });
      return;
    }
    setShowModal((prev) => !prev);
  };

  const fetchFolderList = useCallback(async () => {
    const data = await getFolderList();
    setFolderList(data);
  }, []);

  const handleChangeButtonClick = async () => {
    try {
      const newFolder = await updateFolder({
        newFolderName,
        folderId: selectedFolder.id,
      });
      await fetchFolderList();
      setSelectedFolder(newFolder);
      openModal({
        type: 'alert',
        key: 'changeFolderNameSuccess',
        title: '✅ 확인',
        message: `폴더 이름이 변경되었습니다!`,
      });
      toggleModal();
    } catch {
      openModal({
        type: 'alert',
        key: 'changeFolderNameError400',
        message: `폴더 이름 변경 중 에러가 발생했습니다. 다시 시도해주세요.`,
      });
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      if (linkData && linkData.data.totalCount > 0) {
        openModal({
          type: 'alert',
          key: 'notEmptyFolderDeleteError',
          message: '링크가 들어있는 폴더는 삭제할 수 없습니다.',
          onConfirm() {
            setShowModal(false);
          },
        });
        return;
      }
      await deleteFolder({ folderId: selectedFolder.id });
      await fetchFolderList();
      setSelectedFolder({ createdAt: '', id: 0, name: '전체' });
      openModal({
        type: 'alert',
        key: 'deleteFolderSuccess',
        title: '✅ 확인',
        message: `폴더가 삭제되었습니다!`,
      });
      toggleModal();
    } catch {
      openModal({
        type: 'alert',
        key: 'deleteFolderError400',
        message: `폴더 삭제 중 에러가 발생했습니다. 다시 시도해주세요.`,
      });
    }
  };

  const renderModal = () => {
    switch (modalType) {
      case 'share':
        return <ModalRenderer mode="share" />;
      case 'changeName':
        return (
          <ModalRenderer
            mode="changeName"
            getInputValue={getInputValue}
            handleChangeButtonClick={handleChangeButtonClick}
          />
        );
      case 'delete':
        return (
          <ModalRenderer
            mode="delete"
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <CommonButton
        mode="default"
        className="flex justify-center items-center gap-1 text-[0.875rem] font-semibold text-secondary-60 font-[Pretendard] not-italic leading-[normal]"
        onClick={toggleModal}
      >
        <Image src={src} alt={`${text} 아이콘`} width={18} height={18} />
        {text}
      </CommonButton>
      {showModal && (
        <CommonModal closeModal={toggleModal}>{renderModal()}</CommonModal>
      )}
    </>
  );
};
