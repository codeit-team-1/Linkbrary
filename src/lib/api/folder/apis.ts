import { TLink, TLinkDto, TQueryResponse } from '@/lib/react-query';
import { linkEntitiesToDtos } from '@/lib/utils/links';
import { API_PATH, instance } from '../config';
import {
  DeleteFolderParams,
  FolderTypes,
  GetFolderParams,
  PostFolderParams,
  PostLinkParams,
  PutFolderParams,
} from './types';

export const getFolderList = async () => {
  const response = await instance.get<FolderTypes[]>(API_PATH.folder.default);

  return response.data ?? [];
};

export const addFolder = async ({ newFolderName }: PostFolderParams) => {
  const params = { name: newFolderName };
  const response = await instance.post<FolderTypes>(
    API_PATH.folder.default,
    params,
  );

  return response.data ?? [];
};

export const updateFolder = async ({
  newFolderName,
  folderId,
}: PutFolderParams) => {
  const params = { name: newFolderName };
  const response = await instance.put(API_PATH.folder.detail(folderId), params);

  return response.data ?? [];
};

export const deleteFolder = async ({ folderId }: DeleteFolderParams) => {
  const response = await instance.delete(API_PATH.folder.detail(folderId));

  return response.data ?? [];
};

export const getLinkList = async ({ folderId }: GetFolderParams) => {
  const response = await instance.get<FolderTypes[]>(
    API_PATH.link.category(folderId),
  );

  return response.data ?? [];
};

export const addLink = async ({
  url,
  folderId,
}: PostLinkParams): Promise<TQueryResponse<TLinkDto>> => {
  const params = { url, folderId };
  const response = await instance.post<TLink>(API_PATH.link.default, params);
  const { data } = response;
  const [dto] = linkEntitiesToDtos([data]);
  return { data: dto };
};
