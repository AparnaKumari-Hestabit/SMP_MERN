import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
  
    if (!token) {
      setError('Unauthorized access. Please log in first.');
      navigate('/login');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:2032/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again.');
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:2032/posts/posts/${postId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted");
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Error deleting post");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:2032/users/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    localStorage.removeItem('token');
    navigate('/login');
    } catch (error) {
      setError('Failed to logout. Please try again.');
    }
  };

  return (
    <div className="home-screen">
      {/* Header / App Bar */}
      <div className="header">
  <span>BlogHub</span>
  <span className="logout-icon" onClick={handleLogout}>
    <FontAwesomeIcon icon={faSignOutAlt} />
  </span>
</div>

      <h3>Your thoughts, your stories—all in one place!</h3>

      {/* Floating Button */}
      <Link to="/createPost">
        <div className="floating-button">
          <span className="button-text">+</span>
        </div>
      </Link>

      {error && <p className="error-message">{error}</p>}

      <div className="posts-container">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="icon-container">
              <FontAwesomeIcon
                icon={faEdit}
                className="icon edit-icon"
                title="Edit"
                onClick={() => navigate(`/editPost/${post._id}`, { state: { post } })}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="icon delete-icon"
                title="Delete"
                onClick={() => handleDelete(post._id)}
              />
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Home;
