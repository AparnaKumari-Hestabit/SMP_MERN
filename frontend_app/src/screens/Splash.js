import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, [navigate]);

  return (
    <div>
      <h1>Splash Screen</h1>
      <p>Loading...</p>
    </div>
  );
};

export default Splash;