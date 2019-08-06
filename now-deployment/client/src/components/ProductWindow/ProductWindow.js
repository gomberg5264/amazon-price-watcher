import React from 'react';

import { PriceBtn } from '../';

import './ProductWindow.scss';

const ProductWindow = ({ currentProduct }) => {
  return (
    <div className='product-window'>
      <h3 className='title'>{currentProduct.name}</h3>
      <PriceBtn price={currentProduct.currentPrice} />
    </div>
  );
};

export default ProductWindow;
