/* eslint-disable react/jsx-fragments */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TrendLine = ({
  data,
  height,
  width,
  visibleDataLimit,
  hideFirstScoreText,
  hideLastScoreText
}) => {
  const [xAxisSingleUnit, setXAxisSingleUnit] = useState(0);
  const [yAxisSingleUnit, setYAxisSingleUnit] = useState(0);
  const [minScoreState, setMinScoreState] = useState(0);
  const [maxScoreState, setMaxScoreState] = useState(0);
  const [numberOfOmittedPoints, setNumberOfOmittedPoints] = useState(0);
  const [dataWithOmission, setDataWithOmission] = useState([]);
  const [dataHoverIndex, setDataHoverIndex] = useState(-1);
  const padding = height / 4;

  const getBasicDetailsFOrCoordinateMapping = () => {
    let minScore = Number.MAX_SAFE_INTEGER;
    let maxScore = Number.MIN_SAFE_INTEGER;
    let numberOfOmittedScores = 0;
    let dataArrayWithOmission = [];
    if (visibleDataLimit && visibleDataLimit < data.length) {
      numberOfOmittedScores = data.length - visibleDataLimit;
      setNumberOfOmittedPoints(numberOfOmittedScores);
      dataArrayWithOmission = data.filter((element, index) => {
        if (index !== 0 && index < numberOfOmittedScores + 1) return false;
        return true;
      });
      setDataWithOmission(dataArrayWithOmission);
    } else {
      dataArrayWithOmission = data;
      setDataWithOmission(data);
    }
    const numberOfScores = dataArrayWithOmission.length;
    for (let dataIndex = 0; dataIndex < data.length; dataIndex += 1) {
      if (data[dataIndex].score < minScore) minScore = data[dataIndex].score;
      if (data[dataIndex].score > maxScore) maxScore = data[dataIndex].score;
    }
    return {
      minScore,
      maxScore,
      numberOfScores
    };
  };

  const getYaxisSingleUnit = (maxScore, minScore) => {
    const absDiffBtwMaxAndMin = Math.abs(maxScore - minScore);
    if (absDiffBtwMaxAndMin > Math.max(Math.abs(maxScore), Math.abs(maxScore)))
      return (height - 2 * padding) / absDiffBtwMaxAndMin;
    return (
      (height - 2 * padding) /
      (Math.max(Math.abs(maxScore), Math.abs(maxScore)) || 1)
    );
  };

  const getYValueMappingForCorrespondingScore = score => {
    if (maxScoreState === minScoreState) return height / 2;
    if (maxScoreState < 0 || minScoreState < 0)
      return (
        -(score * yAxisSingleUnit + padding) +
        (height - Math.abs(yAxisSingleUnit * minScoreState))
      );
    return -(score * yAxisSingleUnit + padding) + height;
  };

  useEffect(() => {
    const {
      maxScore,
      minScore,
      numberOfScores
    } = getBasicDetailsFOrCoordinateMapping();
    setXAxisSingleUnit((width - padding) / (numberOfScores - 1));
    setYAxisSingleUnit(getYaxisSingleUnit(maxScore, minScore));
    setMinScoreState(minScore);
    setMaxScoreState(maxScore);
  }, [height, width, data]);

  const createPositionMappingForScores = () => {
    const positionMap = [];
    for (
      let dataIndex = 0;
      dataIndex < dataWithOmission.length;
      dataIndex += 1
    ) {
      const yValue = getYValueMappingForCorrespondingScore(
        dataWithOmission[dataIndex].score
      );

      positionMap.push({
        x: xAxisSingleUnit * dataIndex + padding / 2,
        y: yValue
      });
    }
    return positionMap;
  };

  const onDataMouseOverHandler = index => {
    setDataHoverIndex(index);
  };
  const onDataMouseLeaveHandler = () => {
    setDataHoverIndex(-1);
  };

  const getCircularPointsForData = () => {
    return (
      <React.Fragment>
        {createPositionMappingForScores().map(
          (dataPoint, index, dataPoints) => {
            return (
              <React.Fragment>
                {index < dataPoints.length - 1 ? (
                  <line
                    stroke="#c8c9d1"
                    strokeDasharray={`2,${
                      index === 0 && numberOfOmittedPoints > 0 ? '2' : 0
                    }`}
                    strokeWidth={2}
                    x1={dataPoint.x}
                    x2={dataPoints[index + 1].x}
                    y1={dataPoint.y}
                    y2={dataPoints[index + 1].y}
                  />
                ) : null}
                {(index === 0 && !hideFirstScoreText) ||
                (index === dataPoints.length - 1 && !hideLastScoreText) ||
                index === dataHoverIndex ? (
                    <text
                      dominantBaseline="middle"
                      fill={dataWithOmission[index].color}
                      style={{ font: 'bold 10px sans-serif' }}
                      textAnchor="middle"
                      x={dataPoint.x}
                      y={dataPoint.y - 15}
                    >
                      {dataWithOmission[index].score}
                    </text>
                  ) : null}

                <g
                  filter="url(#shadow)"
                  onFocus={() => null}
                  onMouseLeave={() => onDataMouseLeaveHandler()}
                  onMouseOver={() => onDataMouseOverHandler(index)}
                >
                  <circle
                    cx={dataPoint.x}
                    cy={dataPoint.y}
                    fill="#ffffff"
                    r={
                      index === 0 ||
                      index === dataPoints.length - 1 ||
                      index === dataHoverIndex
                        ? '6'
                        : '4'
                    }
                  />
                  <circle
                    cx={dataPoint.x}
                    cy={dataPoint.y}
                    fill={dataWithOmission[index].color}
                    r={
                      index === 0 ||
                      index === dataPoints.length - 1 ||
                      index === dataHoverIndex
                        ? '5'
                        : '3'
                    }
                  />
                </g>
              </React.Fragment>
            );
          }
        )}
      </React.Fragment>
    );
  };

  return (
    <svg height={height} width={width}>
      <defs>
        <filter id="shadow">
          <feDropShadow
            dx="0.5"
            dy="0.4"
            floodColor="#444444"
            floodOpacity="0.5"
            stdDeviation="1"
          />
        </filter>
      </defs>
      {getCircularPointsForData()}
    </svg>
  );
};

TrendLine.propTypes = {
  /**
   * Data object for each point
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      hoverText: PropTypes.string,
      score: PropTypes.number.isRequired
    })
  ).isRequired,
  /**
   * height of the svg
   */
  height: PropTypes.number.isRequired,
  /**
   * hide the first score text from trendLine
   */
  hideFirstScoreText: PropTypes.bool,
  /**
   * hide the first score text from trendLine
   */
  hideLastScoreText: PropTypes.bool,
  /**
   * Number of points to show at max
   */
  visibleDataLimit: PropTypes.number.isRequired,
  /**
   * width of the svg
   */
  width: PropTypes.number.isRequired
};

TrendLine.defaultProps = {
  hideFirstScoreText: false,
  hideLastScoreText: false
};

TrendLine.displayName = 'TrendLine';
export default TrendLine;
