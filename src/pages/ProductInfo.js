import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import fireDB from '../firebaseConfig';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';

function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getProductsData();
  }, []);

  async function getProductsData() {
    try {
      setLoading(true);

      const productTemp = await getDoc(
        doc(fireDB, 'products', params.productid)
      );
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            {product && (
              <div className='text-center'>
                <p>
                  <b> {product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className='product-info-img'
                />
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end my-3'>
                  <button>ADD TO CART</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
