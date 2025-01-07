/* eslint-disable react/prop-types */
import React from "react";

export const RadioGroup = ({ children, name, defaultValue, className }) => {
  return (
    <div role="radiogroup" className={`space-y-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { name, defaultValue })
      )}
    </div>
  );
};

export const RadioGroupItem = ({ id, value, name, defaultValue }) => (
  <input
    type="radio"
    id={id}
    name={name}
    value={value}
    defaultChecked={defaultValue === value}
    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
  />
);
