import { Container } from "react-bootstrap";

import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";
import advert from "../assets/advert.png";
import { SideBar } from "../components/SideBar";
import ProfileAction from "../components/ProfileAction";
import Avater from "../components/Avater";
import CreatePostContainer from "../components/CreatePostContainer";
import { connect } from "react-redux";
import { fetchPosts } from "../redux/posts/posts.action";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Preview = ({ currentUser, fetchPosts, posts }) => {
  const [data, setData] = useState();
  const [initialLoad, setInitialLoad] = useState(true); // New state variable

  useEffect(() => {
    if (initialLoad) {
      fetchPosts();
      setInitialLoad(false);
    }

    const filterPosts = posts?.data?.posts?.filter(
      (post) => post?.userId._id === currentUser?.data?.user._id,
    );
    setData(filterPosts);
  }, [initialLoad, fetchPosts, posts, currentUser]);

  return (
    <div className="d-flex justify-content-center gap-3 pt-3">
      <main className="listView-w">
        <CreatePostContainer user={currentUser} />
        <Container className="mansoryLayout listView">
          {currentUser
            ? data
              ? data.map((post) => (
                  <div className="gridItem" key={post._id}>
                    <Avater src={post?.userId?.photo} />
                    <PostCard
                      shareLogo={shareLogo}
                      reloadLogo={reloadLogo}
                      post={post}
                    />
                  </div>
                ))
              : "You have not post anything yet"
            : "Fetching user"}
        </Container>
      </main>
      <SideBar cardHeader="Radar" title="" header="Sponsored" Src={advert}>
        <ProfileAction
          username={currentUser?.data?.user?.username}
          email={currentUser?.data?.user?.email}
          id={currentUser?.data?.user?._id}
        />
      </SideBar>
    </div>
  );
};
const mapStateToProps = ({ auth: { currentUser }, posts: { posts } }) => ({
  currentUser,
  posts,
});
const mapDispatchToProps = {
  fetchPosts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Preview);
