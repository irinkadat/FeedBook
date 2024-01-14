import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebaseConfig';
import '../styles/SignInPage.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignInPage = ({ onSignIn }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // check if the user is just signed in here
      if (user) {
        setIsUserSignedIn(true);
      } else {
        setIsUserSignedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup when the component unmounts
  }, []);

  useEffect(() => {
    // Redirect to the home page after successful sign-in
    if (isUserSignedIn) {
      navigate('/');
    }
  }, [navigate, isUserSignedIn]);

  const handleSignIn = async (data) => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // onSignIn will be called through onAuthStateChanged
    } catch (error) {
      console.error('Authentication failed:', error.message);
    }
  };

  return (
    <div className='main-div'>
      <div className="signin-page-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(handleSignIn)} className="signin-page-form">
          <label>Email:</label>
          <input type="text" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}

          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message} </p>}

          <button type="submit">Sign In</button>
        </form>

        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignInPage;
