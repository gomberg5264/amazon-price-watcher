import React from 'react';

import { useForm } from '../../utils/_hooks';

const LoginForm = callback => {
  const { values, handleChange, handleSubmit } = useForm(showValues);

  function showValues() {
    console.log(values);
  }

  return (
    <div className='login-form'>
      <h2 className='login-header'>Login Here</h2>
      <label htmlFor='text' className='email'>
        Email:
      </label>
      <input
        type='text'
        name='text'
        className='input'
        placeholder='email'
        onChange={handleChange}
        value={values.email}
        required
      />
      <label htmlFor='password' className='password'>
        Password:
      </label>
      <input
        type='password'
        name='password'
        className='input'
        onChange={handleChange}
        value={values.password}
        required
      />
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
