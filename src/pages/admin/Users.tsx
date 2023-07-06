import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchUsers, deleteUser } from "../../redux/user/user.action";
import { connect } from "react-redux";

const Users: React.FC = ({ fetchUsers, deleteUser }) => {
  useEffect(() => {
    fetchUsers;
  }, [fetchUsers]);
  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {user.map((data, idx) => ( */}
          <tr key={"idx"}>
            <td>{"idx + 1"}</td>
            <td>{"data.name"}</td>
            <td>{"data.phone"}</td>
            <td>{"data.email"}</td>
            <td className='buttonBx'>
              {/* <IoPencil role='button' />
                <IoTrashOutline
                  role='button'
                  // onClick={() => handleUserDel(data._id, data.name, getUsers)}
                /> */}
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </Table>
    </div>
  );
};
const mapDispatchToProps = {
  fetchUsers,
  deleteUser,
};
export default connect(null, mapDispatchToProps)(Users);
