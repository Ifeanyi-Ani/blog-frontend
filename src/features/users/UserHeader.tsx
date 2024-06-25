import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useDeletePostMutation } from "../posts/postSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SpinnerCircle } from "../../ui/SpinnerCircle";

const UserHeader = ({ currentUser, post }: { currentUser: any; post: any }) => {
  const [deletePost, { isLoading, isSuccess, isError }] =
    useDeletePostMutation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  async function handleDelete(id: string) {
    if (confirm("Are sure you want to delete this post")) {
      await deletePost(id);
    }
  }
  useEffect(() => {
    if (isLoading) {
      <SpinnerCircle />;
    } else if (isSuccess) {
      navigate("/");
      toast.success("post deleted successfully");
    } else if (isError) {
      toast.error("something went wrong");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      {post?.userId && (
        <Card.Header className="border-none pl-4">
          <span role="button"> {post.userId.username}</span>
          <span className="text-blue-500 ms-1" role="button">
            follow
          </span>
          <div
            role="button"
            className="flex justify-center items-center text-sm absolute top-2/4 right-1 transform -translate-x-2/4 -translate-y-2/4"
          >
            {post.userId.id === currentUser?.id &&
              pathname === `/post/${post._id}` && (
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

export default UserHeader;
