import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ProfileImage from '@/assets/images/profileImage.png';
import { useLoginAccessibility } from '@/lib/hooks';
import { useAuth } from '@/lib/context';

export const ProfileMenu = () => {
  const { logout } = useAuth();
  const { userInfo } = useLoginAccessibility();
  const router = useRouter();
  const [logoutView, setLogoutView] = useState<boolean>(false);

  const toggleProfileMenu = () => {
    setLogoutView(!logoutView);
  };

  const handleUserLogout = () => {
    setLogoutView(false);
    logout();
    router.push('/login');
  };

  const logoutClassName = `w-20 h-[2.188rem] text-center leading-[2.188rem] text-sm bg-white rounded-[0.25rem] border border-solid border-primary transition-opacity duration-1000 ${logoutView ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-center"
        onClick={() => {
          toggleProfileMenu();
        }}
      >
        <Image
          className="mr-[0.375rem]"
          width={28}
          src={ProfileImage}
          alt="프로필 이미지"
        />
        <span className="hidden md:block">{userInfo?.name}</span>
      </button>
      <ul className="absolute left-[50%] translate-x-[-50%] bottom-[-2.813rem]">
        <li className={logoutClassName}>
          <button
            type="button"
            onClick={() => {
              handleUserLogout();
            }}
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};
