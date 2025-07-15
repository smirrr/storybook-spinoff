import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PseudoBox from '../PseudoBox';

const baseStyleProps = {
  transition: 'all 0.15s ease-out',
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  _focus: {
    boxShadow: 'outline'
  },
  _disabled: {
    cursor: 'not-allowed',
    textDecoration: 'none'
  }
};

const Link = forwardRef(({ isDisabled, isExternal, onClick, ...rest }, ref) => {
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : null;

  return (
    <PseudoBox
      _hover={{ textDecoration: 'underline' }}
      aria-disabled={isDisabled}
      as="a"
      onClick={isDisabled ? event => event.preventDefault() : onClick}
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      {...externalProps}
      {...baseStyleProps}
      {...rest}
    />
  );
});

Link.displayName = 'Link';

Link.propTypes = {
  /**
   * If `true`, the link will be disabled and not clickable
   */

  isDisabled: PropTypes.bool,
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal: PropTypes.bool,
  /**
   * Action to perform when clicked
   */
  onClick: PropTypes.function
};

Link.defaultProps = {
  isDisabled: false,
  isExternal: false,
  onClick: () => {}
};

export default Link;
