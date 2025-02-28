import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // After successful signup, navigate to home
    navigate('/home');
  };

  return (
    <div>
      <h1>Signup Screen</h1>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
