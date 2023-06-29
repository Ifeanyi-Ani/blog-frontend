import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import avater from "../assets/avater.jpg";
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
                src={avater}
                alt='avater'
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
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
