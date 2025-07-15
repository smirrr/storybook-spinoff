import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton';

const SimpleButton = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isActive,
      // isFullWidth,
      children,
      as: Component,
      variant,
      color,
      leftIcon,
      rightIcon,
      loadingText,
      size,
      ariaDescribedby,
      ...rest
    },
    ref
  ) => {
    const forwardProps = {
      isDisabled,
      isLoading,
      isActive,
      children,
      Component,
      variant,
      color,
      leftIcon,
      rightIcon,
      loadingText,
      size,
      ariaDescribedby,
      ...rest
    };

    return <BaseButton {...forwardProps} ref={ref} />;
  }
);

export const simpleButtonColors = ['primary', 'basic', 'positive', 'negative'];

export const simpleButtonSizes = ['large', 'medium', 'small'];

export const simpleButtonVariants = ['solid', 'secondary'];

SimpleButton.propTypes = {
  /**
   * If true, the button is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * If true, the button enters loading state and is disabled
   */
  isLoading: PropTypes.bool,
  /**
   * If true, the button is active. An active button is one that is currently clicked (pressed down)
   */
  isActive: PropTypes.bool,
  /**
   * The text inside the button. Can also be used to render custom components inside the button.
   */
  children: PropTypes.string.isRequired,
  /**
   * `html tag` or `React Component` that renders button styles instead of the default `button` tag
   */
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   * The variant of button
   */
  variant: PropTypes.oneOf(simpleButtonVariants),
  /**
   * The color variant of button
   */
  color: PropTypes.oneOf(simpleButtonColors),
  /**
   * Icon to be rendered on the left of `children` - can only be one of the icons from the list exported from `IconLib`
   */
  leftIcon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * Icon to be rendered on the right of `children` - can only be one of the icons from the list exported from `IconLib`
   */
  rightIcon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * Custom text to be rendered in place of `children` when button is in loading state
   */
  loadingText: PropTypes.string,
  /**
   * The size of button
   */
  size: PropTypes.oneOf(simpleButtonSizes),
  /**
   * aria-described-by html attribute
   */
  ariaDescribedby: PropTypes.string
};

SimpleButton.defaultProps = {
  ariaDescribedby: null,
  as: 'button',
  color: simpleButtonColors[0],
  isActive: false,
  isDisabled: false,
  isLoading: false,
  leftIcon: undefined,
  loadingText: null,
  rightIcon: null,
  size: simpleButtonSizes[0],
  variant: simpleButtonVariants[0]
};

SimpleButton.displayName = 'SimpleButton';

export default SimpleButton;
