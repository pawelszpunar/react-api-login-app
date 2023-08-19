import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './../context/AuthProvider';
import { setToken } from '../service/tokenService';

import axios from './../api/axios';
const LOGIN_URL = '/api/create_token';

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const token = response?.data?.token;
      setToken(token);
      setAuth({ username, password, token });
      console.log(JSON.stringify(response?.data));

      setUsername('');
      setPassword('');
      setSuccess(true);
    } catch (e) {
      if (!e?.response) {
        setErrorMsg('No response from the server.');
      } else if (e.response?.status === 400) {
        setErrorMsg('Username or passwors are missing');
      } else if (e.response?.status === 401) {
        setErrorMsg('Unauthorized');
      } else {
        setErrorMsg('Login failed. Try again later.');
      }
      errorRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <div className='login-form'>
          <h2>You are logged in!</h2>
          Go to <Link to='/dashboard'>Dashboard</Link>
        </div>
      ) : (
        <div className='login-form'>
          <form onSubmit={handleSubmit}>
            <p
              ref={errorRef}
              className={
                errorMsg ? 'alert alert-danger' : 'alert alert-danger hide-me'
              }
              aria-live='assertive'
            >
              {errorMsg}
            </p>
            <h2 className='text-center'>Log in</h2>
            <div className='form-outline mb-4'>
              <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='form-control'
                ref={usernameRef}
                autoComplete='off'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className='form-outline mb-4'>
              <label className='form-label' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='form-control'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            {isLoading ? (
              <button className='btn btn-primary btn-block mb-4' disabled>
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Loading...</span>
                &nbsp;&nbsp;Loading
              </button>
            ) : (
              <button
                className='btn btn-primary btn-block mb-4'
                disabled={!username || !password}
              >
                Login
              </button>
            )}
            <div className='text-center'>
              <p>
                Not a member? <Link to='/register'>Register</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
