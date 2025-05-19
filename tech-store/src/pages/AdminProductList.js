import React, { useEffect, useState } from 'react';

function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products') // Adjust route if needed
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="admin-product-page">
      <h2>Manage Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>${prod.price}</td>
              <td>{prod.brand}</td>
              <td>
                <button>Edit</button>
                <button style={{ marginLeft: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductList;
