import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signin', {
        email,
        password,
      });

      // Handle successful signin response here
      const { token } = response.data;

      // Store the token in localStorage or cookies for future use
      localStorage.setItem('token', token);

      // Show success toast notification
      toast.success('Signin successful!', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      // Handle error during signin here
      console.error(error);

      // Show error toast notification
      toast.error('Signin failed. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
