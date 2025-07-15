/* eslint-disable react/no-unused-prop-types */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3';
import render from './core';

const defaultConfig = {
  ringInset: 20,
  pointerWidth: 2,
  pointerTailLength: 2,
  minAngle: -90,
  maxAngle: 90
};

const Tachometer = props => {
  const gaugeDiv = useRef(null);

  useEffect(() => {
    if (gaugeDiv.current) {
      const config = { ...defaultConfig, ...props };

      if (config.fluidWidth) {
        config.width = gaugeDiv.current.parentNode.clientWidth;
        config.height = gaugeDiv.current.parentNode.clientHeight;
      }

      d3Select(gaugeDiv.current)
        .select('svg')
        .remove();

      render({
        container: gaugeDiv.current,
        config
      });
    }
  }, [gaugeDiv]);

  return <div ref={gaugeDiv} />;
};

// define the proptypes
// make all the props and 'required' and provide sensible default in the 'defaultProps'
Tachometer.propTypes = {
  /**
   * Width of the Tachometer arc.
   */
  arcWidth: PropTypes.number,
  /**
   * Array of values starting at min value, and ending at max value with value in betweens
   */
  // eslint-disable-next-line react/forbid-prop-types
  customSegmentStops: PropTypes.array,
  /**
   * Default to px for width/height. Possible values - "em" , "ex" , "px"
   */
  dimensionUnit: PropTypes.string,
  /**
   * If true takes the width of the parent component.
   */
  fluidWidth: PropTypes.bool,
  /**
   * Height of the svg element. Height of the Tachometer is always half the width since it is a semi-circle
   */
  height: PropTypes.number,
  /**
   * MaxValue of the Tachometer
   */
  maxValue: PropTypes.number,
  /**
   * MinValue of the Tachometer
   */
  minValue: PropTypes.number,
  /**
   * Custom segment colors can be given with this option. Should be an array of valid color codes
   */
  // eslint-disable-next-line react/forbid-prop-types
  segmentColors: PropTypes.array,
  /**
   * If true, it will show needle inside tachometer
   */
  showNeedle: PropTypes.bool,
  /**
   * Value to be pointed by needle. Please ensure between minValue and maxValue
   */
  value: PropTypes.number,
  /**
   * Width of the svg element. Diameter of tachometer
   */
  width: PropTypes.number
};

// define the default proptypes
Tachometer.defaultProps = {
  arcWidth: 20,

  customSegmentStops: [],
  dimensionUnit: 'px',
  fluidWidth: false,
  height: 75,
  maxValue: 10,
  minValue: 0,

  segmentColors: [],
  showNeedle: true,
  value: 0,
  width: 150
};

export default Tachometer;
