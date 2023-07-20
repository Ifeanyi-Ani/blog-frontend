import { Button, Stack } from "react-bootstrap";
import { SideBar } from "../components/SideBar";
import { useState } from "react";
import { connect } from "react-redux";
import CardInfo from "../components/CardInfo";
import theme from "../assets/theme.jpg";

import advert from "../assets/advert.png";
import PostList from "../components/PostList";
import CreatePostContainer from "../components/CreatePostContainer";

const Home = function ({ currentUser }) {
  const [toggle, setToggle] = useState<boolean>(false);
  function handleToggle(val: boolean) {
    setToggle(val);
  }
  return (
    <div className='d-flex justify-content-center gap-3 pt-3 homeHead'>
      <main className={`${toggle === true ? "gridView-w" : "listView-w"}`}>
        {!currentUser ? null : <CreatePostContainer user={currentUser} />}
        <Stack direction='horizontal' gap={3}>
          <Button variant='outline' className='text-light'>
            Today
          </Button>
          <Button variant='outline' className='text-light'>
            Trending
          </Button>
          <Button variant='outline' className='text-light'>
            Staff Picks
          </Button>
          <Button variant='outline' className='text-light'>
            Answer Time
          </Button>
          <Button variant='outline' className='text-light'>
            More
          </Button>

          <div className='d-flex ms-auto gap-1 view-cnt'>
            <div>
              <i
                className={`bi bi-grid-1x2-fill ${
                  toggle === true ? "actv" : ""
                }`}
                role='button'
                onClick={() => handleToggle(true)}
              ></i>
            </div>
            <div>
              <i
                className={`bi bi-distribute-vertical ${
                  toggle === false ? "actv" : ""
                }`}
                onClick={() => handleToggle(false)}
                role='button'
              ></i>
            </div>
          </div>
        </Stack>
        <div
          className={`mansoryLayout ${
            toggle == true ? "gridView" : "listView"
          }`}
        >
          <PostList />
        </div>
      </main>
      <SideBar
        cardHeader='Radar'
        header='Sponsored'
        title='Advertisement'
        Src={advert}
      >
        <CardInfo />
        <div
          className='mySecondaryb mt-3 d-flex gap-3 p-2 align-items-center'
          style={{ cursor: "pointer" }}
        >
          <div className='imgCon'>
            <img src={theme} alt='themeLogo' />
          </div>
          <div className='nameCon text-light'>Change palete</div>
        </div>
      </SideBar>
    </div>
  );
};
const mapDispatchToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});
export default connect(mapDispatchToProps)(Home);
