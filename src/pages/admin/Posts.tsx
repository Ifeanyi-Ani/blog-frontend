import React, { useEffect } from "react";
import reloadLogo from "../../assets/reload.jpg";
import likeLogo from "../../assets/likes.jpg";
import content1 from "../../assets/content1.png";
import shareLogo from "../../assets/share.jpg";
import PostCard from "../../components/PostCard";
import Avater from "../../components/Avater";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../../redux/posts/posts.action";

import { Button } from "react-bootstrap";

const Posts: React.FC = ({ posts, fetchPosts, deletePost }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  // async function handleDelete(id, cb) {
  //   if (confirm("Are sure you want to delete this post")) {
  //     await deletePost(id);
  //     cb();
  //   }
  // }
  return (
    <div>
      <h1>Posts</h1>
      <div className='mansoryLayout gridView'>
        {posts ? (
          posts.data.posts.length ? (
            [...posts.data.posts].reverse().map((post, idx) => {
              return (
                <div className='gridItem' key={idx}>
                  <Avater
                    src={`https://tumblr-bkend.onrender.com/img/users/${post.userId.photo}`}
                  />

                  <PostCard
                    userId={post.userId}
                    title={post.title}
                    body={post.body}
                    src={`https://tumblr-bkend.onrender.com/img/posts/${post.image}`}
                    shareLogo={shareLogo}
                    reloadLogo={reloadLogo}
                    category={post.category}
                    postId={post._id}
                    post={post}
                  >
                    {/* <Button
                      className='position-absolute top-0, bg-warning border-0'
                      style={{
                        right: "30px",
                        cursor: "pointer",
                        pointerEvents: "all",
                        zIndex: "1000",
                      }}
                      onClick={() => handleDelete(post._id, fetchPosts)}
                    >
                      <i className='bi bi-trash-fill'></i>
                    </Button> */}
                  </PostCard>
                </div>
              );
            })
          ) : (
            <div>No user have created a post yet</div>
          )
        ) : (
          <div>post is loading</div>
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
