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
      <div className='product-list-fixed'>
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
    </div>
  );
};

export default ProductList;
