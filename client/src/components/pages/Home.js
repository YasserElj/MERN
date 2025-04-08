import React, { useContext, useEffect } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import PostItem from '../posts/PostItem';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const { posts, getPosts, loading } = postContext;

  useEffect(() => {
    if (localStorage.token) {
      authContext.loadUser();
    }
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (loading && posts.length === 0) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Row>
      <Col md={12}>
        <h1 className="mb-4">Latest Posts</h1>
        {posts.length === 0 ? (
          <p>No posts to display. Be the first to create one!</p>
        ) : (
          <div>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home; 