/* eslint-disable react/prop-types */


const Button = ({
  children,
  className = '',
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
    outline: 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50',
  };

  return (
    <button
      className={`rounded-md font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
