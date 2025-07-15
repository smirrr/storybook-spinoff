import React, { createContext, forwardRef, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

const FormControlContext = createContext(undefined, undefined);

export const useFormControlContext = () => {
  return useContext(FormControlContext);
};

export const useFormControl = props => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc, prop) => {
    /** Giving precedence to `props` over `context` */
    acc[prop] = props[prop];

    if (context) {
      if (!props[prop]) {
        acc[prop] = context[prop];
      }
    }

    return acc;
  }, {});
};

const FormControl = forwardRef(
  ({ isInvalid, isRequired, isDisabled, isReadOnly, isFocused, isActive, value, ...rest }, ref) => {

    const base = {
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      value
    };
    const [state, setState] = useState({
      isFocused,
      isActive: !!value,
    });

    const setContext = (context) => {
      setState({ ...state, ...context });
    };

    return (
      <FormControlContext.Provider value={{ ...base, ...state, setContext }}>
        <Box ref={ref} role="group" {...rest} />
      </FormControlContext.Provider>
    );
  },
);

FormControl.propTypes = {
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

FormControl.defaultProps = {
  isActive: false,
  isDisabled: false,
  isFocused: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  value: ''
};

FormControl.displayName = 'FormControl';

export default FormControl;