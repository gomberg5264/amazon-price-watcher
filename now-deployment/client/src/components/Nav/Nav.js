import React from 'react';
import { Link } from 'react-router-dom';

import { useMedia } from '../../utils/_hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './Nav.scss';

import Ajax from '../../utils/Ajax';

const Nav = () => {
  const isMobile = useMedia(['(max-width: 769px)'], [true], false);

  const handleSignOut = async () => {
    try {
      await Ajax.logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <ul className='nav-links'>
        <li className='nav-link'>
          <Link onClick={handleSignOut} to='/login'>
            {!isMobile ? (
              <span className='desktop'>SIGN OUT</span>
            ) : (
              <span className='mobile'>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
