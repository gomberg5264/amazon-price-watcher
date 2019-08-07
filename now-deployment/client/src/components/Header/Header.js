import React from 'react';

import { Nav } from '../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className='logo-container'>
        <span className='eye-icon'>
          <FontAwesomeIcon icon={faEye} />
        </span>
        <h4 className='logo'>Amazon Price Watcher</h4>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
