import React, { useState, useEffect } from 'react';

import { TrendIcon, DeleteBtn } from '../../elements';

import { HighLightBox } from '../UX';

import Ajax from '../../utils/Ajax';

import './Product.scss';

const Product = ({ product, currentProductId, setCurrentProductId }) => {
  const [focussed, setFocussed] = useState(false);

  const onDeleteProduct = () => {
    alert(product._id);
  };

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
        <TrendIcon trend={product.priceChange} onSale={product.onSale} />

        <div className='text'>
          <p className='short-name'>{product.name}</p>
          <p className='price'>$ {product.currentPrice}</p>
        </div>
      </HighLightBox>
      <DeleteBtn
        productName={product.name}
        onDeleteProduct={onDeleteProduct}
        display={focussed}
      />
    </div>
  );
};

export default Product;
