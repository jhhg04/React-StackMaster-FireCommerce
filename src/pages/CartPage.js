import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: product });
  };

  const placeholder = () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };
    console.log(addressInfo);
  };

  return (
    <Layout>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height='80' width='80' />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='d-flex justify-content-end'>
        <h1 className='total-amount'>Total Amount = {totalAmount} $</h1>
      </div>
      <div className='d-flex justify-content-end mt-3'>
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <div className='register-form'>
            <h2>Register</h2>
            <hr />
            <input
              className='form-control'
              placeholder='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className='form-control'
              placeholder='address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              className='form-control'
              placeholder='pin Code'
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
            <input
              className='form-control'
              placeholder='phone Number'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeholder}>Order</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
