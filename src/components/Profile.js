import React from 'react';

function Profile() {
  const user = {
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail'),
    id: localStorage.getItem('userId'),
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5">
      <h2>Профиль</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>
      <button className="btn btn-danger" onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Profile;
