import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './NewProductForm.scss';

const NewProductForm = () => {
  const [url, setUrl] = useState('');

  const handleChange = e => {
    e.persist();
    setUrl(e.target.value);
  };

  const handleSubmitUrl = e => {
    e.preventDefault();
    console.log(url);
  };

  return (
    <div className='new-product'>
      <input
        type='text'
        required
        onChange={handleChange}
        value={url}
        placeholder='Enter Amazon URL...'
      />
      <button onClick={handleSubmitUrl}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default NewProductForm;
