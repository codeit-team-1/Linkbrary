/* eslint-disable prefer-destructuring */
import { match } from 'ts-pattern';
import {
  AddFolder,
  ShareFolder,
  ChangeFolderName,
  DeleteFolder,
} from './ModalContents';

type AddModal = {
  mode: 'add';
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddButtonClick: () => void;
};
type ShareModal = { mode: 'share' };
type ChangeNameModal = {
  mode: 'changeName';
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeButtonClick: () => void;
};
type DeleteModal = { mode: 'delete'; handleDeleteButtonClick: () => void };

type ModalRendererProps = AddModal | ShareModal | ChangeNameModal | DeleteModal;

// 모달별 프롭스가 달라 전달 받을 때 구조분해할당 하지 않음
export const ModalRenderer = (modalProps: ModalRendererProps) => {
  const SelectedModalContent = match(modalProps)
    .with({ mode: 'add' }, ({ getInputValue, handleAddButtonClick }) => {
      return (
        <AddFolder
          getInputValue={getInputValue}
          handleAddButtonClick={handleAddButtonClick}
        />
      );
    })
    .with({ mode: 'share' }, () => <ShareFolder />)
    .with(
      { mode: 'changeName' },
      ({ getInputValue, handleChangeButtonClick }) => {
        return (
          <ChangeFolderName
            getInputValue={getInputValue}
            handleChangeButtonClick={handleChangeButtonClick}
          />
        );
      },
    )
    .with({ mode: 'delete' }, ({ handleDeleteButtonClick }) => {
      return <DeleteFolder handleDeleteButtonClick={handleDeleteButtonClick} />;
    })
    .exhaustive();

  return SelectedModalContent;
};
