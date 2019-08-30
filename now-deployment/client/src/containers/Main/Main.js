import React, { useState, useEffect } from 'react';

import { Header, Loader } from '../../components';
import { ProductWindow, ProductList } from '../../components';

import Ajax from '../../utils/Ajax';

import './Main.scss';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Ajax.getProductsByUserId();
      setProducts(p => response.data.savedProducts);
      setLoading(false);
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
        {!loading /*&& currentProductId !== '' ? ( */ ? (
          <React.Fragment>
            {products.length > 0 && (
              <ProductWindow
                currentProduct={products.find(p => p._id === currentProductId)}
              />
            )}
            <ProductList
              products={products}
              setProducts={setProducts}
              currentProductId={currentProductId}
              setCurrentProductId={setCurrentProductId}
            />
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </React.Fragment>
  );
};

export default Main;
