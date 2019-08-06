import React, { useState, useEffect } from 'react';

import './Product.scss';

const Product = ({ index, product, onCurrentProductChange }) => {
  const handleFocus = id => {
    onCurrentProductChange(id);
  };

  return (
    <div
      className='product'
      key={product._id}
      onClick={() => handleFocus(index)}
    >
      {product.name}
    </div>
  );
};

export default Product;
