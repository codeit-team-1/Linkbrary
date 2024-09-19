import { TLinkDto } from '@/lib/react-query';
import { linkEntitiesToDtos } from '@/lib/utils/links';
import { LinkCard } from './link-card';
import { useLinksContextSelector } from '../../providers';
import { LinkComponentProps } from '../link.component';

export const LinkCards = ({ filterLinks, searchValue }: LinkComponentProps) => {
  const { linksAction } = useLinksContextSelector();

  const allLinks = linksAction.data?.data.list ?? [];

  const viewLinks =
    searchValue.trim() === '' ? allLinks : linkEntitiesToDtos(filterLinks);
  return (
    <section className="py-8 lg:mx-auto">
      {viewLinks.length > 0 ? (
        <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {viewLinks.map((card: TLinkDto) => {
            return (
              <li key={card.id}>
                <LinkCard data={card} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="text-center font-bold text-lg my-5 md:text-3xl md:my-10">
          검색된 내용이 없습니다.
        </h2>
      )}
    </section>
  );
};
