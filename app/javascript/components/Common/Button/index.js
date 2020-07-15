import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Spinner from "../Spinner";

const colorTypes = {
  primary:
    "border-transparent text-white bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700",
  secondary:
    "border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-50 focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200",
  default:
    "border-gray-300 text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50",
};

const sizeTypes = {
  xs: "px-2.5 py-1.5 text-xs leading-4",
  sm: "px-3 py-2 text-sm leading-4",
  md: "px-4 py-2 text-sm leading-5",
  lg: "px-4 py-2 text-base leading-6",
  xl: "px-6 py-3 text-base leading-6",
};

function Button({
  className,
  htmlType,
  onClick,
  block,
  children,
  colorType,
  sizeType,
  loading,
  disabled,
  ...rest
}) {
  const colorClasses = colorTypes[colorType];
  const sizeClasses = sizeTypes[sizeType];
  return (
    <span
      className={classnames("inline-flex rounded-md shadow-sm", {
        "w-full": block,
      })}
    >
      <button
        type={htmlType}
        className={classnames(
          "w-full inline-flex justify-center items-center border font-medium rounded-md disabled:opacity-60 focus:outline-none transition ease-in-out duration-150",
          colorClasses,
          sizeClasses,
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        {...rest}
      >
        {loading && <Spinner className="w-6 mr-2" />}
        {children}
      </button>
    </span>
  );
}

Button.defaultProps = {
  htmlType: "button",
  children: null,
  onClick: () => {},
  colorType: "default",
  sizeType: "md",
  block: false,
  loading: false,
};

Button.propTypes = {
  /** Defines HTML type of button */
  htmlType: PropTypes.oneOf(["submit", "reset", "button"]),
  /** Defines color type of button */
  colorType: PropTypes.oneOf(Object.keys(colorTypes)),
  /** Defines size type of button */
  sizeType: PropTypes.oneOf(Object.keys(sizeTypes)),
  /** Determines if the button takes up full width */
  block: PropTypes.bool,
  /** click handler for button. Passes event as argument */
  onClick: PropTypes.func,
  /** Content inside the button */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /** Show loading indicator and disable button */
  loading: PropTypes.bool.isRequired,
};

export default Button;
