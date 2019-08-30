import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import Ajax from '../../utils/Ajax';

import './LoginForm.scss';

const LoginForm = props => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);

  const handleChange = e => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    if (e) e.preventDefault();

    try {
      const response = await Ajax.login(values);
      console.log(response);
      if (response.status === 202) props.history.push('/');
      else setError(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='login-form'>
      <span className={'logo ' + (error ? 'danger-color' : '')}>
        <FontAwesomeIcon icon={faEye} />
      </span>
      <input
        type='text'
        name='email'
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
      <button className='cta-login' type='submit' onClick={handleSubmit}>
        SIGN IN
      </button>
    </div>
  );
};

export default withRouter(LoginForm);
