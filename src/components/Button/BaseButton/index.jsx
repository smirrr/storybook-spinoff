import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import useBaseButtonStyle from './styles';
import PseudoBox from '../../PseudoBox';
import Box from '../../Box';
import Text, { variants as textVariants } from '../../Text';
import Spinner from '../../Spinner';

export const baseButtonColors = [
  'primary',
  'basic',
  'positive',
  'negative',
  'accent'
];

export const baseButtonSizes = ['large', 'medium', 'small'];

export const baseButtonVariants = ['solid', 'secondary', 'text'];

const iconSpacing = {
  large: 'size8',
  medium: 'size8',
  small: 'size4'
};

const BaseButtonIcon = ({
  buttonSize,
  icon,
  isIconOnly,
  orientation,
  ...props
}) => {
  let computedSize = buttonSize === 'small' ? 'icons.xs' : 'icons.s';
  computedSize = isIconOnly ? 'icons.m' : computedSize;
  return (
    <Box
      marginLeft={
        !isIconOnly && orientation === 'right' && iconSpacing[buttonSize]
      }
      marginRight={
        !isIconOnly && orientation === 'left' && iconSpacing[buttonSize]
      }
    >
      <Icon
        as={Box}
        color="currentColor"
        focusable="false"
        icon={icon}
        size={computedSize}
        {...props}
      />
    </Box>
  );
};

BaseButtonIcon.propTypes = {
  buttonSize: PropTypes.oneOf(baseButtonSizes),
  icon: PropTypes.string.isRequired,
  isIconOnly: PropTypes.bool,
  orientation: PropTypes.oneOf(['left', 'right']),
  variant: PropTypes.oneOf(baseButtonVariants)
};

BaseButtonIcon.defaultProps = {
  buttonSize: baseButtonSizes[0],
  isIconOnly: false,
  orientation: null,
  variant: baseButtonVariants[0]
};

const Index = forwardRef(
  (
    {
      isDisabled,
      isLoading,
      isActive,
      children,
      as,
      variant = 'solid',
      color = 'primary',
      leftIcon,
      rightIcon,
      loadingText,
      size = 'large',
      ariaDescribedby,
      ...rest
    },
    ref
  ) => {
    const buttonStyleProps = useBaseButtonStyle({
      color,
      leftIcon,
      rightIcon,
      size,
      variant
    });
    // eslint-disable-next-line no-underscore-dangle
    const _isDisabled = isDisabled || isLoading;

    const isIconOnly = (!children && !rightIcon) || (!children && !leftIcon);

    const buttonTextType = size === 'small' ? 'label' : 'button';

    const buttonTextHeight = textVariants[buttonTextType].fontSize;

    const spinnerSize = buttonTextHeight;

    return (
      <PseudoBox
        aria-describedby={ariaDescribedby}
        aria-disabled={_isDisabled}
        as="button"
        data-active={isActive ? 'true' : undefined}
        disabled={_isDisabled}
        ref={ref}
        // width={isFullWidth ? "full" : undefined}
        variant={variant}
        {...buttonStyleProps}
        {...rest}
      >
        {leftIcon && !isLoading && (
          <BaseButtonIcon
            buttonSize={size}
            icon={leftIcon}
            isIconOnly={isIconOnly}
            orientation="left"
            variant={variant}
          />
        )}
        {isLoading && (
          <Spinner
            color="currentColor"
            mr={!isIconOnly ? iconSpacing[size] : 0}
            size={!isIconOnly ? `fontSizes.${spinnerSize}` : 'sm'}
          />
        )}

        <Text
          alignItems="center"
          display="flex"
          justifyContent="center"
          type={buttonTextType}
        >
          {isLoading ? loadingText || children : children}
        </Text>

        {rightIcon && !isLoading && (
          <BaseButtonIcon
            buttonSize={size}
            icon={rightIcon}
            orientation="right"
          />
        )}
      </PseudoBox>
    );
  }
);

Index.propTypes = {
  // The label that the button is given, accessible to screen-readers.
  ariaDescribedby: PropTypes.string,
  // If true, the button is disabled
  isDisabled: PropTypes.bool,
  // If true, the button is loading
  isLoading: PropTypes.bool,
  // If true, the button is active. An active button is one that is currently clicked (pressed down)
  isActive: PropTypes.bool,
  // The text the button displays
  children: PropTypes.string,
  // TODO: ??
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // The background color of the button
  color: PropTypes.oneOf(baseButtonColors),
  // An icon is added to the left of the text, inside the button
  leftIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // The text that is displayed while the contents of the button is loading
  loadingText: PropTypes.string,
  // An icon is added to the right of the text, inside the button
  rightIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  // The size of the button
  size: PropTypes.oneOf(baseButtonSizes),
  // The hierarchy of this specific button
  variant: PropTypes.oneOf(baseButtonVariants) // TODO - needs to be renamed to favor the `variant` attribute on buttons
};

Index.defaultProps = {
  ariaDescribedby: null,
  as: 'button',
  color: baseButtonColors[0],
  isActive: false,
  isDisabled: false,
  isLoading: false,
  children: '',
  leftIcon: null,
  loadingText: null,
  rightIcon: null,
  size: baseButtonSizes[0],
  variant: baseButtonVariants[0]
};

Index.displayName = 'BaseButton';

export default Index;
