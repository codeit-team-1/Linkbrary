import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { match } from 'ts-pattern';
import { useAuth } from '@/lib/context';
import { useLoginAccessibility } from '@/lib/hooks';
import HeaderLogoImage from '@/assets/images/headerLogo.png';
import ProfileImage from '@/assets/images/profileImage.png';

const Header = () => {
  const { logout } = useAuth();
  const [logoutView, setLogoutView] = useState<boolean>(false);

  const toggleProfileMenu = () => {
    setLogoutView(!logoutView);
  };

  const handleUserLogout = () => {
    setLogoutView(false);
    logout();
  };

  const { isLoginAccessible, userInfo } = useLoginAccessibility();

  return (
    <header className="bg-bg">
      <div className="w-full flex justify-between items-center mx-auto max-w-[22.81rem] h-[3.75rem] px-[1.875rem] md:px-5 md:max-w-[52.5rem] md:h-[5.625rem] lg:max-w-[97.5rem] ">
        <h1>
          <Link href="/">
            <Image
              className="w-[5.563rem] h-4 md:w-[8.313rem] md:h-6"
              src={HeaderLogoImage}
              alt="linkbrary"
            />
          </Link>
        </h1>

        <div className="flex justify-between items-center">
          {match(isLoginAccessible)
            .with(true, () => (
              <>
                {/** @Todo 해당 영역 보여지기전에 텀 수정 */}
                <Link
                  href="/favorite"
                  className="flex items-center justify-center w-[4.375rem] h-[1.875rem] border border-solid border-primary rounded-[0.25rem] text-xs md:w-[5.813rem] mr-4 md:h-[2.313rem] md:text-sm md:mr-6"
                >
                  ⭐️ 즐겨찾기
                </Link>
                <div className="relative ">
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
                      height={28}
                      src={ProfileImage}
                      alt="프로필 이미지"
                    />
                    <span className="hidden md:block">{userInfo?.name}</span>
                  </button>
                  <ul className="absolute left-[50%] translate-x-[-50%] bottom-[-2.813rem]">
                    <li
                      className={`w-20 h-[2.188rem] text-center leading-[2.188rem] text-sm bg-white rounded-[0.25rem] border border-solid border-primary transition-opacity duration-1000 ${logoutView ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
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
              </>
            ))
            .with(false, () => (
              <Link
                href="/login"
                className="bg-gradient-color flex items-center justify-center w-20 h-[2.313rem] rounded-lg text-sm text-white md:w-32 md:h-[3.313rem] md:text-lg"
              >
                로그인
              </Link>
            ))
            .exhaustive()}
        </div>
      </div>
    </header>
  );
};

export default Header;
