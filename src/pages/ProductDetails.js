import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const productData = {
  1: { id: 1, name: 'iPhone 14 Pro', price: 999 },
  2: { id: 2, name: 'AirPods Pro', price: 249 },
  3: { id: 3, name: 'Samsung Galaxy S22', price: 899 },
  4: { id: 4, name: 'Google Pixel 7', price: 799 },
  5: { id: 5, name: 'OnePlus 10T', price: 749 },
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productData[id];

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="details-page">
      <div className="details-card">
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="description">This is a premium product with amazing features. Get yours now!</p>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
      <button className="back-button" onClick={handleBack}>← Back to Shop</button>
    </div>
  );
}

export default ProductDetails;
