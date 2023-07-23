import { Card, Dropdown, DropdownButton } from "react-bootstrap";
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
  async function handleDelete(id, cb) {
    if (confirm("Are sure you want to delete this post")) {
      await deletePost(id);
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
            <DropdownButton
              variant='light'
              drop='start'
              id='dropdown-button-drop-start'
              title='...'
            >
              {currentUserId?.data?.user?.role === "admin" ||
              userId.id === currentUserId?.data?.user?._id ? (
                <>
                  <Dropdown.Item
                    onClick={() => handleDelete(post._id, fetchPosts)}
                    role='button'
                  >
                    delete
                  </Dropdown.Item>
                </>
              ) : null}
              {userId.id === currentUserId?.data?.user?._id ? (
                <Dropdown.Item onClick={() => handleEdit(post)}>
                  edit
                </Dropdown.Item>
              ) : null}
            </DropdownButton>

            <EditForm toggleEditForm={toggleEditForm} editForm={editForm} />
          </div>
        </Card.Header>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ toggleModal: { editForm } }) => ({
  editForm,
});

const mapDispatchToProps = dispatch => {
  return {
    toggleEditForm: () => dispatch(toggleEditForm()),
    selectedPost: data => dispatch(selectedPost(data)),
    deletePost: id => dispatch(deletePost(id)),
  };
};
// const mapDispatchToProps = {
//   deletePost,
// };
export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
