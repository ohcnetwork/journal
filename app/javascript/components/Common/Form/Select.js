import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useId } from "@reach/auto-id";
import classnames from "classnames";
import { get } from "lodash";

import Label from "./Label";

function CustomSelect({ id, className, name, label, as: As, errors, ...rest }) {
  const labelId = useId(id);
  const errorId = useId();
  const errorMessage = get(errors, name);

  return (
    <div className={classnames("my-6", className)}>
      <Label id={labelId}>{label}</Label>
      <div className="mt-1 rounded-md shadow-sm">
        <As
          aria-labelledby={`${labelId} ${errorId}`}
          isSearchable
          name={name}
          {...rest}
        />
      </div>
      {errorMessage && (
        <div className="mt-1 text-red-600" role="alert">
          <p id={errorId}>{errorMessage?.message}</p>
        </div>
      )}
    </div>
  );
}

CustomSelect.defaultProps = {
  as: Select,
  id: null,
  errors: {},
  className: null,
  register: null,
};

CustomSelect.propTypes = {
  /** Label for input */
  label: PropTypes.node.isRequired,
  /** defaults to input, can render a different element if necessary */
  as: PropTypes.elementType,
  /** Unique name (in the form) for input, this will be used as key in react-hook-form */
  name: PropTypes.string.isRequired,
  /** unique id for input. Will be auto-generated if not provided */
  id: PropTypes.string,
  /** errors object received from react-hook-form. Complete errors should be used as we are using ErrorMessage to parse through the object */
  errors: PropTypes.object,
  /** Tailwind extension */
  className: PropTypes.string,
};

export default CustomSelect;
