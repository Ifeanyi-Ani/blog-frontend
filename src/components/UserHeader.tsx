import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUser } from "../redux/user/user.action";
// import { fetchPost } from "../redux/posts/posts.action";

class UserHeader extends Component {
  // componentDidMount(): void {
  //   this.props.fetchUser(this.props.userId);
  // }
  render() {
    const { userId } = this.props;
    return (
      <>
        {userId ? (
          <Card.Header
            style={{
              position: "relative",
              borderBottom: "none",
              paddingLeft: "55px",
            }}
            className='cardHeader'
          >
            <span role='button'> {userId.username}</span>
            <span className='text-primary ms-1' role='button'>
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
        ) : null}
      </>
    );
  }
}

// export default connect(null, { fetchUser })(UserHeader);
export default UserHeader;
