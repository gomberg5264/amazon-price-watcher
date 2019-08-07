import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import './Background.scss';

const Background = () => {
  return (
    <React.Fragment>
      <span className='big-eye'>
        <FontAwesomeIcon icon={faEye} />
      </span>
      <span className='small-eye'>
        <FontAwesomeIcon icon={faEye} />
      </span>
    </React.Fragment>
  );
};

export default Background;
