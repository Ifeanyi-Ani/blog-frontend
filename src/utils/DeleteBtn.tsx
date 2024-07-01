import { toast } from "react-hot-toast";
import deleteBtn from "../assets/delete.svg";
import { useEffect } from "react";
import {
  MutationActionCreatorResult,
  MutationDefinition,
} from "@reduxjs/toolkit/query";

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
      toast.success("Successfully deleted");
    }
    if (isError) {
      toast.error("unable to delete Comment");
    }
  }, [isSuccess, isError]);
  return (
    <img
      src={deleteBtn}
      alt="deleteBtn"
      className="absolute top-1 right-1 w-4 h-4"
      role="button"
      onClick={() => handleDelete(deleteDetails)}
      aria-disabled={isLoading}
    />
  );
};

export default DeleteBtn;
