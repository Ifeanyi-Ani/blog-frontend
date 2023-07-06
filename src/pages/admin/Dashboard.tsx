import React from "react";
import { Card, Row, Col, Stack, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts } from "../../redux/posts/posts.action";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/user/user.action";

const Dashboard: React.FC = ({ posts, fetchPosts, fetchUsers }) => {
  // Fetch dashboard data from an API or Redux store
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [fetchPosts, fetchUsers]);
  // const totalPosts = 10;
  const totalUsers = 5;
  // console.log(posts.data.posts.category);

  return (
    <div>
      <h1>Overview</h1>
      <Stack direction='horizontal' gap={3}>
        <Card>
          <Card.Body>
            <Card.Title>Total Posts</Card.Title>
            <Card.Text>{posts ? posts.results : "calculating..."}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Total Users</Card.Title>
            <Card.Text>{totalUsers}</Card.Text>
          </Card.Body>
        </Card>
      </Stack>
      <Row className='dashDtx'>
        <Col md={8}>
          <div className='recentOrders'>
            <div className='cardHeader'>
              <h2>Recent Products</h2>
              <Link to='/admin/product' className='btn'>
                View All
              </Link>
            </div>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>UserId</th>
                  <th>Title</th>
                  <th>Category</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {posts ? (
                  [...posts.data.posts]
                    .reverse()
                    .slice(0, 5)
                    .map((post, index) => (
                      <tr key={post._id}>
                        <td>{index + 1}</td>
                        <td>{post.userId._id}</td>
                        <td>{post.title}</td>
                        <td>
                          {post.category
                            ? post.category.map((tag, index) => (
                                <div>
                                  <span>#{tag.label}</span>
                                </div>
                              ))
                            : null}
                        </td>
                      </tr>
                    ))
                ) : (
                  <div>Loading...</div>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md={4}>
          <div className='recentCustomers'>
            <div className='cardHeader'>
              <h2>Recent Users</h2>
            </div>

            <table>
              <tbody>
                {/* {user.length ? [...user].reverse().slice(0, 10).map((data, idx) => ( */}
                <tr key={"idx"}>
                  <td>
                    <h4>
                      data.name
                      <br /> <span>data.email</span>
                    </h4>
                  </td>
                </tr>
                {/* )) : ( */}
                <tr>
                  <td>user list is empty</td>
                </tr>
                {/* )} */}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = ({ posts: { posts } }) => ({ posts });
const mapDispatchToProps = {
  fetchPosts,
  fetchUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
