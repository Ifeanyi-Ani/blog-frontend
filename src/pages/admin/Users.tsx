import React from "react";
import { Table } from "react-bootstrap";

const Users: React.FC = () => {
  // Fetch users data from an API or Redux store
  const users = [];

  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => ( */}
          <tr key={"user.id"}>
            <td>{"user.id"}</td>
            <td>{"user.name"}</td>
            <td>{"user.email"}</td>
            {/* Render additional columns */}
          </tr>
          {/* ))} */}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
