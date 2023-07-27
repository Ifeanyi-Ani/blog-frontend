import React, { Component, ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchPosts } from "../redux/posts/posts.action";

import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";

import Avater from "./Avater";
import PostCard from "./PostCard";

type PostListProps = ConnectedProps<typeof connector>;

class PostList extends Component<PostListProps> {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <>
        {posts ? (
          [...posts.data.posts].reverse().map((post, idx) => {
            return (
              <div className='gridItem' key={idx}>
                <Avater src={post.userId.photo} />
                <PostCard
                  userId={post.userId}
                  title={post.title}
                  body={post.body}
                  src={post.image}
                  shareLogo={shareLogo}
                  reloadLogo={reloadLogo}
                  category={post.category}
                  postId={post._id}
                  post={post}
                />
              </div>
            );
          })
        ) : (
          <div>loading</div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

const connector = connect(mapStateToProps, { fetchPosts });

export default connector(PostList);
