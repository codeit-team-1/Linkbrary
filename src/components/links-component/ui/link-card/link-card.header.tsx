import {
  linkOptions,
  TLinkDto,
  TLinksResponse,
  TQueryResponse,
} from '@/lib/react-query';
import Image from 'next/image';
import Link from 'next/link';
import star from '@/assets/icons/ic_star.svg';
import starSelected from '@/assets/icons/ic_star_selected.svg';
import emptyImg from '@/assets/images/empty.jpeg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from '@/lib/react';
import { validateLink } from '@/lib/utils/links';
import { useLinksContextSelector } from '../../providers';

export const CardHeader = ({
  url,
  imageSource,
  title,
  id,
  favorite,
}: Pick<TLinkDto, 'url' | 'imageSource' | 'title' | 'id' | 'favorite'>) => {
  const { linksQueryAction } = useLinksContextSelector();
  const queryClient = useQueryClient();
  const currentQuerykey = linkOptions.find(linksQueryAction.data).queryKey;
  const currentQueryData = queryClient.getQueryData(currentQuerykey);
  const mutationAction = useMutation({
    ...linkOptions.favorite(),
    onMutate: (query) => {
      const newQueryData = {
        data: {
          totalCount: currentQueryData?.data.totalCount,
          list: currentQueryData?.data.list.map((item: TLinkDto) =>
            item.id === id ? { ...item, favorite: query.favorite } : item,
          ),
        },
      } as TQueryResponse<TLinksResponse<TLinkDto[]>>;
      queryClient.setQueryData(currentQuerykey, newQueryData);
    },
    onError: (_, query) => {
      const newQueryData = {
        data: {
          totalCount: currentQueryData?.data.totalCount,
          list: currentQueryData?.data.list.map((item: TLinkDto) =>
            item.id === id ? { ...item, favorite: !query.favorite } : item,
          ),
        },
      } as TQueryResponse<TLinksResponse<TLinkDto[]>>;
      queryClient.setQueryData(currentQuerykey, newQueryData);
    },
  });
  const debouncedHandleClick = debounce(() => {
    mutationAction.mutate({ id, favorite: !favorite });
  }, 300);
  const startHttp = validateLink(url);
  return (
    <div className="relative">
      <Link href={`${startHttp ? url : `https://${url}`}`} target="_blank">
        <div className="relative w-full h-0 pt-[56.25%]">
          <Image
            priority
            className="rounded-2xl"
            src={imageSource || emptyImg}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      <Image
        id={String(id)}
        className="absolute top-5 right-3 hover:scale-110"
        src={favorite ? starSelected : star}
        alt=""
        width={34}
        height={34}
        data-favorite={!favorite}
        onClick={debouncedHandleClick}
      />
    </div>
  );
};
