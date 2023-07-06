import React, { useEffect } from "react";
import reloadLogo from "../../assets/reload.jpg";
import likeLogo from "../../assets/likes.jpg";
import content1 from "../../assets/content1.png";
import shareLogo from "../../assets/share.jpg";
import { PostCard } from "../../components/PostCard";
import Avater from "../../components/Avater";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../../redux/posts/posts.action";

import { Button } from "react-bootstrap";

const Posts: React.FC = ({ posts, fetchPosts, deletePost }) => {
  useEffect(() => {
    fetchPosts();
  }, [posts]);
  function handleDelete(id) {
    deletePost(id);
    fetchPosts();
  }
  return (
    <div>
      <h1>Posts</h1>
      <div className='mansoryLayout gridView'>
        {posts ? (
          [...posts.data.posts].reverse().map((post, idx) => {
            return (
              <div className='gridItem' key={idx}>
                <Avater />
                <PostCard
                  userId={post.userId}
                  title={post.title}
                  body={post.body}
                  src={content1}
                  shareLogo={shareLogo}
                  reloadLogo={reloadLogo}
                  likeLogo={likeLogo}
                >
                  <Button
                    className='position-absolute top-0, bg-warning border-0'
                    style={{
                      right: "30px",
                      cursor: "pointer",
                      pointerEvents: "all",
                      zIndex: "1000",
                    }}
                    onClick={() => handleDelete(post._id)}
                  >
                    <i className='bi bi-trash-fill'></i>
                  </Button>
                </PostCard>
              </div>
            );
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ posts: { posts } }) => ({ posts });
const mapDispatchToProps = {
  fetchPosts,
  deletePost,
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
