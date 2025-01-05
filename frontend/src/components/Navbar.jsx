/* eslint-disable react/prop-types */
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeartPulseIcon as Heartbeat, Menu, X, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginPopup from './Login';
import SignupPopup from './Signup';

const Navbar = ({ isLoggedIn, handleLogout, navigateToTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Background color change on scroll
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  useEffect(() => {
    const handleResize = () => setIsOpen(false); // Close menu on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.nav
      style={{ backgroundColor }}
      className="fixed w-full z-50 transition-colors duration-300 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heartbeat className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">MediSync</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-green-800 hover:text-green-900 hover:bg-green-100 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsNearbyOpen(!isNearbyOpen)}
                className="text-green-800 hover:bg-green-100 hover:text-green-900 px-3 py-2 text-sm font-medium flex items-center transition-colors"
              >
                Nearby <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isNearbyOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white">
                  <Link
                    to="/nearby/hospitals"
                    className="block px-4 py-2 text-sm text-green-700 hover:bg-green-100"
                  >
                    Hospitals
                  </Link>
                  <Link
                    to="/nearby/blood-banks"
                    className="block px-4 py-2 text-sm text-green-700 hover:bg-green-100"
                  >
                    Blood Banks
                  </Link>
                </div>
              )}
            </div>
            {!isLoggedIn ? (
              <>
                {/* About Us Button */}
                <button
                  onClick={() => {
                    setIsOpen(false); // Close mobile menu if open
                    navigateToTeam(); // Navigate and scroll to team
                  }}
                  className="text-green-800 hover:bg-green-100 hover:text-green-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  About Us
                </button>

                <div className="flex items-center space-x-4">
                  {/* Login Button */}
                  <button
                    className="flex items-center text-green-800 hover:bg-green-100 hover:text-green-900 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsLoginPopupOpen(true)}
                  >
                    <LogIn className="h-5 w-5 mr-1" /> Login
                  </button>
                  {/* Sign Up Button */}
                  <button
                    className="flex items-center text-green-800 hover:bg-green-100 hover:text-green-900 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsSignupOpen(true)}
                  >
                    <LogIn className="h-5 w-5 mr-1" /> Sign Up
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-green-800 hover:text-green-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="text-green-800 hover:text-green-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-green-800 hover:text-green-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-800 p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3">
          <Link
            to="/"
            className="block px-3 py-2 text-green-800 hover:text-green-900 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <button
            onClick={() => setIsNearbyOpen(!isNearbyOpen)}
            className="block w-full text-left px-3 py-2 text-green-800 hover:text-green-900 rounded-md text-base font-medium"
          >
            Nearby
          </button>
          {isNearbyOpen && (
            <div className="pl-4">
              <Link
                to="/nearby/hospitals"
                className="block px-3 py-2 text-green-700 hover:bg-green-100 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Hospitals
              </Link>
              <Link
                to="/nearby/blood-banks"
                className="block px-3 py-2 text-green-700 hover:bg-green-100 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Blood Banks
              </Link>
            </div>
          )}
          <button
            onClick={() => {
              setIsOpen(false); // Close menu
              navigateToTeam(); // Navigate and scroll
            }}
            className="block px-3 py-2 text-green-800 hover:text-green-900 rounded-md text-base font-medium"
          >
            About Us
          </button>
        </div>
      )}

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onSignupOpen={() => {
          setIsLoginPopupOpen(false);
          setIsSignupOpen(true);
        }}
      />

      {/* Signup Popup */}
      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLoginOpen={() => {
          setIsSignupOpen(false);
          setIsLoginPopupOpen(true);
        }}
      />
    </motion.nav>
  );
};

export default Navbar;
