import { useCallback, useEffect, useState } from 'react';
import { FavoriteLinkTypes, getFavoriteLinkList } from '@/lib/api';
import { useAuth } from './AuthProvider';

export const useLinkHandler = () => {
  const { isLoggedin } = useAuth();
  const [linkList, setLinkList] = useState<FavoriteLinkTypes[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<FavoriteLinkTypes>({
    id: 0,
    favorite: false,
    url: '',
    title: '',
    imageSource: '',
    description: '',
    createdAt: '',
  });

  const fetchFavoriteLinkList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFavoriteLinkList();
      setLinkList(data.list);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to fetch favorite links:', err);
      }
      setError('Failed to fetch favorite links');
    } finally {
      setLoading(false);
    }
  }, [setLinkList]);

  useEffect(() => {
    if (isLoggedin) {
      fetchFavoriteLinkList();
    }
  }, [isLoggedin, fetchFavoriteLinkList]);

  return {
    linkList,
    setLinkList,
    selectedLink,
    setSelectedLink,
    error,
    refreshLinkList: fetchFavoriteLinkList,
  };
};
