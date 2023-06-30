import React, { useState, useEffect } from 'react';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`https://fakestoreapi.com/products?q=${searchTerm}`);
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    }

    return () => {
      // Cleanup function
      setProducts([]);
    };
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for products" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
            <img src={product.image} alt={product.title} height="200px" width="200px" />
              <h3>{product.name}</h3>
              <h5>{product.price}</h5>
              <p>{product.description}</p>
              {/* Render additional product details */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
