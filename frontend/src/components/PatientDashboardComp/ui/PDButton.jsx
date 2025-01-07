/* eslint-disable react/prop-types */
export const Button = ({ children, className, ...props }) => (
    <button
      className={`px-4 py-2 rounded-md border transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  