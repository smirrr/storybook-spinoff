import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import Proptypes from 'prop-types';
import Box from '../Box';
import { colors } from '../theming/modules/colors';

const valueToPercent = (value, min, max) => {
  return ((value - min) * 100) / (max - min);
};

const ProgressIndicator = ({ min, max, value, ...rest }) => {
  const percent = valueToPercent(value, min, max);

  const move = keyframes`
  0% {
    width:0
  }
  100% {
   width:${percent}%
  }
`;

  const StyledProgress = styled.div`
    animation: ${move} 1s ease-in-out;
  `;

  return (
    <Box
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      as={StyledProgress}
      height="100%"
      role="progressbar"
      width={`${percent}%`}
      {...rest}
      transition="all 3s"
    />
  );
};

ProgressIndicator.propTypes = {
  max: Proptypes.number,
  min: Proptypes.number,
  value: Proptypes.number
};

ProgressIndicator.defaultProps = {
  max: 100,
  min: 0,
  value: 20
};

const progressbarSizes = {
  large: '8px',
  medium: '4px',
  small: '2px'
};

const barGradientColors = {
  positive: ['#59ff4a', colors.positive['50']],
  negative: ['#fb9566', colors.negative['40']],
  neutral: ['#fdef54', '#fdda01']
};

export const availableSizes = Object.keys(progressbarSizes);
export const availableGradientColors = Object.keys(barGradientColors);

const ProgressTrack = ({ size, ...rest }) => {
  return (
    <Box
      height={progressbarSizes[size]}
      overflow="hidden"
      pos="relative"
      transition="all 0.3s"
      {...rest}
    />
  );
};

ProgressTrack.propTypes = {
  size: Proptypes.oneOf(availableSizes)
};

ProgressTrack.defaultProps = {
  size: 'medium'
};

const Progress = memo(
  ({
    color,
    gradientColorsType,
    gradientColors,
    gradientDirection,
    value,
    min,
    max,
    size,
    ...rest
  }) => {
    const trackColor = 'basic.80';
    const gradients = gradientColorsType
      ? barGradientColors[gradientColorsType]?.join(',')
      : gradientColors?.join(',');

    return (
      <ProgressTrack
        bg={trackColor}
        borderRadius={size === 'small' ? 'small' : 'medium'}
        size={size}
        {...rest}
      >
        <ProgressIndicator
          background={
            gradients
              ? `linear-gradient(${gradientDirection},${gradients})`
              : ''
          }
          bg={gradients ? '' : color}
          borderRadius={size === 'small' ? 'small' : 'medium'}
          max={max}
          min={min}
          value={value}
        />
      </ProgressTrack>
    );
  }
);

Progress.propTypes = {
  /**
   * Color of the progress track
   */
  color: Proptypes.string,
  /**
   * Custom gradient colors if override needed for gradientType
   */
  gradientColors: Proptypes.arrayOf(Proptypes.string),
  /**
   * Available gradients, either positive, negative or neutral
   */
  gradientColorsType: Proptypes.oneOf(availableGradientColors),
  /**
   * Custom gradient colors if override needed for gradientType
   */
  gradientDirection: Proptypes.string,
  /**
   * Max value acceptable by progress
   */
  max: Proptypes.number,
  /**
   * Min value acceptable by progress
   */
  min: Proptypes.number,
  /**
   * Available sizes (or heights)
   */
  size: Proptypes.oneOf(availableSizes),
  /**
   * The current value of the progressbar. Should be between `min` and `max`
   */
  value: Proptypes.number
};

Progress.defaultProps = {
  color: 'primary.50',
  gradientColors: [],
  gradientColorsType: '',
  gradientDirection: 'to right',
  max: 100,
  min: 0,
  size: 'medium',
  value: 20
};

export default Progress;
