import React, { useState, useEffect } from 'react';

import { TrendIcon, DeleteBtn } from '../../elements';

import { HighLightBox } from '../UX';

import './Product.scss';

import Ajax from '../../utils/Ajax';

const Product = ({
  product,
  currentProductId,
  setCurrentProductId,
  setProducts
}) => {
  const [focussed, setFocussed] = useState(false);

  const onDeleteProduct = async () => {
    try {
      const response = await Ajax.removeProduct(product._id);
      if (response.status === 202) {
        setCurrentProductId('');
        setProducts(response.data.savedProducts);
      } else throw new Error(response);
    } catch (err) {
      alert(
        'Sorry, something prevented the product from being removed from your watch list'
      );
    }
  };

  useEffect(() => {
    if (currentProductId === product._id) setFocussed(true);
    else setFocussed(false);
  }, [currentProductId, product._id]);

  return (
    <div
      className={'product ' + (focussed ? 'selected' : null)}
      key={product._id}
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
