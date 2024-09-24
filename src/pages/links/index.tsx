import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import {
  FolderProvider,
  useFolder,
  ModalType,
  useAuth,
  useModal,
} from '@/lib/context';
import { AddLink, SearchBar, FolderList, FolderMenuList } from '@/components';
import { linkSearch, LinkSearchData } from '@/lib/api';
import {
  DropBoxStoreProvider,
  LinkComponent,
  LinksContextProvider,
  ModalStoreProvider,
  ModifyAndDeleteModal,
} from '@/components/links-component';
import { LinkCardsSkeleton } from '@/components/links-component/ui/skeletons';

const MainContent = () => {
  const { selectedFolder, setSelectedFolder } = useFolder();
  const { logout } = useAuth();
  const { openModal } = useModal();
  const [searchText, setSearchText] = useState<string>('');
  const [filterLinks, setFilterLinks] = useState<LinkSearchData[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const fetchLinks = async (query: string) => {
    const option = {
      page: 0,
      pageSize: 0,
      search: query,
    };
    setSearchLoading(true);
    try {
      if (query) {
        const links = await linkSearch(option);
        setFilterLinks(links.data.list);
        setSearchLoading(false);
      } else {
        setFilterLinks([]);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const modalOption: ModalType = {
          type: 'alert',
          key: 'linkSearchDefault',
        };
        switch (error.status) {
          case 401:
            modalOption.key = 'expireTokenError';
            modalOption.message =
              '로그인이 만료되었습니다. 다시 로그인해주세요.';
            logout();
            break;
          case 400:
            modalOption.key = 'httpRequestError';
            modalOption.message = '잘못된 요청입니다. 요청 값을 확인해주세요.';
            break;
          default:
            modalOption.key = 'linkSearchUnknownError';
            modalOption.message =
              '알 수 없는 에러입니다. 계속되는 경우 관리자에게 문의해주세요.';
            break;
        }
        openModal(modalOption);
      }
    } finally {
      setSearchLoading(false);
    }
  };

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSelectedFolder({
      createdAt: '',
      id: 0,
      name: '전체',
    });
  };

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (searchText) {
        fetchLinks(searchText);
      } else {
        setFilterLinks([]);
      }
    }, 500);

    return () => clearTimeout(searchDebounce);
  }, [searchText]);

  return (
    <main className="select-none">
      <div className="bg-bg pt-6 pb-10 px-8 md:pt-[3.75rem] md:pb-[5.625rem]">
        <AddLink />
      </div>
      <div className="max-w-[66.25rem] mt-5 mx-8 md:mt-10 lg:mt-10 lg:m-auto">
        <div className="my-10 md:mb-10">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            searchOnChange={searchOnChange}
          />
        </div>
        {searchText && (
          <h2 className="text-lg font-bold mb-5 md:mb-10 md:text-3xl">
            {searchText}
            <span className="text-secondary-60">에 대한 검색 결과입니다.</span>
          </h2>
        )}
        <div className="mb-7 md:mb-6">
          <FolderList />
        </div>
        <div className="md:flex md:justify-between md:items-center">
          <h3 className="font-semibold text-2xl text-black mb-3 font-[Pretendard] not-italic leading-[normal]">
            {selectedFolder.name}
          </h3>
          <FolderMenuList />
        </div>
        {searchLoading ? (
          <LinkCardsSkeleton />
        ) : (
          <LinkComponent filterLinks={filterLinks} searchValue={searchText} />
        )}
      </div>
    </main>
  );
};

const Links = () => {
  return (
    <FolderProvider>
      <LinksContextProvider>
        <DropBoxStoreProvider>
          <ModalStoreProvider>
            <ModifyAndDeleteModal />
            <MainContent />
          </ModalStoreProvider>
        </DropBoxStoreProvider>
      </LinksContextProvider>
    </FolderProvider>
  );
};

export default Links;
