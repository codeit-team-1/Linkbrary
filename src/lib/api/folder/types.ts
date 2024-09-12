import { AxiosRequestConfig } from 'axios';

export interface FolderTypes {
  createdAt: string;
  id: number;
  linkCount?: number;
  name: string;
}

export interface GetFolderParams {
  folderId: number;
}

export interface PostFolderParams {
  folderName: string;
  config?: AxiosRequestConfig;
}

export interface PostLinkParams {
  url: string;
  folderId: number;
}

export interface PutFolderParams {
  newFolderName: string;
  folderId: number;
}

export interface DeleteFolderParams {
  folderId: number;
}
