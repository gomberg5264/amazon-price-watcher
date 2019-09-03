import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import './NewProductForm.scss';

import Ajax from '../../utils/Ajax';

const NewProductForm = ({ setProducts }) => {
  const [url, setUrl] = useState('');
  const [validUrl, setValidUrl] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateUrl = _url => {
    const regex = /^https:\/\/www\.amazon\.ca\/.+/g;
    if (regex.test(_url)) setValidUrl(true);
    else setValidUrl(false);
  };

  const handleChange = e => {
    e.persist();
    setUrl(e.target.value);
    validateUrl(e.target.value);
  };

  const handleSubmitUrl = async e => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await Ajax.addProduct({ url });
      if (!response) {
        throw new Error('No response');
      }
      if (response.status === 201) {
        setProducts(response.data.savedProducts);
        setError(false);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }

    setUrl('');
    setValidUrl(false);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmitUrl} className='new-product'>
      <input
        type='text'
        required
        onChange={handleChange}
        value={url}
        placeholder='Enter Amazon URL...'
        className={error ? 'warning-error' : ''}
      />
      {!isSubmitting ? (
        <button
          type='submit'
          disabled={!validUrl}
          className={validUrl ? 'valid' : ''}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      ) : (
        <div className='spinner-div'>
          <div className='rotate-center'>
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NewProductForm;
