import React from 'react';
import { Link } from 'react-router-dom';

import { useMedia } from '../../utils/_hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './Nav.scss';

const Nav = () => {
  const isMobile = useMedia(['(max-width: 769px)'], [true], false);

  const handleSignOut = () => {
    console.log('Logged out.... jk.... unless');
  };

  return (
    <nav>
      <div className={'hamburger ' + (!isMobile ? 'display-none' : '')}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul className={'nav-links ' + (isMobile ? 'mobile' : 'desktop')}>
        <li className='nav-link'>
          <Link to='/'>SIGN OUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
