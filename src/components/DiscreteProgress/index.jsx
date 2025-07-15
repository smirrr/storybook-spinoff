import React from 'react';
import Proptypes from 'prop-types';
import Box from '../Box';
import Progress, { availableSizes as ProgressAvailableSizes } from '../Progress';

export const availableSizes = ProgressAvailableSizes;

const DiscreteProgress = ({
  color,
  value,
  steps,
  size,
  ...rest
}) => {
  return (
    <Box display="grid" gridAutoFlow="column" gridGap={2}>
      {[...Array(steps).keys()].map((step) =>
        <Progress color={color} size={size} {...rest} max={1} min={0} value={step < value ? 1 : 0} />
      )}
    </Box>
  );
};

DiscreteProgress.propTypes = {
  /**
   * Color of the progress track
   */
  color: Proptypes.string,
  /**
   * Available sizes (or heights)
   */
  size: Proptypes.oneOf(availableSizes),
  /**
   * No of steps in the discrete progressbar - should be an integer
   */
  steps: Proptypes.number,
  /**
   * The current value of the progressbar. Should be an integer between `0` and `steps`
   */
  value: Proptypes.number,
};

DiscreteProgress.defaultProps = {
  color: 'primary.50',
  steps: 10,
  size: 'medium',
  value: 2,
};

export default DiscreteProgress;