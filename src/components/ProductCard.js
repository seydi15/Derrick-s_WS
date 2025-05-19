// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ id, name, price }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price });
  };

  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to={`/product/${id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
