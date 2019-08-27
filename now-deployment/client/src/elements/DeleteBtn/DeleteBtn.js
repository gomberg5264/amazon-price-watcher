import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/_helpers.scss';
import './DeleteBtn.scss';

const DeleteBtn = ({ productName, display, onDeleteProduct }) => {
  const handleClick = () => {
    if (window.confirm(`${productName} will now no longer be watched`))
      onDeleteProduct();
  };

  return (
    <button
      onClick={() => handleClick()}
      className={'cta-remove ' + (display ? 'display-block' : 'display-none')}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteBtn;
