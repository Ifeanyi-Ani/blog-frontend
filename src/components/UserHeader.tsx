import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { deletePost, selectedPost } from "../redux/posts/posts.action";
import { toggleEditForm } from "../redux/modals/modals.actions";
import EditForm from "./EditForm";

const UserHeader = ({
  userId,
  currentUserId,
  post,
  fetchPosts,
  deletePost,
  toggleEditForm,
  editForm,
  selectedPost,
}) => {
  async function handleDelete(post, cb) {
    if (confirm("Are you sure you want to delete this post")) {
      await deletePost(post.id);
      cb();
    }
  }

  function handleEdit(post) {
    selectedPost(post);
    toggleEditForm();
  }

  return (
    <>
      {userId ? (
        <Card.Header
          style={{
            position: "relative",
            borderBottom: "none",
            paddingLeft: "55px",
          }}
          className='card_Header'
        >
          <span role='button'> {userId.username}</span>
          <span className='text-primary ms-1' role='button'>
            follow
          </span>
          <div
            role='button'
            className='d-flex justify-content-center align-items-center fs-4'
            style={{
              position: "absolute",
              top: "50%",
              right: "2px",
              transform: "translate(-50%, -50%)",
            }}
          >
            {userId.id === currentUserId ? (
              <>
                <div onClick={() => handleDelete(post, fetchPosts)}>...</div>
                <div onClick={() => handleEdit(post)}>edit</div>
                <EditForm toggleEditForm={toggleEditForm} editForm={editForm} />
              </>
            ) : null}
          </div>
        </Card.Header>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ toggleModal: { editForm } }) => ({
  editForm,
});

const mapDispatchToProps = dispatch => ({
  deletePost,
  toggleEditForm: () => dispatch(toggleEditForm()),
  selectedPost: data => dispatch(selectedPost(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
