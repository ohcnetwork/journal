import React from "react";
import PropTypes from "prop-types";

function Label({ inputId, children, ...rest }) {
  return (
    <label
      htmlFor={inputId}
      className="block text-sm font-medium leading-5 text-gray-700"
      {...rest}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  /** id of the input for accessibility */
  inputId: PropTypes.string,
  /** Content inside the Panel */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Label;
