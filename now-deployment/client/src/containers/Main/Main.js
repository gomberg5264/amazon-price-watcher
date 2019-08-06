import React, { useState, useEffect } from 'react';

import { Header, Loader } from '../../components';
import { ProductWindow, ProductList } from '../../components';

import Ajax from '../../utils/Ajax';

import './Main.scss';

const Main = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Ajax.getAllProducts();
      console.log(response.data);
      setProducts(p => response.data);
    }

    fetchData();
  }, []);

  const onCurrentProductChange = productId => {
    if (productId >= 0 && productId < products.length)
      setCurrentProduct(productId);
  };

  return (
    <React.Fragment>
      <Header />
      <div className='content'>
        {products.length > 0 ? (
          <ProductWindow currentProduct={products[currentProduct]} />
        ) : (
          <Loader />
        )}
        <ProductList
          products={products}
          onCurrentProductChange={onCurrentProductChange}
        />
      </div>
    </React.Fragment>
  );
};

export default Main;
