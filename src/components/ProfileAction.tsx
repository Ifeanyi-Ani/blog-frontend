import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import { fetchUser } from "../redux/user/user.action";
import { connect } from "react-redux";

const ProfileAction = ({ id, fetchUser, username, email }) => {
  useEffect(() => {
    fetchUser(id);
  }, []);

  return (
    <Container>
      <Stack direction='vertical' gap={2}>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <Link
            className='btnConfig text-decoration-none text-dark'
            to={`/blog/${username}`}
            role='button'
          >
            <span className='customName'>{username}</span> <br />
            <span style={{ color: "#acac9e" }}>untitled</span>
          </Link>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Posts</div>
          <div style={{ color: "#acac9e" }}>1</div>
        </div>
        {/* <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Followers</div>
          <div style={{ color: "#acac9e" }}>1</div>
        </div> */}
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <Link
            to={`/profile/${id}`}
            className='customName btnConfig text-decoration-none'
          >
            Profile
          </Link>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Drafts</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Queue</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Tumblr Blaze</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Blog settings</div>
          <div></div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Mass Post Editor</div>
        </div>
      </Stack>
    </Container>
  );
};
const mapDispatchToProps = {
  fetchUser,
};
export default connect(null, mapDispatchToProps)(ProfileAction);
