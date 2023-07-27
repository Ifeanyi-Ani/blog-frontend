import React, { Component } from "react";
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
    const { posts, query } = this.props;

    const filteredPosts = posts
      ? [...posts.data.posts].reverse().filter(item => {
          if (!query) return true; // If no query, include all posts

          // Parse the post's category from string to an array of objects
          const categoryArray = JSON.parse(item.category);

          // Extract an array of tag values from the categoryArray
          const tagValues = categoryArray.map(tag => tag.value);

          // Check if any of the tagValues includes the query
          return tagValues.some(tagValue => tagValue.includes(query));
        })
      : null;

    return (
      <>
        {filteredPosts ? (
          filteredPosts.map((post, idx) => {
            return (
              <div className='gridItem' key={idx}>
                <Avater src={post?.userId?.photo} />
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
  query: state.search.query,
});

const connector = connect(mapStateToProps, { fetchPosts });

export default connector(PostList);
