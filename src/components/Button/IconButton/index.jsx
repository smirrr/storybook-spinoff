import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton';
import Box from '../../Box';

const IconButton = forwardRef(
  (
    {
      isDisabled,
      isActive,
      isLoading,
      as: Component,
      variant,
      color,
      icon,
      ariaDescribedby,
      ...rest
    },
    ref
  ) => {
    if (!icon) {
      return null;
    }
    const { children, loadingText, ...restForwardProps } = rest;
    const forwardProps = {
      isDisabled,
      isActive,
      isLoading,
      Component,
      variant: variant === 'ghost' ? 'text' : variant,
      color,
      leftIcon: icon,
      ariaDescribedby,
      ...restForwardProps
    };

    return (
      <BaseButton
        as={Box}
        borderRadius="small"
        display="inline-flex"
        px={1}
        py={1}
        ref={ref}
        {...forwardProps}
      />
    );
  }
);

export const iconButtonColors = ['primary', 'basic', 'positive', 'negative'];

export const iconButtonVariants = ['solid', 'secondary', 'ghost'];

IconButton.propTypes = {
  /**
   * aria-described-by html attribute
   */
  ariaDescribedby: PropTypes.string,
  /**
   * `html tag` or `React Component` that renders button styles instead of the default `button` tag
   */
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * The color variant of button
   */
  color: PropTypes.oneOf(iconButtonColors),
  /**
   * Icon to be rendered - can only be one of the icons from the list exported from `IconLib`
   */
  icon: PropTypes.shape({ render: PropTypes.func }).isRequired,
  /**
   * If true, the button is active. An active button is one that is currently clicked (pressed down)
   */
  isActive: PropTypes.bool,
  /**
   * If true, the button is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * If true, the button enters loading state and is disabled
   */
  isLoading: PropTypes.bool,
  /**
   * The variant of button
   */
  variant: PropTypes.oneOf(iconButtonVariants)
};

IconButton.defaultProps = {
  ariaDescribedby: undefined,
  as: 'button',
  color: iconButtonColors[0],
  isActive: false,
  isDisabled: false,
  isLoading: false,
  variant: iconButtonVariants[0]
};

IconButton.displayName = 'IconButton';

export default IconButton;
