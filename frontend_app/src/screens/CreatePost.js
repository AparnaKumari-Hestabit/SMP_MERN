import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePostScreen.css';
import { ToastContainer, toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = { title, content };
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:2032/posts/posts', postData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Post created successfully!');
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Every post tells a story. What's yours?</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            placeholder="Title" 
            className="input"
          />
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            placeholder="Content" 
            className="textarea"
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading} className="button">
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreatePost;
