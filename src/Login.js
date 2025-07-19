import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user_' + username));
    const valid = userData?.passwords?.some(
      (entry) => entry.username === username && entry.password === password
    );

    if (valid) {
      localStorage.setItem('currentUser', username);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;
