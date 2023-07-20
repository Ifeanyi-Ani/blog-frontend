import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import avatar from "../assets/avater.jpg";
import { fetchUsers } from "../redux/user/user.action";
import { connect } from "react-redux";
import { useEffect } from "react";

const CardInfo = function ({ fetchUsers }) {
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Card className='mySecondaryb text-light'>
      <Card.Header className='navbarbs nameCon'>Trending Blogs</Card.Header>
      <Card.Body>
        <ListGroup style={{ padding: "unset !important" }} className='gap-2'>
          <ListGroupItem className='mySecondaryb border-0 d-flex justify-content-between align-items-center p-0'>
            <div className='left d-flex align-items-center gap-3'>
              <div className='imgCon'>
                <img src={avatar} alt='avatar' />
              </div>
              <div className='nameCon'>
                <span className='text-light'>i-ani</span> <br />
                <span style={{ color: "#acac9e" }}>i-ani</span>
              </div>
            </div>
            <div className='right d-flex align-items-center gap-3'>
              <div className='act text-primary'>follow</div>
              <div className='actx'>x</div>
            </div>
          </ListGroupItem>

          <ListGroupItem className='mySecondaryb border-0 d-flex justify-content-between align-items-center p-0'>
            <div className='left d-flex align-items-center gap-3'>
              <div className='imgCon'>
                <img src={avatar} alt='avatar' />
              </div>
              <div className='nameCon'>
                <span className='text-light'>mbazuDaniel</span> <br />
                <span style={{ color: "#acac9e" }}>mbazuDaniel</span>
              </div>
            </div>
            <div className='right d-flex align-items-center gap-3'>
              <div className='act text-primary'>follow</div>
              <div className='actx'>x</div>
            </div>
          </ListGroupItem>

          <ListGroupItem className='mySecondaryb border-0 d-flex justify-content-between align-items-center p-0'>
            <div className='left d-flex align-items-center gap-3'>
              <div className='imgCon'>
                <img src={avatar} alt='avatar' />
              </div>
              <div className='nameCon'>
                <span className='text-light'>janet</span> <br />
                <span style={{ color: "#acac9e" }}>janet</span>
              </div>
            </div>
            <div className='right d-flex align-items-center gap-3'>
              <div className='act text-primary'>follow</div>
              <div className='actx'>x</div>
            </div>
          </ListGroupItem>
          <ListGroupItem className='mySecondaryb border-0 d-flex justify-content-between align-items-center p-0'>
            <div className='left d-flex align-items-center gap-3'>
              <div className='imgCon'>
                <img src={avatar} alt='avatar' />
              </div>
              <div className='nameCon'>
                <span className='text-light'>janet</span> <br />
                <span style={{ color: "#acac9e" }}>janet</span>
              </div>
            </div>
            <div className='right d-flex align-items-center gap-3'>
              <div className='act text-primary'>follow</div>
              <div className='actx'>x</div>
            </div>
          </ListGroupItem>
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
const mapDispatchToProps = {
  fetchUsers,
};
export default connect(null, mapDispatchToProps)(CardInfo);
