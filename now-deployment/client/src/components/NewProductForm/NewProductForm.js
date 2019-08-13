import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './NewProductForm.scss';

const NewProductForm = () => {
  return (
    <div className='new-product'>
      <input type='text' required placeholder='Add Amazon URL...' />
      <button>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default NewProductForm;
