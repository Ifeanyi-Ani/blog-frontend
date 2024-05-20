import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useDeletePostMutation } from "../posts/postSlice";

const UserHeader = ({ currentUser, post }: { currentUser: any; post: any }) => {
  const [deletePost, { isLoading, isSuccess, isError }] =
    useDeletePostMutation();

  async function handleDelete(id: string) {
    if (confirm("Are sure you want to delete this post")) {
      await deletePost(id);
      if (isSuccess) {
        toast.success("post deleted successfully");
      } else if (isError) {
        toast.error("something went wrong");
      }
    }
  }

  return (
    <>
      {post?.userId && (
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
            {post.userId.id === currentUser?.id && (
              <>
                <DropdownButton
                  variant="light"
                  drop="start"
                  id="dropdown-button-drop-start"
                  title="..."
                >
                  <Dropdown.Item
                    onClick={() => handleDelete(post._id)}
                    role="button"
                    disabled={isLoading}
                  >
                    {isLoading ? "deleting" : "delete"}
                  </Dropdown.Item>
                </DropdownButton>
              </>
            )}
          </div>
        </Card.Header>
      )}
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
