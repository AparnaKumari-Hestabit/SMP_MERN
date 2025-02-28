import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePostScreen.css';
import { ToastContainer, toast } from 'react-toastify';

const EditPost = () => {
  const { state } = useLocation(); // Retrieve the state passed from navigation
  const navigate = useNavigate();

  // Extract post details from the state
  const { post } = state;

  // Initialize form fields with the post's title and content
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const token = localStorage.getItem('token');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:2032/posts/posts/${post._id}`, 
        { title, content },
        { 
            headers: { Authorization: `Bearer ${token}` }
        }
    );

      if (response.status === 200) {
        toast.success("Post updated successfully!");
        navigate('/home'); 
      }
    } catch (error) {
      toast.error("Error updating post");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Update Post</h1>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <input
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              required
            />
          </div>
          <button type="submit" className="button">Update Post</button>
        </form>
        
        <ToastContainer />
      </div>
    </div>
  );
  
};

export default EditPost;
