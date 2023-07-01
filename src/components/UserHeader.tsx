import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchPostUser } from "../redux/posts/posts.action";

class UserHeader extends Component {
  componentDidMount(): void {
    this.props.fetchPostUser(this.props.userId);
  }
  render() {
    const { user } = this.props;

    return (
      <>
        {user ? (
          <Card.Header
            style={{
              position: "relative",
              borderBottom: "none",
              paddingLeft: "55px",
            }}
            className='cardHeader'
          >
            <span role='button'> {user.name}</span>
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
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) };
};
export default connect(mapStateToProps, { fetchPostUser })(UserHeader);
