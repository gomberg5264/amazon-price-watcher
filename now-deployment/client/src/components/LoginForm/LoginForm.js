import React, { useState, useEffect } from 'react';

const LoginForm = callback => {
  return (
    <div className='login-form'>
      <h2 className='login-header'>Login Here</h2>
      <label htmlFor='text' className='email'>
        Email:{' '}
      </label>
      <input type='text' className='text' placeholder='email' />
      <label htmlFor='password' className='password'>
        Password:{' '}
      </label>
      <input type='password' className='password' />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};

export default LoginForm;
