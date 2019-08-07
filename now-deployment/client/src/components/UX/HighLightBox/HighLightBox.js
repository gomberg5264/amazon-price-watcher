import React, { useState, useEffect } from 'react';

import './HighLightBox.scss';

const HighLightBox = ({
  productId,
  setCurrentProductId,
  isFocussed,
  children
}) => {
  const handleClick = id => {
    setCurrentProductId(id);
  };

  return (
    <div
      onClick={() => handleClick(productId)}
      className={'highlight-box ' + (isFocussed ? 'activate' : null)}
    >
      {children}
    </div>
  );
};

export default HighLightBox;
