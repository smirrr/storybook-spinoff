import React from 'react';
import PropTypes from 'prop-types';
import { SimpleButton } from '../Button';
import Box from '../Box';
import Text from '../Text';

// TODO: stackability, autodismissed, animation in and out, a11y

const Toast = ({ isClosable, action, onClickAction, children }) => (
  <Box
    bg="basic.10"
    borderRadius="medium"
    color="text.onDark"
    display="inline-block"
    px="size16"
    py="size12"
  >
    <Text tag="span" type="body">
      {children}
    </Text>
    {/* TODO: disable button styles on hover */}
    {/* TODO: SimpleButton text should be semi-bold */}
    {/* TODO: Grid to center the button within the toast */}
    {action && (
      <SimpleButton
        bg="basic.10"
        color="accent.50"
        display="inline-block"
        onClick={onClickAction}
      >
        {action}
      </SimpleButton>
    )}
    {/* TODO: Implement the close button */}
    {(action || isClosable) && (
      <SimpleButton
        bg="basic.10"
        color="accent.50"
        display="inline-block"
        onClick={console.log('close has been clicked')}
      >
        Close
      </SimpleButton>
    )}
  </Box>
);

Toast.propTypes = {
  isClosable: PropTypes.bool,
  action: PropTypes.string,
  onClickAction: PropTypes.func,
  children: PropTypes.string.isRequired
};

Toast.defaultProps = {
  isClosable: false,
  action: null,
  onClickAction: null
};

Toast.displayName = 'Toast';
export default Toast;
