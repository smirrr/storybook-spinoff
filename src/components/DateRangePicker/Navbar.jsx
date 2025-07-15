import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { chevronLeft, chevronRight } from '../IconLib';
import { colors } from '../theming/modules/colors';
import Icon from '../Icon';

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  .rangeIcon {
    padding: 0 5px;
  }
  .selectedStartRange {
    padding-top: 10px;
    display: flex;
    flex: 0 1 50%;
    align-items: center;
    border-right: 0.5px solid #ccc;
    font-size: 15px;
  }
  .selectedEndRange {
    padding-top: 10px;
    display: flex;
    flex: 0 1 50%;
    align-items: center;
    font-size: 15px;
  }
  .selectedRange {
    display: flex;
    width: 100%;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    color: #70707e;
  }
  .previousButton,
  .nextButton {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &.disabled {
      background-color: #f0f0f0;
      pointer-events: none;
    }
  }
  .previousButton {
    justify-content: flex-start;
    flex: 0 1 30%;
    padding-left: 18px;
  }
  .nextButton {
    justify-content: flex-end;
    flex: 0 1 35%;
    padding-right: 18px;
  }
  .selectedEndMonth {
    flex: 0 1 65%;
    text-align: end;
  }
`;

function Navbar(props) {
  const {
    showPreviousButton,
    showNextButton,
    month,
    nextMonth,
    onPreviousClick,
    onNextClick,
    className,
    localeUtils,
  } = props;
  const months = localeUtils.getMonths();
  const curr = months[month.getMonth()];
  const next =
    months[nextMonth.getMonth() - 1 >= 0 ? nextMonth.getMonth() - 1 : 11];
  const nextYear = nextMonth ? nextMonth.getFullYear() : 0;
  const computedNextYear = nextYear - (nextMonth.getMonth() - 1 >= 0 ? 0 : 1);

  return (
    <NavbarContainer className={className}>
      <div className="selectedRange">
        <div className="selectedStartRange">
          <div
            className={`previousButton${showPreviousButton ? '' : ' disabled'}`}
            onClick={() => {
              if (showPreviousButton) onPreviousClick();
            }}
          >
            <Icon color={colors.grey[10]} icon={chevronLeft} size="m" />
          </div>
          <span>
            {curr && curr.slice(0, 3)} {month && month.getFullYear()}
          </span>
        </div>
        <div className="selectedEndRange">
          <span className="selectedEndMonth">
            {next && next.slice(0, 3)} {computedNextYear}
          </span>
          <div
            className={`nextButton${showNextButton ? '' : ' disabled'}`}
            onClick={() => {
              if (showNextButton) onNextClick();
            }}
          >
            <Icon color={colors.grey[10]} icon={chevronRight} size="m" />
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}

const MemoizedNavbar = memo(Navbar);

export default MemoizedNavbar;

Navbar.propTypes = {
  className: PropTypes.string,
  localeUtils: PropTypes.object,
  month: PropTypes.object,
  nextMonth: PropTypes.object,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  showNextButton: PropTypes.func,
  showPreviousButton: PropTypes.func,
};

Navbar.defaultProps = {
  className: null,
  localeUtils: null,
  month: null,
  nextMonth: null,
  onNextClick: null,
  onPreviousClick: null,
  showNextButton: null,
  showPreviousButton: null,
};
