import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      toast.success('Registration Success');
    } catch (error) {
      console.log(error);
      toast.error('Registration Failed');
      setLoading(false);
    }
  };

  return (
    <div className='register-parent'>
      {loading && <Loader />}
      <div className='register-top'></div>
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
        <div className='col-md-4 z1'>
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
            <button className='my-3' onClick={register}>
              REGISTER
            </button>
            <hr />
            <Link to='/login'>Click Here To Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
