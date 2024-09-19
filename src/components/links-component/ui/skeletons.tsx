import { getPageSize } from '@/lib/utils/links';
import { useLinksContextSelector } from '../providers';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
const pageStyle =
  'relative box-content w-7 h-7 p-2 text-center rounded-lg bg-gray-200 text-lg leading-relaxed';

const LinkCardSkeleton = () => {
  const cardStyle = 'w-full h-5 bg-gray-200 rounded-2xl';
  return (
    <div className={`${shimmer} flex flex-col gap-y-1`}>
      <div className="relative w-full h-0 pt-[56.25%]">
        <div
          className={`${shimmer} absolute top-0 left-0 w-full h-full bg-gray-200 rounded-2xl`}
        />
      </div>
      <div className={cardStyle} />
      <div className={cardStyle} />
      <div className={cardStyle} />
    </div>
  );
};

export const LinkCardsSkeleton = () => {
  const { clientSizeAction } = useLinksContextSelector();
  const width = clientSizeAction.data?.width;
  const pageSize = getPageSize(width || 0);
  return (
    <section className="py-8 lg:container lg:mx-auto">
      <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(pageSize)
          .fill(0)
          .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="relative overflow-hidden">
              <LinkCardSkeleton />
            </li>
          ))}
      </ul>
    </section>
  );
};

export const LinkPaginationSkeleton = () => {
  return (
    <section className="p-8 lg:container lg:mx-auto">
      <ul className="relative flex justify-center gap-x-2">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <li key={index} className={`${shimmer} ${pageStyle}`} />;
          })}
      </ul>
    </section>
  );
};
