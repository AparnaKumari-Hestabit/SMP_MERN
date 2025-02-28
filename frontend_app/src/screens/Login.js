import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2032/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Log in</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.formContent}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Log in</button>
        </form>

        <p style={styles.text}>
          Don't have an account?  
          <span 
            style={styles.link} 
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  form: {
    textAlign: 'center',
    padding: '25px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '350px',
    maxWidth: '90%',
    boxSizing: 'border-box',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  heading: {
    color: '#2c3e50',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5dade2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  text: {
    marginTop: '15px',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    cursor: 'pointer',
    marginLeft: '5px',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Login;
