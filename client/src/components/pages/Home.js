import React, { useState, useContext, useEffect } from 'react';
import PostContext from '../../context/post/postContext';
import Post from '../posts/Post';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';

const Home = () => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  
  const { posts, getPosts, loading, addPost } = postContext;
  const { isAuthenticated, user } = authContext;
  const { setAlert } = alertContext;

  // State for new post form
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });

  const { title, content } = newPost;

  useEffect(() => {
    if (localStorage.token) {
      authContext.loadUser();
    }
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (loading && posts.length === 0) {
    return <Spinner />;
  }

  const onChange = e => setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      setAlert('Please fill in both title and content', 'danger');
    } else {
      addPost(newPost);
      setAlert('Post Created Successfully', 'success');
      setNewPost({ title: '', content: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isAuthenticated && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create a New Post</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Post title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Write your post content here..."
                  name="content"
                  value={content}
                  onChange={onChange}
                  rows="3"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Latest Posts</h1>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts to display. Be the first to create one!</p>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 