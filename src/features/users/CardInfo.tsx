import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { IUser } from "../../types/type";
import { useGetUsersQuery } from "./userSlice";
import { SpinnerCircle } from "../../ui/SpinnerCircle";

const CardInfo = function () {
  let content: JSX.Element | null = null;

  const { data: users, isLoading, error } = useGetUsersQuery(null);

  const getRandomUsers = (item: IUser[]): IUser[] => {
    if (item && item.length > 0) {
      const shuffledUsers = [...item].sort(() => 0.5 - Math.random());
      const randomSubset = shuffledUsers.slice(0, 5);
      return randomSubset;
    }

    return [];
  };

  const randomUsers = getRandomUsers(users as IUser[]);
  const renderData = (
    avatar: string,
    username: string,
    id: string,
  ): JSX.Element => {
    return (
      <ListGroupItem
        className="mySecondaryb border-0 d-flex justify-content-between align-items-center p-0"
        key={id}
      >
        <div className="left d-flex align-items-center gap-3">
          <div className="imgCon">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="nameCon">
            <span className="text-light">{username}</span> <br />
            <span style={{ color: "#acac9e" }}>{username}</span>
          </div>
        </div>
        <div className="right d-flex align-items-center gap-3">
          <div className="act text-primary">follow</div>
          <div className="actx">x</div>
        </div>
      </ListGroupItem>
    );
  };

  if (isLoading) {
    content = (
      <div>
        <SpinnerCircle />
      </div>
    );
  } else if (error) {
    if ("status" in error) {
      content = (
        <div>{"error" in error ? error.error : JSON.stringify(error.data)}</div>
      );
    } else {
      content = <div>{error?.message}</div>;
    }
  } else if (users) {
    content = (
      <>
        <Card className="mySecondaryb text-light">
          <Card.Header className="navbarbs nameCon">Trending Blogs</Card.Header>

          <Card.Body>
            <ListGroup
              style={{ padding: "unset !important" }}
              className="gap-2"
            >
              {randomUsers.length > 0 ? (
                randomUsers.map((user) =>
                  renderData(`${user.photo}`, `${user.username}`, `${user.id}`),
                )
              ) : (
                <ListGroupItem className="mySecondaryb border-0 d-flex justify-content-between align-items-center p-0 text-white">
                  No user found
                </ListGroupItem>
              )}
            </ListGroup>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-center navbarts">
            <Card.Link href="#" className="text-decoration-none act">
              Show more blogs
            </Card.Link>
          </Card.Footer>
        </Card>
      </>
    );
  }

  return content;
};
export default CardInfo;
