import { useEffect, useState } from 'react';
import { FolderTypes, getFolderList } from '@/lib/api';

export const useFolderHandler = () => {
  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('전체');

  const fetchFolderList = async () => {
    const data = await getFolderList();
    setFolderList(data);
  };

  useEffect(() => {
    fetchFolderList();
  }, []);

  const folderProviderValue = {
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
  };

  return { folderProviderValue };
};
