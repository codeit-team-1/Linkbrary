import { instance } from '@/lib/api';
import { linkEntitiesToDtos } from '@/lib/utils/links';
import { TMutationResponse, TQueryResponse } from '../types';

export type TLinksResponse<T> = {
  list: T;
  totalCount: number;
};

export type TLinksQuery =
  | undefined
  | {
      folderId: number;
      pageSize: number;
      page: number;
      keyword: string;
    };

export type TLinkDto = {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
  relativeTime: string;
};

export type TLink = {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
};

export const linkServices = {
  find: async (
    query: TLinksQuery,
    signal: AbortSignal,
  ): Promise<TQueryResponse<TLinksResponse<TLinkDto[]>>> => {
    const response = await instance.get<TLinksResponse<TLink[]>>(
      query?.folderId ? `/folders/${query?.folderId}/links` : '/links',
      {
        params: {
          page: query?.page,
          pageSize: query?.pageSize,
          search: query?.keyword,
        },
        signal,
      },
    );
    const { data } = response;
    const { list, totalCount } = data;
    const dtos = linkEntitiesToDtos(list);
    return { data: { list: dtos, totalCount } };
  },
  favorite: async (query: { id: number; favorite: boolean }) => {
    const response = await instance.put<TLink>(`/links/${query?.id}/favorite`, {
      favorite: query?.favorite,
    });
    const { data } = response;
    const [dto] = linkEntitiesToDtos([data]);
    return { data: dto };
  },
  modify: async (query: {
    id: number;
    url: string;
  }): Promise<TMutationResponse<TLinkDto>> => {
    const response = await instance.put<TLink>(`/links/${query?.id}`, {
      url: query?.url,
    });
    const { data } = response;
    const [dto] = linkEntitiesToDtos([data]);
    return { data: dto };
  },
  delete: async (query: { id: number }) => {
    await instance.delete(`/links/${query?.id}`);
  },
};
