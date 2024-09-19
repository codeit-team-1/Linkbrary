import { useFolder } from '@/lib/context';
import { CommonButton } from '@/components';

interface DeleteFolderProps {
  handleDeleteButtonClick: () => void;
}

export const DeleteFolder = ({
  handleDeleteButtonClick,
}: DeleteFolderProps) => {
  const { selectedFolder } = useFolder();

  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 삭제
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[0.875rem] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[1.375rem]">
        {selectedFolder.name}
      </h4>
      <CommonButton
        className="flex w-full py-4 px-5 justify-center items-center gap-2.5 bg-red rounded-lg text-white disabled:bg-none disabled:bg-gray-500"
        mode="default"
        onClick={handleDeleteButtonClick}
      >
        삭제하기{' '}
      </CommonButton>
    </div>
  );
};
