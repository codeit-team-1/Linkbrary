import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { FolderTypes } from '@/lib/api';
import { useFolderHandler } from './useFolderHandler';

interface FolderContextType {
  folderList: FolderTypes[];
  setFolderList: Dispatch<SetStateAction<FolderTypes[]>>;
  selectedFolder: FolderTypes;
  setSelectedFolder: Dispatch<SetStateAction<FolderTypes>>;
}

export const FolderContext = createContext<FolderContextType>({
  folderList: [],
  setFolderList: () => {},
  selectedFolder: {
    createdAt: '',
    id: 0,
    name: '전체',
  },
  setSelectedFolder: () => {},
});

interface FolderProviderProps {
  children: React.ReactNode;
}

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const { folderProviderValue } = useFolderHandler();
  return (
    <FolderContext.Provider value={folderProviderValue}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => {
  const folderContext = useContext(FolderContext);
  if (!folderContext) {
    throw new Error('컨텍스트는 프로바이더 안에서만 사용가능합니다.');
  }
  return folderContext;
};
