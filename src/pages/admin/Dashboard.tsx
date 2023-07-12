import React from "react";
import { Card, Row, Col, Stack, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts } from "../../redux/posts/posts.action";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/user/user.action";

const Dashboard: React.FC = ({ posts, fetchPosts, fetchUsers, data }) => {
  // Fetch dashboard data from an API or Redux store
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [fetchPosts, fetchUsers]);

  return (
    <div>
      <Stack direction='horizontal' gap={3} style={{ padding: "20px" }}>
        <Card className='cardDash' role='button' as={Link} to={"/admin/posts"}>
          <Card.Body>
            <Card.Title>Total Posts</Card.Title>
            <Card.Text>{posts ? posts.results : "calculating..."}</Card.Text>
          </Card.Body>
        </Card>
        <Card className='cardDash' role='button' as={Link} to={"/admin/users"}>
          <Card.Body>
            <Card.Title>Total Users</Card.Title>
            <Card.Text>{data ? data.results : "calculating..."}</Card.Text>
          </Card.Body>
        </Card>
      </Stack>
      <Row className='dashDtx'>
        <Col md={8}>
          <div className='recentPosts'>
            <div className='cardHeader'>
              <h2>Recent Products</h2>
              <Link to='/admin/posts' className='btn'>
                View All
              </Link>
            </div>
            <table>
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
                        <td className='d-flex'>{post.userId._id}</td>
                        <td>{post.title}</td>
                        <td className='d-flex flex-wrap gap-2'>
                          {post.category
                            ? JSON.parse(post.category).map((tag, index) => (
                                <span>#{tag.label}</span>
                              ))
                            : null}
                        </td>
                      </tr>
                    ))
                ) : (
                  <div>Loading...</div>
                )}
              </tbody>
            </table>
          </div>
        </Col>
        <Col md={4}>
          <div className='recentUsers'>
            <div className='cardHeader'>
              <h2>Recent Users</h2>
            </div>

            <table>
              <tbody>
                {data ? (
                  data.data ? (
                    [...data.data.user]
                      .reverse()
                      .slice(0, 10)
                      .map(data => (
                        <tr key={data._id}>
                          <td>
                            <h4>
                              {data.username}
                              <br /> <span>{data.email}</span>
                            </h4>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td>user list is empty</td>
                    </tr>
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = ({ posts: { posts }, user: { data } }) => ({
  posts,
  data,
});
const mapDispatchToProps = {
  fetchPosts,
  fetchUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
