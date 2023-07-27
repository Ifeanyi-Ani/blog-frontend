import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { fetchUsers } from "../redux/user/user.action";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";

const CardInfo: React.FC<{} & ReduxProps> = function ({ fetchUsers, data }) {
  useEffect(() => {
    fetchUsers();
  }, []);
  const getRandomUsers = () => {
    // If data is available and contains users, shuffle the users and get a random subset
    if (data && data?.data?.user?.length > 0) {
      const shuffledUsers = data.data.user.sort(() => 0.5 - Math.random());
      const randomSubset = shuffledUsers.slice(0, 5); // Get a random subset of 2 users
      return randomSubset;
    }

    // If data is not available or doesn't contain users, return an empty array
    return [];
  };

  const randomUsers = getRandomUsers();
  const renderData = (
    avatar: string,
    username: string,
    id: string
  ): JSX.Element => {
    return (
      <ListGroupItem
        className='mySecondaryb border-0 d-flex justify-content-between align-items-center p-0'
        key={id}
      >
        <div className='left d-flex align-items-center gap-3'>
          <div className='imgCon'>
            <img src={avatar} alt='avatar' />
          </div>
          <div className='nameCon'>
            <span className='text-light'>{username}</span> <br />
            <span style={{ color: "#acac9e" }}>{username}</span>
          </div>
        </div>
        <div className='right d-flex align-items-center gap-3'>
          <div className='act text-primary'>follow</div>
          <div className='actx'>x</div>
        </div>
      </ListGroupItem>
    );
  };
  return (
    <Card className='mySecondaryb text-light'>
      <Card.Header className='navbarbs nameCon'>Trending Blogs</Card.Header>
      <Card.Body>
        <ListGroup style={{ padding: "unset !important" }} className='gap-2'>
          {randomUsers.length > 0 ? (
            randomUsers.map(user =>
              renderData(`${user.photo}`, `${user.username}`, `${user._id}`)
            )
          ) : (
            <ListGroupItem className='mySecondaryb border-0 d-flex justify-content-between align-items-center p-0 text-white'>
              Loading...
            </ListGroupItem>
          )}
        </ListGroup>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center navbarts'>
        <Card.Link href='#' className='text-decoration-none act'>
          Show more blogs
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};
const mapStateToProps = ({ user: { data } }) => ({
  data,
});
const mapDispatchToProps = {
  fetchUsers,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(CardInfo);
