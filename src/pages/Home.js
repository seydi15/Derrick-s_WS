// src/pages/Home.js
import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'iPhone 14 Pro', price: 999 },
  { id: 2, name: 'AirPods Pro', price: 249 },
  { id: 3, name: 'Samsung Galaxy S22', price: 899 },
  { id: 4, name: 'Google Pixel 7', price: 799 },
  { id: 5, name: 'OnePlus 10T', price: 749 },
];

function Home({ searchTerm = '' }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* Hero / Welcome Section */}
      <section className="hero" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Welcome to TechNest</h1>
        <p>Explore the latest in smartphones and gadgets at unbeatable prices.</p>
      </section>

      {/* Product Grid */}
      <section
        className="product-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          padding: '2rem',
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>
            No products found matching "<strong>{searchTerm}</strong>"
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
