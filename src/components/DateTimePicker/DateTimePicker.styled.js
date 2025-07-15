import styled from 'styled-components';
import 'react-datetime/css/react-datetime.css';

const StyledDateTimeSelector = styled.div`
  .dateTimeContainer {
    padding: 6px;
    margin-right: 16px;
  }

  .reactDateTime input {
    cursor: pointer;
  }

  .reactDateTime.below .rdtPicker {
    top: -20px;
  }
  .reactDateTime.above .rdtPicker {
    bottom: -20px;
  }
  .reactDateTime.middle .rdtPicker {
    bottom: -120px;
  }
  .reactDateTime .rdtPicker {
    margin-top: 10px;
    font-size: 14px;
    table {
      border-collapse: separate;
      border-spacing: 4px;
    }
    .dow {
      text-transform: uppercase;
      color: rgb(162, 165, 177);
      font-size: 0.75em;
      font-weight: bold;
    }
    td,
    th {
      line-height: 28px;
    }
    th {
      border: none;
    }

    .rdtDay,
    .rdtHour,
    .rdtMinute,
    .rdtSecond,
    .rdtTimeToggle,
    .rdtMonth,
    .rdtYear {
      :hover {
        color: rgb(109, 108, 111);
        background-color: rgb(229, 241, 255);
        cursor: pointer;
      }
    }

    .rdtTimeToggle {
      color: rgb(109, 108, 111);
    }

    td.rdtSwitch,
    th.rdtSwitch {
      cursor: pointer;
      font-weight: 400;
      :hover {
        background: rgb(229, 241, 255);
      }
    }
    th.rdtNext,
    th.rdtPrev {
      :hover {
        background: transparent;
        span {
          background: rgb(229, 241, 255);
        }
      }
    }
    th.rdtNext span,
    th.rdtPrev span {
      font-weight: 400;
      height: 24px;
      width: 24px;
      position: relative;
      top: -2px;
      display: inline-block;
      line-height: 20px;
      color: #6e6f71;
      background: #f0f0f0;
    }
    td.rdtDay,
    td.rdtMonth,
    td.rdtYear {
      color: rgb(109, 108, 111);
      border-width: 1px 0 1px 0;
      border-style: solid;
      border-color: transparent;
    }
    td.rdtOld,
    td.rdtNew,
    td.rdtDisabled {
      color: rgb(200, 201, 209);
    }
    td.rdtToday:before {
      visibility: hidden;
    }
    .rdtCounters {
      padding-top: 15px;
    }
    .rdtCounter {
      .rdtBtn {
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #6e6f71;
        background-color: transparent;
        :hover {
          background-color: rgb(229, 241, 255);
        }
      }
      .rdtCount {
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        color: #6e6f71;
      }
    }
    .rdtCounterSeparator {
      color: #6e6f71;
      line-height: 74px;
    }
    .rdtDay.rdtToday {
      border-width: 1px;
      border-style: solid;
      border-color: rgb(47, 83, 215);
      border-radius: 2px;
      text-shadow: none;
    }
    .rdtActive {
      background-color: rgb(229, 241, 255);
      color: rgb(109, 108, 111);
      border-width: 1px 0 0 0 !important;
      border-style: solid;
      border-color: rgb(47, 83, 215) !important;
      border-radius: 2px;
      text-shadow: none;
      :hover {
        text-shadow: none;
      }
    }
    .rdtDay.rdtDisabled:hover {
      color: rgb(200, 201, 209);
      background-color: transparent;
      cursor: not-allowed;
    }
    td.rdtMonth,
    td.rdtYear {
      line-height: 50px;
    }
    .rdtControls {
      margin: -18px 0 10px;
      text-align: center;
      button {
        padding: 0 10px;
        width: 95%;
        border: 1px solid;
        font-weight: 500;
        border-radius: 2px;
        color: rgb(47, 83, 215);
        border-color: rgb(47, 83, 215);
        font-size: 14px;
        height: 32px;
        line-height: 30px;
        &:hover {
          outline: none;
          background: rgb(229, 241, 255);
        }
      }
    }
  }
`;

export default StyledDateTimeSelector;
