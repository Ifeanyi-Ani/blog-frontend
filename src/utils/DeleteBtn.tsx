import {
  MutationActionCreatorResult,
  MutationDefinition,
} from '@reduxjs/toolkit/query';

import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

import deleteBtn from '../assets/delete.svg';
type Props = {
  deleteDetails: any;
  deleteData: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const DeleteBtn = (props: Props) => {
  const { deleteDetails, deleteData, isLoading, isSuccess, isError } = props;
  const handleDelete = async (itemId: any) => {
    console.log(itemId);
    await deleteData(itemId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully deleted');
    }
    if (isError) {
      toast.error('unable to delete Comment');
    }
  }, [isSuccess, isError]);
  return (
    <img
      src={deleteBtn}
      alt="deleteBtn"
      className="absolute right-1 top-1 h-4 w-4"
      role="button"
      onClick={() => handleDelete(deleteDetails)}
      aria-disabled={isLoading}
    />
  );
};

export default DeleteBtn;
