import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { SideBar } from "../components/SideBar";
import { connect } from "react-redux";

import advert from "../assets/advert.png";
import ProfileAction from "../components/ProfileAction";
import { editUser } from "../redux/user/user.action";
import { useParams } from "react-router-dom";

const Profile = ({ currentUser, editUser }) => {
  const { id } = useParams();
  const INIT_STATE = {
    username: "",
    email: "",
    dob: "",
    photo: null,
  };

  const [user, setUser] = useState(INIT_STATE);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    if (currentUser) {
      setUser({
        username: currentUser?.data?.user?.username,
        email: currentUser?.data?.user?.email,
        dob: currentUser?.data?.user?.dob,
        photo: null,
      });
      setLoading(false); // Data fetched, set loading to false
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    const id = currentUser?.data?.user?._id;
    console.log(id);
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    // formData.append("password", user.password);
    // formData.append("passwordConfirm", user.passwordConfirm);
    formData.append("dob", user.dob);
    formData.append("photo", user.photo, user.photo.name);
    await editUser(formData, id);
    setUser(INIT_STATE);
    alert("user successfully updated");
  }
  if (!id) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='profileP'>
        <Form
          className='centerForm'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <Form.Group>
            <Form.Control
              type='email'
              placeholder='Email'
              value={user.email}
              disabled
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Username'
              value={user.username}
              onChange={e => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='date'
              placeholder='Date of Birth'
              value={user.dob}
              onChange={e => setUser({ ...user, dob: e.target.value })}
            />
          </Form.Group>

          {/* <Form.Group>
            <Form.Control
              type='password'
              placeholder='Set a password'
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='password'
              placeholder='Repeat password'
              value={user.passwordConfirm}
              onChange={e =>
                setUser({ ...user, passwordConfirm: e.target.value })
              }
            />
          </Form.Group> */}
          <Form.Group>
            <Form.Control
              type='file'
              onChange={e => setUser({ ...user, photo: e.target.files[0] })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type='submit' value='Submit' />
          </Form.Group>
        </Form>

        <SideBar cardHeader='Radar' title='' header='Sponsored' Src={advert}>
          <ProfileAction
            username={currentUser?.data?.user?.username}
            email={currentUser?.data?.user?.email}
            id={currentUser?.data.user._id}
          />
        </SideBar>
      </div>
    </>
  );
};
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  // posts,
});
const mapDispatchToProps = {
  editUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
