import React from 'react';

import { useMedia } from '../../utils/_hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './Nav.scss';

const Nav = () => {
  const isMobile = useMedia(['(max-width: 769px)'], [true], false);

  return (
    <nav>
      <div className={'hamburger ' + (!isMobile ? 'display-none' : '')}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul className={'nav-links ' + (isMobile ? 'mobile' : 'desktop')}>
        <li className='nav-link'>
          <a href='#'>EDIT ACCOUNT</a>
        </li>
        <li className='nav-link'>
          <a href='#'>SIGN OUT</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
