/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { ConnectedProps, connect } from "react-redux";
import { togglePostForm } from "../redux/modals/modals.actions";
import CreatePostForm from "./CreatePostForm";

const CreatePost: React.FC<object & ReduxProps> = ({
  hideForm,
  togglePostForm,
}) => {
  function handleModal() {
    togglePostForm();
  }
  return (
    <>
      <div className='d-flex post'>
        <div
          role='button'
          className='d-flex flex-column align-items-center'
          onClick={() => handleModal()}
        >
          <span>
            <i className='bi bi-badge-ad'></i>
          </span>
          Text
        </div>
        <div role='button' className='d-flex flex-column align-items-center' onClick={() => handleModal()}>
          <span>
            <i className='bi bi-camera-fill text-danger'></i>
          </span>
          Photo
        </div>
        <div role='button' className='d-flex flex-column align-items-center' onClick={() => handleModal()}>
          <span>
            <i className='bi bi-chat-quote text-danger'></i>
          </span>
          Quote
        </div>
        <div role='button' className='d-flex flex-column align-items-center' onClick={() => handleModal()}>
          <span>
            <i className='bi bi-link-45deg text-success'></i>
          </span>
          Link
        </div>
        <div role='button' className='d-flex flex-column align-items-center' onClick={() => handleModal()}>
          <span>
            <i className='bi bi-chat-square-dots-fill text-primary'></i>
          </span>
          Chat
        </div>
        <div role='button' className='d-flex flex-column align-items-center' onClick={() => handleModal()}>
          <span>
            <i className='bi bi-headset text-light-emphasis'></i>
          </span>
          Audio
        </div>
        <div role='button' className='d-flex flex-column align-items-center' onClick={() => handleModal()}>
          <span>
            <i className='bi bi-camera-reels-fill text-danger-emphasis'></i>
          </span>
          Video
        </div>
      </div>
      <CreatePostForm
        hideCreateForm={hideForm}
        togglePostForm={togglePostForm}
      />
    </>
  );
};
const mapStateToProps = (state: { toggleModal: { hideForm: any } }) => ({
  hideForm: state.toggleModal.hideForm,
});
const mapDispatchToProps = (dispatch: (arg0: { type: string }) => any) => ({
  togglePostForm: () => dispatch(togglePostForm()),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(CreatePost);
