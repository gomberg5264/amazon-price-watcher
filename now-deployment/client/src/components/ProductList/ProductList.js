import React from 'react';
import { Product } from '../';

const ProductList = ({ products, onCurrentProductChange }) => {
  let index = 0;
  return (
    <div>
      {products.map(product => (
        <Product
          key={product._id}
          index={index++}
          product={product}
          onCurrentProductChange={onCurrentProductChange}
        />
      ))}
    </div>
  );
};

export default ProductList;
