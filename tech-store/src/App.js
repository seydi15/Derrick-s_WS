import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import UserIcon from './components/UserIcon'; // Import the UserIcon
import AdminProductList from './pages/AdminProductList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <Router>
      {/* Top black header */}
      <header
        className="navbar"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          className="nav-left"
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
        >
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: 'none',
              }}
            />
            <button type="submit" style={{ marginLeft: '0.5rem' }}>Search</button>
          </form>
        </div>

        <div
          className="nav-right"
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
        >
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
            Cart
          </Link>
          <UserIcon />
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/products" element={<AdminProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
