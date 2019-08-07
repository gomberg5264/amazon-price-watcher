import React from 'react';
import { Product } from '../';

import './ProductList.scss';

const ProductList = ({ products, currentProductId, setCurrentProductId }) => {
  return (
    <div className='product-list'>
      {products.map(product => (
        <Product
          key={product._id}
          product={product}
          currentProductId={currentProductId}
          setCurrentProductId={setCurrentProductId}
        />
      ))}
    </div>
  );
};

export default ProductList;
