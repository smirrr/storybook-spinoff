import styled, { keyframes } from 'styled-components';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const availableSizes = {
  xsmall: 4,
  small: 5,
  medium: 6,
  large: 7,
  xlarge: 8,
};

const Spinner = forwardRef(
  ({ size, thickness, speed, color, emptyColor, customSVG, ...props }, ref) => {
    const _size = availableSizes[size] || size;
    const StyledSpinner = styled.div`
      animation: ${spin} ${speed} linear infinite;
    `;

    const SpinnerCommonProps = {
      ref,
      size: _size,
      display: 'inline-block',
    };

    if (customSVG) {
      return <Box as="img" src={customSVG} {...SpinnerCommonProps} />;
    }
    return (
      <Box
        as={StyledSpinner}
        borderBottomColor={emptyColor}
        borderColor="currentColor"
        borderLeftColor={emptyColor}
        borderStyle="solid"
        borderWidth={thickness}
        color={color}
        rounded="full"
        {...SpinnerCommonProps}
        {...props}
      />
    );
  },
);

Spinner.propTypes = {
  /**
   * Main color of the spinner
   */
  color: PropTypes.string,
  /**
   * If provided, a custom svg will be rendered. Only other prop that matters when this is enabled, will be `size`
   */
  customSVG: PropTypes.string,
  /**
   * Color of the empty section of the spinner
   */
  emptyColor: PropTypes.string,
  /**
   * Size of the spinner (inner diameter).
   */
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(Object.keys(availableSizes)),
  ]),
  /**
   * Speed of the spinner
   */
  speed: PropTypes.string,
  /**
   * Thickness of the spinner
   */
  thickness: PropTypes.string,
};

Spinner.defaultProps = {
  color: null,
  customSVG: null,
  emptyColor: 'transparent',
  size: availableSizes.small,
  speed: '0.8s',
  thickness: '2px',
};

Spinner.displayName = 'Spinner';

export default Spinner;
