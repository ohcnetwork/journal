import React from "react";
import PropTypes from "prop-types";
import { useId } from "@reach/auto-id";
import classnames from "classnames";
import { get } from "lodash";

/**
 * Common Input component.
 * To be used with React Hook Form.
 */
function Input({
  id,
  name,
  errors,
  type,
  as: As,
  label,
  required,
  register,
  className,
  ...rest
}) {
  const inputId = useId(id);
  const errorId = `error-${inputId}`;
  const errorMessage = get(errors, name);

  return (
    <div className={classnames("my-6", className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <As
          id={inputId}
          type={type}
          name={name}
          required={required}
          ref={register}
          aria-invalid={errorMessage ? "true" : "false"}
          aria-describedby={errorId}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          {...rest}
        />
      </div>
      {errorMessage && (
        <div className="mt-1 text-red-600" role="alert" id={errorMessage}>
          <p>{errorMessage?.message}</p>
        </div>
      )}
    </div>
  );
}

Input.defaultProps = {
  id: null,
  errors: {},
  required: false,
  register: null,
  className: null,
  as: "input",
};

Input.propTypes = {
  /** Label for input */
  label: PropTypes.node.isRequired,
  /** defaults to input, can render a different element if necessary */
  as: PropTypes.elementType.isRequired,
  /** Unique name (in the form) for input, this will be used as key in react-hook-form */
  name: PropTypes.string.isRequired,
  /** register function from react-hook-form */
  register: PropTypes.func,
  /** unique id for input. Will be auto-generated if not provided */
  id: PropTypes.string,
  /** errors object received from react-hook-form. Complete errors should be used as we are using ErrorMessage to parse through the object */
  errors: PropTypes.object,
  /** Specifies if input is mandatory. Even if specified in schema, this is required for accessibility purposes. */
  required: PropTypes.bool,
  /** Tailwind extension */
  className: PropTypes.string,
};

export default Input;
