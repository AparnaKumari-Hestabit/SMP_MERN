import React, { useState, useEffect } from 'react';
import { fetchPosts, createPost, updatePost, deletePost } from './api';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import CreatePostScreen from './screens/CreatePost';
import EditPost from './screens/EditPost';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createPost" element={<CreatePostScreen />}/>
        <Route path="/editPost/:id" element={<EditPost />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}


export default App;