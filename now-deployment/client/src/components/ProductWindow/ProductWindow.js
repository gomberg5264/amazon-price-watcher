import React from 'react';

import { PriceBtn } from '../../elements';

import './ProductWindow.scss';

const ProductWindow = ({ currentProduct }) => {
  return (
    <div className='product-window'>
      <h3 className='title'>{currentProduct.name}</h3>
      <PriceBtn price={currentProduct.currentPrice} url={currentProduct.url} />
    </div>
  );
};

export default ProductWindow;
