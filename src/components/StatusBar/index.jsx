/* eslint-disable prefer-arrow-callback */
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';

const ProgressBarStyled = styled(Box)`
  background: #eaebf0;
  border-radius: 2px;
  display: flex;

  .block {
    display: flex;

    &:first-of-type {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    &:last-of-type {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  .tooltipWrapper {
    display: flex;
    flex: 1;
  }
`;

export const TooltipContentStyled = styled(Box)`
  color: #fff;

  .sbDataContainer {
    margin-top: 8px;
  }
  .sbDataItem {
    display: flex;
    align-items: center;
  }
  .sbDataItemColorCode {
    border-radius: 50%;
    width: 8px;
    height: 8px;
  }

  .sbDataItemInfo {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin-left: 8px;
  }
`;

const TooltipContent = React.memo(function TooltipContent({ title, data }) {
  return (
    <TooltipContentStyled>
      <Box className="sbTitle">{title}</Box>
      <Box className="sbDataContainer">
        {data
          ? data.map(dataItem => (
            <Box className="sbDataItem" key={dataItem.id}>
              <Box
                as="span"
                bg={dataItem ? dataItem.background : null}
                className="sbDataItemColorCode"
              />
              <Box as="span" className="sbDataItemInfo">
                {dataItem ? dataItem.label : null} :{' '}
                {dataItem ? dataItem.value : null}
              </Box>
            </Box>
          ))
          : null}
      </Box>
    </TooltipContentStyled>
  );
});

TooltipContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string,
      value: PropTypes.number
    })
  ),
  /**
   * Title of the tooltip, default to 'Distribution'
   */
  title: PropTypes.string
};
TooltipContent.displayName = 'TooltipContent';

TooltipContent.defaultProps = {
  data: [],
  title: 'Distribution'
};

const TooltipContainer = React.memo(function TooltipContainer({
  data,
  isOpen,
  customTooltipContent,
  title,
  children
}) {
  return (
    <Tooltip
      background="#000"
      className="tooltipWrapper"
      color="#FFF"
      content={
        customTooltipContent || <TooltipContent data={data} title={title} />
      }
      isOpen={isOpen}
    >
      {children}
    </Tooltip>
  );
});

TooltipContainer.propTypes = {
  children: PropTypes.node,
  customTooltipContent: PropTypes.node,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string,
      value: PropTypes.number
    })
  ),
  isOpen: PropTypes.bool,
  /**
   * Title of the tooltip, default to 'Distribution'
   */
  title: PropTypes.string
};

TooltipContainer.defaultProps = {
  children: null,
  customTooltipContent: null,
  data: [],
  isOpen: undefined,
  title: null
};

TooltipContainer.displayName = 'TooltipContainer';

const StatusBar = React.memo(function StatusBar({
  height,
  data,
  enableTooltip,
  customTooltipContent,
  tooltipTitle,
  ...rest
}) {
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const newCount = data
      ? data.reduce(
        (prevValue, currItem) => prevValue + (currItem.value || 0),
        0
      )
      : null;
    setTotalCount(newCount);
  }, [data]);
  return (
    <ProgressBarStyled height={height} {...rest}>
      <TooltipContainer
        customTooltipContent={customTooltipContent}
        data={data}
        isOpen={enableTooltip === true ? undefined : false}
        title={tooltipTitle}
      >
        {data &&
          data.map(dataItem => (
            <Box
              as="span"
              bg={dataItem ? dataItem.background : null}
              className="block blockStyle"
              flex={(dataItem ? dataItem.value : 0) / totalCount}
              key={dataItem.id}
            />
          ))}
      </TooltipContainer>
    </ProgressBarStyled>
  );
});

StatusBar.propTypes = {
  /**
   * Custom component to render in tooltip
   */
  customTooltipContent: PropTypes.node,
  /**
   * Array of data to be rendered
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string,
      value: PropTypes.number
    })
  ),
  /**
   * If true then it will show the data distribution in tooltip by default
   */
  enableTooltip: PropTypes.bool,
  /**
   * Height of the progress bar, default to 16px
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Title of the tooltip, default to 'Distribution'
   */
  tooltipTitle: PropTypes.string
};

StatusBar.defaultProps = {
  customTooltipContent: null,
  data: [],
  enableTooltip: false,
  height: '16px',
  tooltipTitle: 'Distribution'
};

StatusBar.displayName = 'StatusBar';

export default StatusBar;
