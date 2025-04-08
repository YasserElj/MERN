import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const PostDetail = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const { getPost, current, loading, deletePost, clearCurrent } = postContext;
  const { isAuthenticated, user } = authContext;
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id);

    // Clear current post when component unmounts
    return () => {
      clearCurrent();
    };
    // eslint-disable-next-line
  }, [id]);

  if (loading || !current) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const { title, content, date, author } = current;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
      navigate('/');
    }
  };

  return (
    <Row className="justify-content-md-center mt-4">
      <Col md={10}>
        <Card className="shadow-sm">
          <Card.Header as="h5">
            {title}
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-3 text-muted">
              Posted by {author ? author.name : 'Unknown User'} on {formatDate(date)}
            </Card.Subtitle>
            <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
              {content}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center">
            <LinkContainer to="/">
              <Button variant="secondary" size="sm">
                <i className="fas fa-arrow-left"></i> Back to Posts
              </Button>
            </LinkContainer>
            {isAuthenticated && user && author && author._id === user._id && (
              <Button onClick={onDelete} variant="danger" size="sm">
                <i className="fas fa-trash"></i> Delete Post
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default PostDetail; 