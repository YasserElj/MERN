import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const CreatePost = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { addPost } = postContext;
  const { isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setAlert('Please log in to create a post', 'danger');
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, navigate]);

  const [post, setPost] = useState({
    title: '',
    content: ''
  });

  const { title, content } = post;

  const onChange = e => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      setAlert('Please fill in both title and content', 'danger');
    } else {
      addPost(post);
      setAlert('Post Created Successfully', 'success');
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={8}>
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4">Create New Post</h1>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Write your post content here..."
                  name="content"
                  value={content}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Create Post
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreatePost; 