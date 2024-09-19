import { useFolder } from '@/lib/context';
import { CommonInput, CommonButton } from '@/components';

interface ChangeFolderNameProps {
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeButtonClick: () => void;
}

export const ChangeFolderName = ({
  getInputValue,
  handleChangeButtonClick,
}: ChangeFolderNameProps) => {
  const { selectedFolder } = useFolder();

  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 이름 변경
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[0.875rem] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[1.375rem]">
        {selectedFolder.name}
      </h4>
      <div className="mt-6 mb-[0.9375rem]">
        <CommonInput placeholder="내용 입력" onChange={getInputValue} />
      </div>
      <CommonButton mode="default" onClick={handleChangeButtonClick}>
        변경하기{' '}
      </CommonButton>
    </div>
  );
};
