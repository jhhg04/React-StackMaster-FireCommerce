import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  return (
    <div className='register-parent'>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <lottie-player
            src='https://assets4.lottiefiles.com/packages/lf20_yr6zz3wv.json'
            background='transparent'
            speed='1'
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className='col-md-4'>
          <div className='register-form'>
            <h2>Register</h2>
            <hr />
            <input
              className='form-control'
              placeholder='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className='form-control'
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              className='form-control'
              placeholder='confirme password'
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            <button className='my-3'>REGISTER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
