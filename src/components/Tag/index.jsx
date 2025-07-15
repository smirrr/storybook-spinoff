import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Text from '../Text';
import Icon from '../Icon';

const Tag = ({
  children,
  backgroundColor,
  foregroundColor,
  leftIcon,
  leftIconColor,
  rightIcon,
  rightIconColor,
  onRightIconClick
}) => {
  // TODO: fix bug where default tag also includes grid-gap
  return (
    <Box
      alignItems="center"
      bg={backgroundColor}
      borderRadius="small"
      color={foregroundColor}
      display="inline-grid"
      gridAutoFlow="column"
      gridGap={3}
      px={4}
      py={2}
    >
      {leftIcon && (
        <Icon color={leftIconColor || foregroundColor} icon={leftIcon} />
      )}
      <Text type="tag">{children}</Text>
      {rightIcon && (
        <Icon
          color={rightIconColor || foregroundColor}
          cursor={onRightIconClick ? 'pointer' : 'normal'}
          icon={rightIcon}
          onClick={() => onRightIconClick && onRightIconClick()}
        />
      )}
    </Box>
  );
};

Tag.propTypes = {
  /**
   * Foreground color of the text
   */
  backgroundColor: PropTypes.string,
  /**
   * Accepts Text that the tag will display
   */
  children: PropTypes.string.isRequired,
  /**
   * Foreground color of the text
   */
  foregroundColor: PropTypes.string,
  /**
   * Icon to be rendered on the left of `children` - can only be one of the icons from the list exported from `IconLib`
   */
  leftIcon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * If left icon is provided, this will set its color.
   */
  leftIconColor: PropTypes.string,
  /**
   * Click handler for right icon. Left icon however is only for presentational purposes
   */
  onRightIconClick: PropTypes.func,
  /**
   * Icon to be rendered on the right of `children` - can only be one of the icons from the list exported from `IconLib`
   */
  rightIcon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * If right icon is provided, this will set its color.
   */
  rightIconColor: PropTypes.string
};

Tag.defaultProps = {
  backgroundColor: 'basic.80',
  foregroundColor: 'text.default',
  leftIcon: undefined,
  leftIconColor: undefined,
  onRightIconClick: null,
  rightIcon: undefined,
  rightIconColor: undefined
};

Tag.displayName = 'Tag';

export default Tag;
