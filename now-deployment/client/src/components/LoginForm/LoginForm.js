import React from 'react';

import { useForm } from '../../utils/_hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import './LoginForm.scss';

const LoginForm = callback => {
  const { values, handleChange, handleSubmit } = useForm(showValues);

  function showValues() {
    console.log(values);
  }

  return (
    <div className='login-form'>
      <span className='logo'>
        <FontAwesomeIcon icon={faEye} />
      </span>
      <input
        type='text'
        name='text'
        placeholder='Email'
        onChange={handleChange}
        value={values.email}
        required
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
        value={values.password}
        required
      />
      <button class='cta-login' type='submit' onClick={handleSubmit}>
        SIGN IN
      </button>
    </div>
  );
};

export default LoginForm;
