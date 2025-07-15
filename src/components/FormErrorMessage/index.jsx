import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFormControlContext } from '../FormControl';
import Text from '../Text';
import Box from '../Box';

const FormErrorMessage = forwardRef(({ children, ...props }, ref) => {
  const formControl = useFormControlContext();

  if (!formControl.isInvalid) {
    return null;
  }

  return (
    <Box
      {...props}
      align="center"
      as={Text}
      color="negative.50"
      id={formControl.id ? `${formControl.id}-error-message` : null}
      mt={4}
      ref={ref}
      type="note"
    >
      {children}
    </Box>
  );
});
FormErrorMessage.defaultProps = {
  children: null,
};

FormErrorMessage.propTypes = {
  children: PropTypes.node,
};
FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
