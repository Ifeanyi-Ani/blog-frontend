import React, { useEffect } from "react";
import reloadLogo from "../../assets/reload.jpg";
import shareLogo from "../../assets/share.jpg";
import PostCard from "../../components/PostCard";
import Avater from "../../components/Avater";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../../redux/posts/posts.action";

const Posts: React.FC = ({ posts, fetchPosts }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <div>
      <h1>Posts</h1>
      <div className="mansoryLayout gridView">
        {posts ? (
          posts.data.posts.length ? (
            [...posts.data.posts].reverse().map((post, idx) => {
              return (
                <div className="gridItem" key={idx}>
                  <Avater src={post.userId.photo} />

                  <PostCard
                    shareLogo={shareLogo}
                    reloadLogo={reloadLogo}
                    post={post}
                  ></PostCard>
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
