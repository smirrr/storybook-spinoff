import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import Box from '../Box';

const Tooltip = ({ children, id }) => (
  // TODO: implement for primary labels https://inclusive-components.design/tooltips-toggletips/
  // TODO: fix bug thaat makes the tooltip permanent if you add a 'display' property to it
  <Box
    background="linear-gradient(#454c64, #2d2e30)"
    role="tooltip"
    id={id}
    display="inline-block"
    color="text.onDark"
    marginTop="size12"
    py="size4"
    px="size8"
    borderRadius="small"
  >
    <Text type="note">{children}</Text>
  </Box>
);

Tooltip.propTypes = {
  // Text present in the tooltip
  children: PropTypes.string.isRequired,
  // Sets the element that this tooltip is associated with
  id: PropTypes.string.isRequired
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
