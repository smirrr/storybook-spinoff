import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../BaseButton';
import Box from '../../Box';
import Text from '../../Text';
import { caretDown, caretUp } from '../../IconLib';

const DropdownButtonBadge = ({ badgeCount }) => {
  if (!badgeCount || badgeCount < 0) {
    return null;
  }
  return (
    <Box
      alignItems="center"
      as={Text}
      bg="negative.50"
      borderRadius="xlarge"
      color="basic.100"
      display="flex"
      height={3}
      justifyContent="center"
      ml={2}
      px={2}
      type="inputFieldLabel"
    >
      {badgeCount > 99 ? 99 : badgeCount}
      {badgeCount > 99 && <span>+</span>}
    </Box>
  );
};

DropdownButtonBadge.propTypes = {
  badgeCount: PropTypes.number.isRequired
};

const DropdownButton = forwardRef(
  (
    {
      isDisabled,
      isActive,
      as,
      children,
      variant,
      isOpen,
      size,
      leftIcon,
      ariaDescribedby,
      badgeCount,
      ...rest
    },
    ref
  ) => {
    const forwardProps = {
      isDisabled,
      isActive,
      as,
      children,
      isOpen,
      size,
      leftIcon,
      ariaDescribedby,
      badgeCount,
      ...rest
    };

    return (
      <BaseButton
        as={Box}
        color="basic"
        display="inline-flex"
        ref={ref}
        rightIcon={isOpen ? caretUp : caretDown}
        variant={variant === 'standard' ? 'solid' : 'secondary'}
        {...forwardProps}
      >
        {children}
        <DropdownButtonBadge badgeCount={badgeCount} />
      </BaseButton>
    );
  }
);

export const dropdownButtonVariants = ['standard', 'subtle'];

export const dropdownButtonSizes = ['large', 'medium', 'small'];

DropdownButton.propTypes = {
  /**
   *  The label that the button is given, accessible to screen-readers.
   */
  ariaDescribedby: PropTypes.string,
  /**
   *  `as` prop from styled-components
   */
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   *  Badge count (integer) to enable showing of the badge
   */
  badgeCount: PropTypes.number,
  /**
   *  The text the button displays
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /**
   *  If true, the button is active. An active button is one that is currently clicked (pressed down)
   */
  isActive: PropTypes.bool,
  /**
   *  If true, the button is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   *  The chevron icon on the right is pointed upwards - indicating the dropdown to be open
   */
  isOpen: PropTypes.bool,
  /**
   *  An icon is added to the left of the text, inside the button
   */
  leftIcon: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  /**
   *  The size of the button
   */
  size: PropTypes.oneOf(dropdownButtonSizes),
  /**
   *  The type of button
   */
  variant: PropTypes.oneOf(dropdownButtonVariants)
};

DropdownButton.defaultProps = {
  ariaDescribedby: null,
  as: 'button',
  badgeCount: null,
  children: null,
  isActive: false,
  isDisabled: false,
  isOpen: false,
  leftIcon: null,
  size: dropdownButtonSizes[0],
  variant: dropdownButtonVariants[0]
};

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
