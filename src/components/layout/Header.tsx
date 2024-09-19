import Image from 'next/image';
import Link from 'next/link';
import { match } from 'ts-pattern';
import { useLoginAccessibility } from '@/lib/hooks';
import HeaderLogoImage from '@/assets/images/headerLogo.png';
import { ProfileMenu, RenderLink } from './ui';

const Header = () => {
  const { isLoginAccessible } = useLoginAccessibility();

  return (
    <header className="bg-bg">
      <div className="w-full flex justify-between items-center mx-auto max-w-[22.81rem] h-[3.75rem] px-[1.875rem] md:px-5 md:max-w-[52.5rem] md:h-[5.625rem] lg:max-w-[97.5rem] ">
        <h1>
          <Link href="/">
            <Image
              className="w-[5.563rem] h-auto md:w-[8.313rem]"
              src={HeaderLogoImage}
              alt="linkbrary"
              priority
            />
          </Link>
        </h1>

        <div className="flex justify-between items-center">
          {match(isLoginAccessible)
            .with(true, () => (
              <>
                {/** @Todo 해당 영역 보여지기전에 텀 수정 */}
                <RenderLink />
                <ProfileMenu />
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
