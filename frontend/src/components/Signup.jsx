
/* eslint-disable react/prop-types */
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './components.css'

const SignupPopup = ({ isOpen, onClose , onLoginOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted');
    onClose();
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
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-background') {
      onClose();
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        id="modal-background"
        onClick={handleOutsideClick}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-lg p-6 w-80 max-h-[90vh] overflow-y-auto relative scrollbar-hide"
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &#x2715;
          </button>
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Sign Up</h2>
          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            {/* Age Field */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age *
              </label>
              <input
                id="age"
                type="number"
                className="mt-1 block w-full px-3 py-2 border appearance-none border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                
                required
              />
            </div>
            {/* Gender Field */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                id="gender"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            {/* Doctor/Patient Field */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Are you a Doctor or Patient? *
              </label>
              <select
                id="role"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
            {/* Terms and Conditions */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  required
                />
                I agree to the terms and conditions.
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Sign Up
            </button>
              
            <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => {
                onClose(); // Close Signup Popup
                onLoginOpen(); // Open Login Popup
              }}
              className="text-green-600 hover:no-underline"
            >
              Log In
            </button>
          </p>
          </form>
        </motion.div>
        </div>
      </div>
    )
  );
};

export default SignupPopup;
