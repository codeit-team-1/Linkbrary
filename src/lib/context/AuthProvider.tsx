import { createContext, useContext } from 'react';
import { AuthContextType, useAuthHandler } from './useAuthHandler';

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  updateUserInfo: () => {},
  updateIsLoggedIn: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authProviderValue = useAuthHandler();

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('페이지 내에서 사용해주세요.');
  }

  return ctx;
};
