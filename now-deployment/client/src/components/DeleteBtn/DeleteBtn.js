import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './DeleteBtn.scss';

const DeleteBtn = () => {
  return (
    <button className='cta-remove'>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteBtn;
