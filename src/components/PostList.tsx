/* eslint-disable react-refresh/only-export-components */
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../redux/posts/posts.action";

import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";
import likeLogo from "../assets/likes.jpg";
import content1 from "../assets/content1.png";
import { Card, Stack } from "react-bootstrap";
import UserHeader from "./UserHeader";
import Avater from "./Avater";

class PostList extends React.Component {
  componentDidMount(): void {
    this.props.fetchPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <>
        {this.props.posts ? (
          [...this.props.posts.data.posts].reverse().map((post, idx) => {
            return (
              <div className='gridItem' key={idx}>
                <Avater />
                <Card>
                  <UserHeader userId={post.userId} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Img src={content1} alt='content' />
                    {post.body}
                    <Card.Text>
                      <div className='d-flex gap-1 flex-wrap'>
                        <span>#today on tumblr</span>
                        <span>#tubme</span>
                        <span>#today on tumblr</span>
                        <span>#tubme</span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer style={{ borderTop: "none" }} className='d-flex'>
                    <div
                      className='border rounded-5 d-flex justify-content-center align-items-center p-2'
                      role='button'
                    >
                      2,440 notes
                    </div>
                    <Stack
                      className='footer-img ms-auto gap-3'
                      direction='horizontal'
                    >
                      <img src={shareLogo} alt='logo' role='button' />
                      <img src={reloadLogo} alt='logo' role='button' />
                      <img src={likeLogo} alt='logo' role='button' />
                    </Stack>
                  </Card.Footer>
                </Card>
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
