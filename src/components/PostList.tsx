/* eslint-disable react-refresh/only-export-components */
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../redux/posts/posts.action";

import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";
import likeLogo from "../assets/likes.jpg";
import content1 from "../assets/content1.png";

import Avater from "./Avater";
import { PostCard } from "./PostCard";

class PostList extends React.Component {
  componentDidMount(): void {
    this.props.fetchPosts();
  }

  render() {
    return (
      <>
        {this.props.posts ? (
          [...this.props.posts.data.posts].reverse().map((post, idx) => {
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

const mapStateToProps = state => {
  return { posts: state.posts.posts };
};
export default connect(mapStateToProps, { fetchPosts })(PostList);
