import React, { useState, useEffect } from 'react';

import { Header, Loader } from '../../components';
import { ProductWindow, ProductList } from '../../components';

import Ajax from '../../utils/Ajax';

import './Main.scss';

const Main = () => {
  const [currentProductId, setCurrentProductId] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Ajax.getAllProducts();
      console.log(response.data);
      setProducts(p => response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) setCurrentProductId(products[0]._id);
  }, [products]);

  return (
    <React.Fragment>
      <Header />
      <div className='content'>
        {products.length > 0 && currentProductId !== '' ? (
          <ProductWindow
            currentProduct={products.find(p => p._id === currentProductId)}
          />
        ) : (
          <Loader />
        )}
        <ProductList
          products={products}
          currentProductId={currentProductId}
          setCurrentProductId={setCurrentProductId}
        />
      </div>
    </React.Fragment>
  );
};

export default Main;
