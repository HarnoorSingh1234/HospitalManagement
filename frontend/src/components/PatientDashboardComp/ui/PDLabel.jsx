/* eslint-disable react/prop-types */
export const Label = ({ htmlFor, children, className }) => (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );
  