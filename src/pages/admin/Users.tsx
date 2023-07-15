import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/user/user.action";
import { RootState } from "../../redux";

interface UsersProps {
  data: {
    data: {
      user: {
        _id: string;
        username: string;
        role: string;
        email: string;
      }[];
    };
  };
  fetchUsers: () => void;
  deleteUser: (id: string) => void;
}

const Users: React.FC<UsersProps> = ({ data, fetchUsers, deleteUser }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function handleDelete(id: string, cb: () => void) {
    if (confirm("Are you sure you want to delete this user")) {
      await deleteUser(id);
      cb();
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered className='ttable'>
        <thead className='theader'>
          <tr>
            <th>S/N</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.data && data.data.user ? (
            data.data.user.length ? (
              [...data.data.user].reverse().map((userData, idx) => (
                <tr key={userData._id}>
                  <td>{idx + 1}</td>
                  <td>{userData.username}</td>
                  <td>{userData.role}</td>
                  <td>{userData.email}</td>
                  <td className='buttonBx'>
                    <i
                      className='bi bi-trash-fill'
                      role='button'
                      onClick={() => handleDelete(userData._id, fetchUsers)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>There are no registered users...</td>
              </tr>
            )
          ) : (
            <tr>
              <td>Loading users...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({ data: state.user.data });
const mapDispatchToProps = {
  fetchUsers,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
