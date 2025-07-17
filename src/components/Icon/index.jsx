import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../Box/index.js';
import defaultTheme from '../theming/defaultTheme.js';

export const iconSizes = Object.keys(defaultTheme.sizes.icons).map(
  size => `icons.${size}`
);

const StyledIcon = styled(Box)`
  fill: currentColor;
  path {
    fill: currentColor;
  }
  vertical-align: middle;
`;

const Icon = ({ icon, size, color, ...rest }) => {
  return <StyledIcon {...rest} as={icon} color={color} size={size} />;
};

Icon.propTypes = {
  /**
   * Color of the icon, use colors from the theme file
   */
  color: PropTypes.string,
  /**
   * The icon svg-as-react-component. Can only be an export from `IconLib`
   */
  icon: PropTypes.shape({ render: PropTypes.func }).isRequired,
  /**
   * Icon size
   */
  size: PropTypes.string
};

Icon.defaultProps = {
  color: 'basic.10',
  size: 'icons.s'
};

Icon.displayName = 'Icon';

export default Icon;
