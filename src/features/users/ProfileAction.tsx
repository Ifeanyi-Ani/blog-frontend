import { Link } from "react-router-dom";
import { Container, Stack } from "react-bootstrap";
import { IUser } from "../../types/type";

const ProfileAction = ({ currentUser }: { currentUser: IUser }) => {
  const { id, username } = currentUser;
  return (
    <Container>
      <Stack direction="vertical" gap={2}>
        <div className="d-flex justify-content-between align-items-center nameCon">
          <Link
            className="btnConfig text-decoration-none text-dark"
            to={`/blog/${username}`}
            role="button"
          >
            <span className="customName">{username}</span> <br />
            <span style={{ color: "#acac9e" }}>untitled</span>
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center nameCon">
          <Link
            to={`/profile/${id}`}
            className="customName btnConfig text-decoration-none"
          >
            Profile
          </Link>
        </div>
      </Stack>
    </Container>
  );
};
export default ProfileAction;
