import { Card } from "react-bootstrap";
import { useGetPostsQuery } from "./postSlice";
import { IPost } from "../../types/type";

const CardItem = function () {
  const { data: posts } = useGetPostsQuery(null);

  const getRandomPosts = () => {
    if (posts && posts?.posts?.data?.posts?.length > 0) {
      const shuffledPosts = posts.posts.data.posts.sort(
        () => 0.5 - Math.random(),
      );
      const randomSubset = shuffledPosts.slice(0, 1); // Get a random subset of 2 users
      return randomSubset;
    }

    return [];
  };

  const randomPost = getRandomPosts();
  return (
    <Card>
      {randomPost.length > 0
        ? randomPost.map((post: IPost) => (
            <div key={post._id}>
              <Card.Header className="relative border-b-0 pl-14">
                <div
                  className="absolute top-2/4 left-7 w-[35px] transform -translate-x-2/4 -translate-y-2/4"
                  role="button"
                >
                  <img
                    src={post.userId.photo}
                    alt="avater"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span role="button">today on tumblr </span>
                <span className="text-primary" role="button">
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
                  ...
                </div>
              </Card.Header>
              <Card.Body className="p-0" key={post._id}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Img src={post.image} alt="content" />
                <Card.Text className="ps-3 d-flex gap-1 flex-wrap">
                  {post.category.map((tag, idx) => (
                    <span key={idx}>#{tag.label}</span>
                  ))}
                </Card.Text>
              </Card.Body>
            </div>
          ))
        : null}
    </Card>
  );
};
export default CardItem;
