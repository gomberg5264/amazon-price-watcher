import React from 'react';
import { Product, NewProductForm } from '../';

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

      {products.length < 6 && <NewProductForm />}
    </div>
  );
};

export default ProductList;
