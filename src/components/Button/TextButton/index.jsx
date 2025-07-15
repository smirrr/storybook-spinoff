import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton';

const TextButton = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isActive,
      children,
      as: Component,
      color,
      leftIcon,
      rightIcon,
      loadingText,
      size,
      ariaDescribedby,
      ...rest
    },
    ref,
  ) => {
    const forwardProps = {
      isDisabled,
      isLoading,
      isActive,
      children,
      Component,
      color,
      leftIcon,
      rightIcon,
      loadingText,
      size,
      ariaDescribedby,
      ...rest,
    };

    return <BaseButton variant="text" {...forwardProps} ref={ref} />;
  },
);

export const textButtonColors = ['primary', 'basic', 'positive', 'negative'];

export const textButtonSizes = ['large', 'medium', 'small'];

TextButton.propTypes = {
  /**
   * aria-described-by html attribute
   */
  ariaDescribedby: PropTypes.string,
  /**
   * `html tag` or `React Component` that renders button styles instead of the default `button` tag
   */
  as: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  /**
   * The text inside the button. Can also be used to render custom components inside the button.
   */
  children: PropTypes.string.isRequired,
  /**
   * The color type of button
   */
  color: PropTypes.oneOf(textButtonColors),
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
   * Icon to be rendered on the left of `children` - can only be one of the icons from the list exported from `IconLib`
   */
  leftIcon: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  /**
   * Custom text to be rendered in place of `children` when button is in loading state
   */
  loadingText: PropTypes.string,
  /**
   * Icon to be rendered on the right of `children` - can only be one of the icons from the list exported from `IconLib`
   */
  rightIcon: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  /**
   * The size of button
   */
  size: PropTypes.oneOf(textButtonSizes),
};

TextButton.defaultProps = {
  ariaDescribedby: null,
  as: 'button',
  color: textButtonColors[0],
  isActive: false,
  isDisabled: false,
  isLoading: false,
  leftIcon: undefined,
  rightIcon: null,
  loadingText: null,
  size: textButtonSizes[0],
};

TextButton.displayName = 'TextButton';

export default TextButton;
