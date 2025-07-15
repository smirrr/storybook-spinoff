import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { useFormControlContext } from '../FormControl';
import Text from '../Text';

const getColor = formControl => {
  let color;
  if (formControl.isInvalid) {
    color = 'negative.50';
  } else if (formControl.isFocused) {
    color = 'primary.50';
  } else color = 'basic.20';
  return color;
};

export const RequiredIndicator = props => {
  const color = 'negative.50';
  return (
    <Box aria-hidden="true" as="span" color={color} ml={1} {...props}>
      *
    </Box>
  );
};

export const FormLabel = forwardRef(({ children, ...props }, ref) => {
  const formControl = useFormControlContext();
  return (
    <Text
      color={getColor(formControl)}
      cursor={formControl.isDisabled && 'not-allowed'}
      display="inline-block"
      mb={2}
      opacity={formControl.isDisabled && '0.6'}
      ref={ref}
      tag="label"
      type="label"
      verticalAlign="middle"
      {...props}
    >
      {children}
      {formControl.isRequired && <RequiredIndicator />}
    </Text>
  );
});

FormLabel.propTypes = {
  children: PropTypes.string
};

FormLabel.defaultProps = {
  children: null
};

FormLabel.displayName = 'FormLabel';

export default FormLabel;

export const InputLabel = forwardRef((props, ref) => {
  const formControl = useFormControlContext();
  const { children } = props;

  const styleProps = {
    color: getColor(formControl),
    position: 'absolute',
    pointerEvents: 'none',
    top: formControl.isActive || !!formControl.value ? 3 : 7,
    left: 8,
    transition: 'all 0.2s ease'
  };

  return (
    <Box
      {...styleProps}
      as={Text}
      ref={ref}
      tag="label"
      type={
        formControl.isActive || !!formControl.value ? 'inputFieldLabel' : 'note'
      }
      {...props}
    >
      {children}
      {formControl.isRequired && <RequiredIndicator />}
    </Box>
  );
});

InputLabel.propTypes = {
  children: PropTypes.string
};

InputLabel.defaultProps = {
  children: ''
};
