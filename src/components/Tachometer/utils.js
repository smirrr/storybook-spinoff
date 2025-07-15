/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */

import { arc as d3Arc } from 'd3';

// helper function to calculate array sum till specified index
function sumArrayTill(array, i) {
  let ratio = 0;
  for (let index = 0; index < i; index += 1) {
    ratio += array[index];
  }
  return ratio;
}

export function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

export function configureTickData(config) {
  const tickData = config.customSegmentStops.map((current, index) => {
    if (index === 0) {
      // ignore
      return;
    }
    return (
      (current - config.customSegmentStops[index - 1]) /
      (config.maxValue - config.minValue)
    );
  });

  return tickData.slice(1, tickData.length);
}

export function configureArc(config) {
  const tickData = configureTickData(config);

  const range = config.maxAngle - config.minAngle;
  const r = config.width / 2;

  const arc = d3Arc()
    .innerRadius(r - config.arcWidth - config.ringInset)
    .outerRadius(r - config.ringInset)
    .startAngle((d, i) => {
      const ratio = sumArrayTill(tickData, i);
      return deg2rad(config.minAngle + ratio * range);
    })
    .endAngle((d, i) => {
      const ratio = sumArrayTill(tickData, i + 1);
      return deg2rad(config.minAngle + ratio * range);
    });

  return arc;
}
