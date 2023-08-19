import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import axios from './../api/axios';
const REGISTER_URL = '/api/users';

const Register = () => {
  //const salt = bcrypt.genSaltSync(10);

  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordMatch, setPasswordMatch] = useState('');
  const [validMatch, setValidMatch] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [username, password, passwordMatch]);

  useEffect(() => {
    setValidMatch(password === passwordMatch);
  }, [password, passwordMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const hashedPassword = bcrypt.hashSync(
        password,
        '$2a$10$CwTycUXWue0Thq9StjUM0u'
      );
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password: hashedPassword }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      setUsername('');
      setPassword('');
      setSuccess(true);

    } catch (e) {
      if (!e?.response) {
        setErrorMsg('No response from the server.');
      } else if (e.response?.status === 409) {
        setErrorMsg('Username is already taken');
      } else if (e.response?.status === 401) {
        setErrorMsg('Invalid credentials. Probably username is already taken.');
      } else {
        setErrorMsg('Registration failed.');
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
          <h2>You are registered!</h2>
          Go to <Link to='/login'>Login</Link>
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
            <h2 className='text-center'>Register</h2>
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
                required
              />
            </div>
            <div className='form-outline mb-4'>
              <label className='form-label' htmlFor='confirm_password'>
                Confirm password
              </label>
              <input
                type='password'
                id='confirm_password'
                className='form-control'
                onChange={(e) => setPasswordMatch(e.target.value)}
                value={passwordMatch}
                required
              />
              {!validMatch ? (
                <small id='passwordHelp' className='text-danger'>
                  Passwords doesn't match
                </small>
              ) : null}
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
                disabled={!username || !validMatch ? true : false}
              >
                Register
              </button>
            )}
            <div className='text-center'>
              <p>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
