import React from 'react';

const PriceBtn = ({ price }) => {
  return (
    <button className='cta-price'>
      <img className='white-svg svg' src='./img/amazon-brands.svg' alt='' />
      <span className='price'>$ {price}</span>
    </button>
  );
};

export default PriceBtn;
