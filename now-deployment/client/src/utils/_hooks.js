import { useState, useEffect } from 'react';

// useMedia hook taken from https://usehooks.com/useMedia/

function useMedia(queries, values, defaultValue) {
  // State update function
  const match = () => {
    // Get first media query that matches
    const query = queries.findIndex(q => matchMedia(q).matches);
    // Return related value or defaultValue if none
    return values[query] || defaultValue;
  };

  // State and setter for current value
  const [value, set] = useState(match);

  useEffect(() => {
    // Update state on window resize
    // Usage of match function defined outside of useEffect ...
    // ... ensures that it has current values of arguments.
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handler);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return value;
}

// Custom hook for handling forms

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleSubmit = e => {
    if (e) e.preventDefault();
    callback();
  };

  const handleChange = e => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values
  };
};

export { useMedia, useForm };
