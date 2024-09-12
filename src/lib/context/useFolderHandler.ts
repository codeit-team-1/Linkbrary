import { useCallback, useEffect, useState } from 'react';
import { FolderTypes, getFolderList } from '@/lib/api';
import { useAuth } from './AuthProvider';

export const useFolderHandler = () => {
  const { isLoggedin } = useAuth();
  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderTypes>({
    createdAt: '',
    id: 0,
    name: '',
  });

  const fetchFolderList = useCallback(async () => {
    const data = await getFolderList();
    setFolderList(data);
  }, [setFolderList]);

  useEffect(() => {
    if (isLoggedin) {
      fetchFolderList();
    }
  }, [isLoggedin, fetchFolderList]);

  const folderProviderValue = {
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
  };

  return { folderProviderValue };
};
