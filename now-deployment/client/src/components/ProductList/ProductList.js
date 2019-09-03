import React from 'react';
import { Product, NewProductForm } from '../';

import './ProductList.scss';

const ProductList = ({
  products,
  setProducts,
  currentProductId,
  setCurrentProductId
}) => {
  return (
    <div className='product-list'>
      {products.length > 0 &&
        products.map(product => (
          <Product
            key={product._id}
            product={product}
            currentProductId={currentProductId}
            setCurrentProductId={setCurrentProductId}
            setProducts={setProducts}
          />
        ))}

      {products.length < 5 && <NewProductForm setProducts={setProducts} />}
    </div>
  );
};

export default ProductList;
