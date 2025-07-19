import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('currentUser');
    if (!username) return navigate('/');

    const storedUser = JSON.parse(localStorage.getItem('user_' + username));
    if (!storedUser.passwords) storedUser.passwords = [];
    setUser(storedUser);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleAddCredential = () => {
    if (!newUsername || !newPassword) return;

    const updated = { ...user };
    const newEntry = { username: newUsername.trim(), password: newPassword.trim() };

    const exists = updated.passwords.some(
      e => e.username === newEntry.username && e.password === newEntry.password
    );

    if (!exists) {
      updated.passwords.push(newEntry);
      localStorage.setItem('user_' + updated.username, JSON.stringify(updated));
      setUser(updated);
      setNewUsername('');
      setNewPassword('');
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}</h2>
      <h3>Your Saved Credentials</h3>
      <ul className="password-list">
        {user.passwords.length > 0 ? (
          user.passwords.map((entry, index) => (
            <li key={index}>
              <strong>Username:</strong> {entry.username}<br />
              <strong>Password:</strong> {entry.password}
            </li>
          ))
        ) : (
          <p>No saved credentials yet.</p>
        )}
      </ul>

      <div className="add-password">
        <h4>Add New Credential</h4>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleAddCredential}>Add</button>
      </div>

      <button className="logout-button" onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
