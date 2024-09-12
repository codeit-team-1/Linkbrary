import { useAuth } from '@/lib/context';

export const useLoginAccessibility = () => {
  const { userInfo, isLoggedin } = useAuth();

  return {
    userInfo,
    isLoginAccessible: isLoggedin,
  };
};
