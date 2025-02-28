import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    const userData = { username, email, password };

    try {
      const response = await fetch('http://localhost:2032/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred, please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        {successMessage && <div style={styles.success}>{successMessage}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.formContent}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
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
          <button type="submit" style={styles.button}>Register</button>
        </form>

        <p style={styles.text}>
          Already have an account?  
          <span style={styles.link} onClick={() => navigate('/login')}>
            Log in
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
  success: {
    color: 'green',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default Register;