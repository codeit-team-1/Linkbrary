import { useAuth } from '@/lib/context';
import { Routes } from '@/lib/route';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRedirectionWithAuth = () => {
  const { isLoggedin } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedin) {
      router.push(Routes.HOME);
    }
  }, [isLoggedin]);
};
