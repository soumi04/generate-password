import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!%*?&';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const existingUser = localStorage.getItem('user_' + username);
    if (existingUser) {
      alert('Username already exists');
      return;
    }

    const userData = {
      username,
      passwords: [
        { username, password }
      ]
    };

    localStorage.setItem('user_' + username, JSON.stringify(userData));
    alert('Signup successful! Please login.');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={generatePassword}>Generate Strong Password</button>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Signup;
