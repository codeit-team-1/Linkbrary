import { useMemo } from 'react';
import { useFolder } from '@/lib/context';
import { FolderTypes } from '@/lib/api';
import { CommonButton } from '@/components';

interface FolderProps {
  folder: FolderTypes;
}

export const Folder = ({ folder }: FolderProps) => {
  const { selectedFolder, setSelectedFolder } = useFolder();

  const isActive = selectedFolder.id === folder.id;
  const folderButtonClassNames = useMemo(
    () =>
      `flex-shrink-0 px-3 py-2 border border-solid border-primary rounded-[5px] whitespace-nowrap font-normal text-base font-[Pretendard] not-italic leading-[normal] ${
        isActive ? 'bg-primary text-white' : 'hover:bg-[#e7effb]'
      }`,
    [isActive],
  );

  return (
    <CommonButton
      mode="default"
      className={folderButtonClassNames}
      onClick={() =>
        setSelectedFolder((prev) => (prev.id === folder.id ? prev : folder))
      }
    >
      {folder.name}
    </CommonButton>
  );
};
