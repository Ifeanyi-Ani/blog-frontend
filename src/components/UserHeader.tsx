import { Card, Dropdown, DropdownButton } from "react-bootstrap";

const UserHeader = ({ currentUser, post }: { currentUser: any; post: any }) => {
  async function handleDelete(id: string, cb: () => void) {
    if (confirm("Are sure you want to delete this post")) {
      // await deletePost(id);
      // cb();
    }
  }

  function handleEdit(post) {
    // selectedPost(post);
    // toggleEditForm();
  }

  return (
    <>
      {post?.userId ? (
        <Card.Header
          style={{
            position: "relative",
            borderBottom: "none",
            paddingLeft: "55px",
          }}
          className="card_Header"
        >
          <span role="button"> {post.userId.username}</span>
          <span className="text-primary ms-1" role="button">
            follow
          </span>
          <div
            role="button"
            className="d-flex justify-content-center align-items-center fs-4"
            style={{
              position: "absolute",
              top: "50%",
              right: "2px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <DropdownButton
              variant="light"
              drop="start"
              id="dropdown-button-drop-start"
              title="..."
            >
              {currentUser?.role === "admin" ||
              post.userId.id === currentUser?.id ? (
                <>
                  <Dropdown.Item
                    // onClick={() => handleDelete(post._id, fetchPosts)}
                    role="button"
                  >
                    delete
                  </Dropdown.Item>
                </>
              ) : null}
              {/* {user.id === currentUser?.id ? (
                <Dropdown.Item onClick={() => handleEdit(post)}>
                  edit
                </Dropdown.Item>
              ) : null} */}
            </DropdownButton>

            {/* <EditForm toggleEditForm={toggleEditForm} editForm={editForm} /> */}
          </div>
        </Card.Header>
      ) : null}
    </>
  );
};

/* const mapStateToProps = ({ toggleModal: { editForm } }) => ({
  editForm,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleEditForm: () => dispatch(toggleEditForm()),
    selectedPost: (data) => dispatch(selectedPost(data)),
    deletePost: (id) => dispatch(deletePost(id)),
  };
}; */
// const mapDispatchToProps = {
//   deletePost,
// };
export default UserHeader;
