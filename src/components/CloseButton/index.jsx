import React from 'react';
import PropTypes from 'prop-types';
import { close } from '../IconLib';
import { IconButton } from '../Button';

const sizes = {
  large: {
    button: 6,
    icon: 5,
  },
  medium: {
    button: 5,
    icon: 4,
  },
  small: {
    button: 4,
    icon: 3,
  },
};

const CloseButton = ({ size = 'medium', ...rest }) => {
  const iconSize = sizes[size] && sizes[size].icon;
  return (
    <IconButton
      aria-hidden
      ariaDescribedby="Close"
      ariaLabelledby="Close"
      color="basic"
      icon={close}
      size={iconSize}
      variant="ghost"
      {...rest}
    />
  );
};
CloseButton.defaultProps = {
  size: 'medium',
};

CloseButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default CloseButton;
