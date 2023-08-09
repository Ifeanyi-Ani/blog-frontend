import { Card, Stack } from "react-bootstrap";
import avater from "../assets/avater.jpg";

import { connect } from "react-redux";
// import { useEffect } from "react";

const CardItem = function (posts) {
  const getRandomPosts = () => {
    // If data is available and contains users, shuffle the users and get a random subset
    if (posts && posts?.posts?.data?.posts?.length > 0) {
      const shuffledPosts = posts.posts.data.posts.sort(
        () => 0.5 - Math.random()
      );
      const randomSubset = shuffledPosts.slice(0, 1); // Get a random subset of 2 users
      return randomSubset;
    }

    // If data is not available or doesn't contain users, return an empty array
    return [];
  };

  const randomPost = getRandomPosts();
  return (
    <Card>
      {randomPost.length > 0
        ? randomPost.map(post => (
            <div key={post._id}>
              <Card.Header
                style={{
                  position: "relative",
                  borderBottom: "none",
                  paddingLeft: "55px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "30px",
                    transform: "translate(-50%, -50%)",
                    width: "35px",
                    height: "35px",
                  }}
                  role='button'
                >
                  <img
                    src={post.userId.photo}
                    alt='avater'
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span role='button'>todayontumblr </span>
                <span className='text-primary' role='button'>
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
                  ...
                </div>
              </Card.Header>
              <Card.Body className='p-0' key={post._id}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Img src={post.image} alt='content' />
                <Card.Text className='ps-3 d-flex gap-1 flex-wrap'>
                  {JSON.parse(post.category).map((tag, idx) => (
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
const mapStateToProps = ({ posts: { posts } }) => ({ posts });
// const mapDispatchToProps = {
//   fetchPosts,
// };
export default connect(mapStateToProps)(CardItem);
