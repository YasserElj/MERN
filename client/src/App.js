import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import AppNavbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreatePost from './components/posts/CreatePost';
import PostDetail from './components/posts/PostDetail';
import NotFound from './components/pages/NotFound';

// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PostState from './context/post/PostState';

// Utils
import setAuthToken from './utils/setAuthToken';

// Set token on initial app load
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Move the logic to a component that can have useEffect
  return (
    <AuthState>
      <PostState>
        <AlertState>
          <Router>
            <AppInitializer />
            <div className="App">
              <AppNavbar />
              <Container className="mt-4">
                <Alerts />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/posts/new" element={<CreatePost />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Container>
            </div>
          </Router>
        </AlertState>
      </PostState>
    </AuthState>
  );
};

// Initializer component to load the user on app startup
const AppInitializer = () => {
  const authContext = React.useContext(require('./context/auth/authContext').default);

  useEffect(() => {
    if (localStorage.token) {
      console.log('App initializing: Loading user from token');
      authContext.loadUser();
    }
    // eslint-disable-next-line
  }, []);

  return null; // This component doesn't render anything
};

export default App; 