import { AxiosError } from 'axios';
import { match } from 'ts-pattern';
import { LinkSearchData } from '@/lib/api';
import { useModal } from '@/lib/context';
import { useLinksContextSelector } from '../providers';
import { LinkCardsSkeleton, LinkPaginationSkeleton } from './skeletons';
import { LinkPagination } from './link.pagination';
import { LinkCards } from './link-card';

export interface LinkComponentProps {
  filterLinks: LinkSearchData[];
  searchValue: string;
}

export const LinkComponent = ({
  filterLinks,
  searchValue,
}: LinkComponentProps) => {
  const { openModal } = useModal();
  const { linksAction } = useLinksContextSelector();
  const { isLoading } = linksAction;
  const { isError, error } = linksAction;
  const zeroLength = linksAction.data?.data.list.length === 0;
  return match({ zeroLength, isLoading, isError })
    .with({ isLoading: true }, () => (
      <>
        <LinkCardsSkeleton />
        <LinkPaginationSkeleton />
      </>
    ))
    .with({ isLoading: false, isError: true }, () => {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 401:
            openModal({
              type: 'alert',
              key: 'expireToken',
              message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
            });
            break;

          default:
            break;
        }
      }
      return (
        <section className="p-8 flex justify-center">
          <h1 className="text-2xl">
            데이터를 불러오는 데 실패했습니다. 다시 시도 해 주세요.
          </h1>
        </section>
      );
    })
    .with({ zeroLength: true }, () => (
      <section className="p-8 flex justify-center">
        <h1 className="text-2xl">
          데이터가 존재하지 않습니다. 링크를 추가해주세요.
        </h1>
      </section>
    ))
    .otherwise(() => (
      <>
        <LinkCards filterLinks={filterLinks} searchValue={searchValue} />
        <LinkPagination />
      </>
    ));
};
