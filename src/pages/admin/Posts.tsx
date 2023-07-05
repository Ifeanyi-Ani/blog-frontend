import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Posts: React.FC = () => {
  // Fetch posts data from an API or Redux store
  const posts = [
    {
      id: 1,
      title: "Post 1",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Post 2",
      author: "Jane Smith",
    },
    // Add more posts as needed
  ];

  return (
    <div>
      <h1>Posts</h1>
      <Row>
        {posts.map(post => (
          <Col key={post.id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  {post.author}
                </Card.Subtitle>
                {/* Add more details as needed */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Posts;
