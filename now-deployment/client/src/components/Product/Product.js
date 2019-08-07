import React, { useState, useEffect } from 'react';

import { TrendIcon, DeleteBtn } from '../';

import { HighLightBox } from '../UX';

import './Product.scss';

const Product = ({ product, currentProductId, setCurrentProductId }) => {
  const [focussed, setFocussed] = useState(false);

  useEffect(() => {
    if (currentProductId === product._id) setFocussed(true);
    else setFocussed(false);
  }, [currentProductId, product._id]);

  return (
    <div
      className={'product ' + (focussed ? 'selected' : null)}
      key={product._id}
      // onClick={() => handleFocus(index)}
    >
      <HighLightBox
        isFocussed={focussed}
        productId={product._id}
        setCurrentProductId={setCurrentProductId}
      >
        {/* CHILDREN */}
        <TrendIcon trend={product.priceChange} />

        <div className='text'>
          <p className='short-name'>{product.name}</p>
          <p className='price'>$ {product.currentPrice}</p>
        </div>
      </HighLightBox>
      <DeleteBtn display={focussed} />
    </div>
  );
};

export default Product;
