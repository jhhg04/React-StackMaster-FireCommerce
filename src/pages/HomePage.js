import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import fireDB from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fireproducts } from '../data/firecommerce-products';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductsData();
  }, []);

  async function getProductsData() {
    try {
      setLoading(true);
      const products = await getDocs(collection(fireDB, 'products'));
      const productsArray = [];
      products.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  /*  
  async function addData() {
    try {
      await addDoc(collection(fireDB, 'users'), { name: 'Arley', age: 23 });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      const users = await getDocs(collection(fireDB, 'users'));
      const usersArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        usersArray.push(obj);
      });
      console.log(usersArray);
    } catch (error) {
      console.log(error);
    }
  }

  function addProductsData() {
      fireproducts.map(async (product) => {
          try {
              await addDoc(collection(fireDB, 'products'), product);
            } catch (error) {
                console.log(error);
            }
        });
    }
  */

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='row'>
          {products.map((product) => {
            return (
              <div className='col-md-4' key={product.id}>
                <div className='m-2 p-1 product position-relative'>
                  <div className='product-content'>
                    <p>{product.name}</p>
                    <div className='text-center'>
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className='product-img'
                      />
                    </div>
                  </div>
                  <div className='product-actions'>
                    <h2>{product.price} $</h2>
                    <div className='d-flex'>
                      <button
                        className='mx-2'
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                      <button
                        className='mx-2'
                        onClick={() => {
                          navigate(`/productinfo/${product.id}`);
                        }}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <button onClick={addData}>add data to Firebase</button>
      <button onClick={addProductsData}>add data in json to Firebase</button>
      <button onClick={getUserData}>get data User from Firebase</button>
      <button onClick={getProductsData}>get data Products from Firebase</button> */}
    </Layout>
  );
}

export default HomePage;
