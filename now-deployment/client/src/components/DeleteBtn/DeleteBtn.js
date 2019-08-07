import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/_helpers.scss';
import './DeleteBtn.scss';

const DeleteBtn = ({ display }) => {
  return (
    <button
      className={'cta-remove ' + (display ? 'display-block' : 'display-none')}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteBtn;
