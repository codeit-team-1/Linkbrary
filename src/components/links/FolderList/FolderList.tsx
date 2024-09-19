import { useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import { CommonModal, ModalRenderer, Folder, CommonButton } from '@/components';
import { addFolder } from '@/lib/api';
import { useFolder, useModal } from '@/lib/context';
import { useHorizontalScroll } from '@/lib/hooks';

export const FolderList = () => {
  const { folderList, setFolderList, setSelectedFolder } = useFolder();
  const { openModal } = useModal();
  const listWrapperRef = useHorizontalScroll();

  const [newFolderName, setNewFolderName] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const defaultFolderAll = { createdAt: '', id: 0, name: '전체' };

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  const handleAddButtonClick = async () => {
    try {
      if (newFolderName === '전체') {
        openModal({
          type: 'alert',
          key: 'addFolderNameError',
          message: '"전체" 라는 이름의 폴더는 생성할 수 없습니다.',
        });
      } else {
        const newFolder = await addFolder({ newFolderName });
        setSelectedFolder(newFolder);
        setFolderList((prev) => [newFolder, ...prev]);
        openModal({
          type: 'alert',
          key: 'addFolderSuccess',
          title: '✅ 확인',
          message: `폴더가 추가되었습니다!`,
        });
        setNewFolderName('');
        toggleModal();
      }
    } catch {
      openModal({
        type: 'alert',
        key: 'addFolderError400',
        message: `폴더 추가 중 에러가 발생했습니다. 다시 시도해주세요.`,
      });
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <div className="flex justify-start items-center gap-4 min-w-0">
        <Folder folder={defaultFolderAll} />
        <ul
          className="flex justify-start items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
          ref={listWrapperRef}
        >
          {folderList.map((folder) => (
            <li key={folder.id}>
              <Folder folder={folder} />
            </li>
          ))}
        </ul>
      </div>

      <CommonButton
        mode="default"
        className="flex justify-center items-center gap-1 font-medium text-primary text-base whitespace-nowrap font-[Pretendard] not-italic leading-[normal]"
        onClick={toggleModal}
      >
        폴더 추가
        <Image src={plusIcon} alt="플러스 아이콘" width={16} height={16} />
      </CommonButton>

      {showModal && (
        <CommonModal closeModal={toggleModal}>
          <ModalRenderer
            mode="add"
            getInputValue={getInputValue}
            handleAddButtonClick={handleAddButtonClick}
          />
        </CommonModal>
      )}
    </div>
  );
};
