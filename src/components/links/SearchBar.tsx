import Image from 'next/image';
import searchIcon from '@/assets/icons/ic_search.svg';
import closeIcon from '@/assets/icons/ic_close.svg';
import { CommonButton } from '@/components';

type SearchSubmit = (e: React.FormEvent<HTMLFormElement>) => void;
type SearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface SearchBarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchSubmit: SearchSubmit;
  searchOnChange: SearchOnChange;
}

export const SearchBar = ({
  searchText,
  setSearchText,
  searchSubmit,
  searchOnChange,
}: SearchBarProps) => {
  const searchDelete = () => {
    setSearchText('');
  };

  return (
    <div className="m-auto max-w-[66.25rem] h-auto px-4 py-[0.9375rem] flex justify-between items-center rounded-[10px] bg-[#f5f5f5]">
      <form className="w-full" onSubmit={searchSubmit}>
        <div className="w-full flex justify-center items-center gap-3">
          <Image src={searchIcon} alt="검색 아이콘" width={16} height={16} />
          <input
            className="w-full focus:outline-none bg-[#f5f5f5] placeholder-[#666666] font-[Pretendard] not-italic leading-[1.5rem]"
            type="text"
            value={searchText}
            placeholder="링크를 검색해 보세요"
            onChange={searchOnChange}
          />
        </div>
      </form>
      {searchText && (
        <CommonButton mode="default" className="" onClick={searchDelete}>
          <Image src={closeIcon} alt="삭제 아이콘" width={24} height={24} />
        </CommonButton>
      )}
    </div>
  );
};
