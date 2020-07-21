import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

import Select from "./Select";

/**
 * Custom Select that is embedded with Hook Form Controller.
 */
function SelectController({
  asSelect,
  control,
  label,
  onChange,
  rules,
  ...rest
}) {
  const handleChange = (selected) => {
    return onChange(selected);
  };
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ onChange: onControllerChange, onBlur, value }) => (
        <Select
          as={asSelect}
          value={value}
          onChange={(newValue) => onControllerChange(handleChange(newValue))}
          onBlur={onBlur}
          label={label}
          {...rest}
        />
      )}
      {...rest}
    />
  );
}

SelectController.defaultProps = {
  onChange: (v) => v,
  asSelect: undefined,
  rules: {},
};

SelectController.propTypes = {
  /** Label of select */
  label: PropTypes.string.isRequired,
  /** control is received from react-hook-form */
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  rules: PropTypes.object,
  /** onChange handler, if an onChange is provided, then the value returned by it will be provided as value to SelectController */
  onChange: PropTypes.func,
  /** Render a different instance */
  asSelect: PropTypes.elementType,
};

export default SelectController;
