import { useRouter } from 'next/router';
import Link from 'next/link';
import { match } from 'ts-pattern';

export const RenderLink = () => {
  const router = useRouter();

  const renderLinkClassName =
    'flex items-center justify-center w-[4.375rem] h-[1.875rem] border border-solid border-primary rounded-[0.25rem] text-xs md:w-[5.813rem] mr-4 md:h-[2.313rem] md:text-sm md:mr-6';

  const RenderLinkElement = match(router.pathname === '/favorite')
    .with(true, () => (
      <Link href="/links" className={renderLinkClassName}>
        <span className="text-primary text-base">⏎</span>
        &nbsp;목록으로
      </Link>
    ))
    .with(false, () => (
      <Link href="/favorite" className={renderLinkClassName}>
        ⭐️ 즐겨찾기
      </Link>
    ))
    .exhaustive();

  return RenderLinkElement;
};
