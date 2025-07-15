import {
  select as d3Select,
  line as d3Line,
  curveMonotoneX as d3CurveMonotoneX,
  easeQuadInOut as d3EaseQuadInOut,
  scaleLinear as d3ScaleLinear
} from 'd3';

import { configureArc, configureTickData } from './utils';

// helper function to render individual parts of gauge
function _renderSVG({ container, config }) {
  const { width, height, dimensionUnit } = config;

  return d3Select(container)
    .append('svg:svg')
    .attr('class', 'tachometer')
    .attr('width', `${width}${dimensionUnit}`)
    .attr('height', `${height}${dimensionUnit}`);
}

function _renderArcs({ config, svg, centerTx }) {
  const tickData = configureTickData(config);
  const arc = configureArc(config);

  const arcs = svg
    .append('g')
    .attr('class', 'arc')
    .attr('transform', centerTx);

  arcs
    .selectAll('path')
    .data(tickData)
    .enter()
    .append('path')
    .attr('class', 'speedo-segment')
    // eslint-disable-next-line consistent-return
    .attr('fill', (d, i) => {
      if (config.segmentColors && config.segmentColors[i]) {
        return config.segmentColors[i];
      }
    })
    .attr('d', arc);
}

function _renderNeedle({ config, svg, r, centerTx }) {
  const needleLength = Math.round(r * 0.6);

  const lineData = [
    [config.pointerWidth / 2, 0],
    [0, -needleLength],
    [-(config.pointerWidth / 2), 0],
    [0, config.pointerTailLength],
    [config.pointerWidth / 2, 0]
  ];

  const pointerLine = d3Line().curve(d3CurveMonotoneX);

  const pg = svg
    .append('g')
    .data([lineData])
    .attr('class', 'pointer')
    .attr('transform', centerTx)
    .style('fill', '#6C6D6F');

  pg.append('circle')
    .attr('cx', 0)
    .attr('cy', -2)
    .attr('r', 2);

  return pg
    .append('path')
    .attr('d', pointerLine)
    .attr('transform', `rotate(${config.minAngle})`);
}

const render = ({ container, config }) => {
  const r = config.width / 2;
  const centerTx = `translate(${r}, ${r})`;

  const svg = _renderSVG({ container, config });
  _renderArcs({ config, svg, centerTx });

  if (config.showNeedle) {
    const scale = d3ScaleLinear()
      .range([0, 1])
      .domain([config.minValue, config.maxValue]);

    const ratio = scale(config.value);
    const range = config.maxAngle - config.minAngle;

    const newAngle = config.minAngle + ratio * range;
    // update the pointer
    _renderNeedle({ config, svg, r, centerTx })
      .transition()
      .duration(500)
      .ease(d3EaseQuadInOut)
      .attr('transform', `rotate(${newAngle})`);
  }
};

export default render;
