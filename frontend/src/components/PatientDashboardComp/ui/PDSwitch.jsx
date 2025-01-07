/* eslint-disable react/prop-types */
export const Switch = ({ checked, onCheckedChange, className, ...props }) => {
    return (
      <button
        className={`relative w-10 h-6 flex items-center rounded-full transition-all ${
          checked ? "bg-green-600" : "bg-gray-300"
        } ${className}`}
        onClick={onCheckedChange}
        {...props}
      >
        <span
          className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "transform translate-x-4" : "transform translate-x-0"
          }`}
        ></span>
      </button>
    );
  };
  