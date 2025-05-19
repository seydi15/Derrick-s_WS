import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function UserIcon() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleIconClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setDropdownVisible((prev) => !prev);
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleIconClick}>
      <FaUserCircle size={30} color="#fff" />

      {/* Dot indicator */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: user ? 'green' : 'red',
          border: '2px solid white',
        }}
      />

      {/* Styled Dropdown */}
{dropdownVisible && user && (
  <div
    style={{
      position: 'absolute',
      top: '40px',
      right: 0,
      backgroundColor: '#fff',
      color: '#333',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '12px',
      minWidth: '160px',
      zIndex: 1000,
    }}
  >
    <p style={{ margin: '0 0 10px', fontWeight: 'bold', fontSize: '14px' }}>
      👤 {user?.username || 'Unknown'}
    </p>

    {/* ✅ Show Manage Products if user is admin */}
    {user.isAdmin && (
      <button
        onClick={() => {
          setDropdownVisible(false);
          navigate('/admin/products');
        }}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#1976d2')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#2196f3')}
      >
        Manage Products
      </button>
    )}

    <button
      onClick={handleLogout}
      style={{
        width: '100%',
        padding: '8px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.3s',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#f44336')}
    >
      Logout
    </button>
  </div>
)}

      
    </div>
  );
}

export default UserIcon;
