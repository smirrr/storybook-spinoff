import styled from 'styled-components';
import { colors } from '../theming/modules/colors';

const StyledDateRangePicker = styled.div`
  .dropDownBody {
    border-radius: 4px;
  }
  .DayPicker-Caption {
    display: none;
  }
  .Range {
    border: 1px solid #fff;
    border-radius: 4px;
    background-color: #ffffff;
    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
      background-color: #e8edff !important;
      color: #202124;
      font-weight: 400;
    }
    .DayPicker-Day {
      border-radius: 0 !important;
      min-width: 14px;
      min-height: 14px;
      padding: 8.5px 9.5px;
      color: #202124;
      font-size: 14px;
    }
    .DayPicker-wrapper {
      padding-bottom: 0;
    }
    .DayPicker-Month {
      display: block;
      padding-bottom: 1em;
      &:first-child {
        border-right: 0.5px solid #ccc;
        padding: 0 1em;
        padding-top: 1em;
        margin: 0;
        margin-top: 0;
      }
    }
    .DayPicker-Months {
      flex-wrap: nowrap;
    }
    .DayPicker-Day--today:not(.DayPicker-Day--outside) {
      color: initial;
      font-weight: 400;
      color: #202124;
    }
    .DayPicker-Day--disabled {
      background-color: #eeeeee !important;
      color: #fff !important;
      cursor: not-allowed;
    }
    .DayPicker-Day--start:not(.DayPicker-Day--outside),
    .DayPicker-Day--end:not(.DayPicker-Day--outside),
    &:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: #2f53d7 !important;
      color: #fff !important;
      border-radius: 50% !important;
    }
  }
  .dropDownWrapper {
    width: 266px;
  }
  .datesInputWrapper {
    display: flex;
    padding: 0 8px;
    width: 240px;
    color: rgb(109, 108, 111);
    border-radius: 4px;
    background-color: #f8f8fa;
    flex: 1 1 0%;
    justify-content: space-between;
    align-items: center;
    border: ${props =>
    props.showDropDown ? '1px solid #2F53D7' : '1px solid #ffffff'};
    .closeIcon {
      border: 1px solid rgb(200, 201, 209);
      border-radius: 50%;
      background-color: rgb(200, 201, 209);
      color: #f8f8fa;
      width: 14px;
      height: 14px;
      cursor: pointer;
      &:hover {
        background-color: rgb(111, 111, 111);
        border: 1px solid rgb(111, 111, 111);
      }
    }
  }
  .errorDateInput {
    border: 1px solid #df2e2e;
    background-color: #ffeeeb;
    .inputStart {
      background: #ffeeeb;
    }
    .inputDue {
      background: #ffeeeb;
    }
  }
  .focusedDateInput {
    border-color: #2f53d7;
  }
  .datesTo {
    padding: 0 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #808080;
  }
  .datesInput {
    margin: 10px 0;
    font-weight: 400;
    font-size: 14px;
    width: 82px;
    border: none;
    background-color: #f8f8fa;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  .inputStart {
    background: ${props =>
    props.showDropDown && props.dateActive === 'start'
      ? '#e8edff'
      : '#F8F8FA'};
  }
  .inputDue {
    background: ${props =>
    props.showDropDown && props.dateActive === 'due' ? '#e8edff' : '#F8F8FA'};
  }
  .dateRecentSelections {
    display: flex;
    align-items: center;
    margin-left: 24px;
    margin-bottom: 5px;
    margin-top: 8px;
    .recentSelectionImage {
      margin-right: 6px;
      width: 14px;
      height: 12px;
    }
    .selectionTitle {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-right: 8px;
      font-weight: 600;
      color: ${colors.grey[50]};
    }
    .selectionsContainer {
      display: flex;
      align-items: center;
      .singleSelection {
        font-weight: 500;
        cursor: pointer;
        padding: 6px 12px;
        border: 1px solid ${colors.grey[70]};
        border-radius: 23px;
        color: ${colors.grey[20]};
        font-size: 10px;
        margin-left: 8px;
        &:hover {
          background: ${colors.blue[90]};
          border: 1px solid ${colors.blue[90]};
        }
      }
      &::before {
        content: '';
        width: 1px;
        height: 16px;
        background-color: #e7e8ed;
      }
    }
  }

  .dateRangePickerFooterContainer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 0.5px solid #ccc;
    padding: 12px 24px;
  }

  .dateRangePickerSecondaryCta {
    color: #010101;
    margin-right: 20px;
    cursor: pointer;
  }

  .dateRangePickerPrimaryCta {
    padding: 8px 60px;
  }
`;

export default StyledDateRangePicker;
