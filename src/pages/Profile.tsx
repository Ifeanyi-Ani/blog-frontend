import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { useUpdateUserMutation } from "../features/users/userSlice";
import { toast } from "react-hot-toast";

type EditUserInput = {
  username: string;
  email: string;
  dob: string;
  photo?: any;
};

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();
  const { id } = useParams();
  const INIT_STATE: EditUserInput = {
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
        username: currentUser?.username,
        email: currentUser?.email,
        dob: currentUser?.dob.toString(),
      });
      setLoading(false); // Data fetched, set loading to false
    }
  }, [currentUser]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const id = currentUser?.id as string;

    const formData = new FormData();
    formData.append("username", user.username);
    // formData.append("password", user.password);
    // formData.append("passwordConfirm", user.passwordConfirm);
    formData.append("dob", user.dob);

    if (user.photo) {
      formData.append("photo", user.photo, user.photo.name);
    }

    await updateUser({ formData, id });
    setUser(INIT_STATE);
    if (isSuccess) {
      toast.success("user successfully updated");
    }
  }
  if (!id) {
    return <div>Loading...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="profileP">
        <Form
          className="centerForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email"
              value={user.email}
              disabled
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              value={user.dob}
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
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
              type="file"
              onChange={(e: any) =>
                setUser({ ...user, photo: e.target.files[0] })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type="submit" value="Submit" />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Profile;
