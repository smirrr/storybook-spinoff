import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../Box';
import defaultTheme from '../../theming/defaultTheme';

const SimpleMenuView = ({ isFullWidth, width, children, ...rest }) => {
  return (
    <Box
      alignItems="flex-start"
      boxShadow={defaultTheme.shadows.base}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      overflow="hidden"
      width={isFullWidth ? '100%' : width}
      zIndex={defaultTheme.zIndices[4]}
      {...rest}
    >
      {children}
    </Box>
  );
};

SimpleMenuView.propTypes = {
  /**
   *You can pass the children as node or any other components.
   */
  children: PropTypes.node.isRequired,
  /**
   *This className for Menu view row.
   */
  className: PropTypes.string,
  /**
   *If row will take full width or not
   */
  isFullWidth: PropTypes.bool,
  /**
   *Width of row/custom components.
   */
  width: PropTypes.string
};

SimpleMenuView.defaultProps = {
  className: null,
  isFullWidth: false,
  width: '300px'
};

SimpleMenuView.displayName = 'SimpleMenuView';

export default SimpleMenuView;
