/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const Select = ({ children, className, name }) => {
  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { name })
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, className, ...props }) => (
  <button
    className={`flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none hover:border-green-600 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const SelectContent = ({ children, className }) => (
  <div
    className={`absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 ${className}`}
  >
    {children}
  </div>
);

export const SelectValue = ({ placeholder, value }) => (
  <span className="text-sm text-gray-500">{value || placeholder}</span>
);

export const SelectItem = ({ value, children, className, ...props }) => (
  <button
    className={`block w-full px-3 py-2 text-left text-sm hover:bg-green-50 hover:text-green-600 ${className}`}
    {...props}
    data-value={value}
  >
    {children}
  </button>
);
