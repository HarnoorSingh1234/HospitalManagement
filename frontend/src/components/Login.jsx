/* eslint-disable react/prop-types */
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

const LoginPopup = ({ isOpen, onClose, onSignupOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-lg p-6 w-80 relative"
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &#x2715;
          </button>
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Login</h2>
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Login
            </button>
          </form>
          {/* Sign-Up Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => {
                onClose();
                onSignupOpen();
              }}
              className="text-green-600 hover:no-underline"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    )
  );
};

export default LoginPopup;
