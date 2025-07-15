import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker'; // The main component is now a named export 'DayPicker'
import 'react-day-picker/dist/style.css';
import Icon from '../Icon';
import { calendar, close } from '../IconLib';
import StyledDateRangePicker from './DateRangePicker.styled';
import MemoizedNavbar from './Navbar';
import DropDown from '../Dropdown';
import { colors } from '../theming/modules/colors';
import {
  formatDate,
  isCheckDateFormatRegex,
  isDateValid,
  monthNameToNumberObject
} from './utils';
import { SimpleButton } from '../Button';

const errorTypes = {
  OUTSIDE_RANGE: 'OUTSIDE_RANGE',
  INVALID_FORMAT: 'INVALID_FORMAT'
};

function DateRangePicker({
  defaultStart,
  defaultEnd,
  onDateChange,
  onInputError,
  recentSelections,
  selectorId,
  isOpen,
  selectReset,
  minDate,
  maxDate,
  setOpen,
  setSelectReset,
  secondaryCtaLabel,
  onClickSecondaryCta,
  isPrimaryCtaDisabled,
  onClickPrimaryCta,
  primaryCtaLabel,
  showResetOption,
  shouldShowFooter
}) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [enteredTo, setEnteredTo] = useState(null);
  const [dayClicked, setDayClicked] = useState(null);
  const [month, setMonth] = useState(new Date());
  const [fromInput, setFromInput] = useState(null);
  const [toInput, setToInput] = useState(null);
  const [inputErrors, setInputErrors] = useState(null);
  const [isHoverOnSelector, setHoverOnSelector] = useState(false);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const getDateObjectFromString = date => {
    if (!date) return null;
    return new Date(date);
  };

  useEffect(() => {
    if (isDateValid(from)) {
      const fromFormat = `${formatDate(
        from,
        'dd$ $MMM'
      )} ${from.getFullYear()}`;
      setFromInput(fromFormat);
    } else {
      setFromInput('');
    }
    if (isDateValid(to)) {
      const toFormat = `${formatDate(to, 'dd$ $MMM')} ${to.getFullYear()}`;
      setToInput(toFormat);
    } else {
      setToInput('');
    }
  }, [from, to]);

  useEffect(() => {
    if (defaultStart && defaultEnd) setInputErrors(null);
  }, [defaultStart, defaultEnd]);

  useEffect(() => {
    if (defaultStart !== undefined) {
      setFrom(defaultStart);
    }
  }, [defaultStart]);

  useEffect(() => {
    if (defaultEnd !== undefined) {
      setTo(defaultEnd);
      setEnteredTo(defaultEnd);
    }
  }, [defaultEnd]);

  const isSelectingFirstDay = day => {
    const isBeforeFirstDay = from && day < from; // Direct comparison
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  const handleResetClick = () => {
    setFrom(null);
    setTo(null);
    setEnteredTo(null);
    if (shouldShowFooter) {
      onClickPrimaryCta([null, null]);
      return;
    }
    if (onDateChange) onDateChange([null, null]);
  };

  useEffect(() => {
    if (selectReset) {
      handleResetClick();
      setSelectReset(false);
    }
  }, [selectReset]);

  const handleDayMouseEnter = (day, modifiers) => {
    if (modifiers.disabled) return;
    if (!isSelectingFirstDay(day)) setEnteredTo(day);
  };

  const handleDayClick = (day, modifiers) => {
    if (modifiers.disabled) return;
    if (from && to) {
      setInputErrors(null);
      if (dayClicked === 'start') {
        if (day > to) {
          handleResetClick();
        }
        toInputRef.current.focus();
        setFrom(day);
        if (onDateChange) onDateChange([day, to]);
      } else if (day < from) {
        setFrom(day);
        setTo(null);
        setEnteredTo(null);
        if (onDateChange) onDateChange([day, null]);
      } else {
        setEnteredTo(day);
        setTo(day);
        if (onDateChange) onDateChange([from, day]);
      }
      return;
    }
    if (isSelectingFirstDay(day)) {
      setFrom(day);
      setTo(null);
      setEnteredTo(null);
      if (onDateChange) onDateChange([day, null]);
    } else {
      setTo(day);
      setEnteredTo(day);
      if (onDateChange) onDateChange([from, day]);
      if (!shouldShowFooter) setOpen(false);
    }
  };

  const openDropdown = e => {
    const closeIcon = document.querySelector(`#${selectorId} .closeIcon`);
    if (e.target === closeIcon) {
      setOpen(false);
      return;
    }
    setOpen(true);
    const datesInputWrapper = document.querySelector(
      `#${selectorId} .datesInputWrapper`
    );
    const inputDue = document.querySelector(`#${selectorId} .inputDue`);
    if (!from && !to) {
      setDayClicked('start');
      fromInputRef.current.focus();
      return;
    }
    if (
      datesInputWrapper === e.target ||
      datesInputWrapper.contains(e.target)
    ) {
      if (e.target === inputDue) setDayClicked('due');
      else setDayClicked('start');
    }
  };

  const convertStringToDateObject = dateString => {
    const dateParts = dateString.split(' ');
    if (dateParts.length < 3) return;
    let monthPart = dateParts[1];
    monthPart = monthPart[0].toUpperCase() + monthPart.slice(1).toLowerCase();
    const dateObject = new Date(
      +dateParts[2],
      monthNameToNumberObject[monthPart],
      +dateParts[0]
    );
    // eslint-disable-next-line consistent-return
    return dateObject;
  };

  const isCheckIfDateIsValid = (inputDateString, inputType) => {
    const dateFormat = inputDateString ? inputDateString.trim() : '';
    if (!dateFormat) return false;
    if (!isCheckDateFormatRegex(dateFormat, 'dd MMM yyyy')) {
      setInputErrors({ ...inputErrors, [inputType]: true });
      return false;
    }
    const dateObj = convertStringToDateObject(dateFormat);
    if (!isDateValid(dateObj)) {
      setInputErrors({ ...inputErrors, [inputType]: true });
      return false;
    }
    setInputErrors({ ...inputErrors, [inputType]: false });
    return true;
  };

  const validateDate = (inputDateString, inputType) => {
    if (!inputDateString) {
      if (inputType === 'start') {
        setFrom(null);
        if (onDateChange) onDateChange([null, to]);
      } else {
        setEnteredTo(null);
        setTo(null);
        if (onDateChange) onDateChange([from, null]);
      }
      return;
    }
    if (!isCheckIfDateIsValid(inputDateString, inputType)) {
      if (inputType === 'start') {
        if (onDateChange) onDateChange([null, to]);
      } else if (onDateChange) onDateChange([from, null]);
      if (onInputError)
        onInputError({ error: true, errorTypes: errorTypes.INVALID_FORMAT });
      return;
    }

    const dateFormat = inputDateString.trim();
    const dateObj = convertStringToDateObject(dateFormat);
    dateObj.setHours(12, 0, 0, 0);
    if (minDate && maxDate) {
      const minDateObject = new Date(minDate);
      minDateObject.setHours(12, 0, 0, 0);
      const maxDateObject = new Date(maxDate);
      maxDateObject.setHours(12, 0, 0, 0);
      if (dateObj < minDateObject || dateObj > maxDateObject) {
        setInputErrors({ ...inputErrors, [inputType]: true });
        if (onInputError)
          onInputError({ error: true, errorType: errorTypes.OUTSIDE_RANGE });
        return;
      }
    }

    if (onInputError) onInputError({ error: false });
    setInputErrors(null);
    if (inputType === 'start') {
      if (dateObj >= to) {
        setTo(null);
        setEnteredTo(null);
        setFrom(dateObj);
        if (onDateChange) onDateChange([dateObj, null]);
        setMonth(dateObj);
        return;
      }
      setMonth(dateObj);
      setFrom(dateObj);
      if (onDateChange) onDateChange([dateObj, to]);
    } else {
      if (dateObj < from) {
        setFrom(null);
        if (onDateChange) onDateChange([null, to]);
        return;
      }
      setMonth(dateObj);
      setTo(dateObj);
      setEnteredTo(dateObj);
      if (onDateChange) onDateChange([from, dateObj]);
    }
  };

  const handleDateInput = (e, inputType) => {
    if (inputType === 'start') {
      setFromInput(e.target.value);
    } else {
      setToInput(e.target.value);
    }
    validateDate(e.target.value, inputType);
  };

  const handleRecentSelections = (startDate, dueDate) => {
    setFrom(startDate);
    setTo(dueDate);
    setEnteredTo(dueDate);
    if (onDateChange) onDateChange([startDate, dueDate]);
  };

  useEffect(() => {
    if (isOpen !== undefined) {
      if (isOpen) {
        setOpen(isOpen);
        return;
      }
      setOpen(false);
    }
  }, [isOpen]);

  const modifiers = { start: from, end: enteredTo };
  const selectedDays = [from, { from, to: enteredTo }];
  const isErrorInInput =
    inputErrors && Object.values(inputErrors).some(item => item);

  const handleOnClickPrimaryCta = () => {
    onClickPrimaryCta([from, to]);
  };

  return (
    <StyledDateRangePicker dateActive={dayClicked} showDropDown={isOpen}>
      <DropDown
        distanceFromSelector={4}
        id={`${selectorId}`}
        isCloseOnClickSelector={false}
        onToggle={state => {
          if (state) {
            setMonth(getDateObjectFromString(from));
          }
          setOpen(state);
        }}
        open={isOpen}
        preferTop={false}
        selector={
          <div
            className={`datesInputWrapper ${
              isErrorInInput ? ' errorDateInput' : ''
            }`}
            onClick={openDropdown}
            onMouseEnter={() => setHoverOnSelector(true)}
            onMouseLeave={() => setHoverOnSelector(false)}
          >
            <div className="inputStartBlock">
              <input
                className="datesInput inputStart"
                onChange={e => handleDateInput(e, 'start')}
                onFocus={() => setDayClicked('start')}
                placeholder="Start date"
                ref={fromInputRef}
                type="text"
                value={fromInput}
              />
            </div>
            <div className="datesTo">to</div>
            <div className="inputDueBlock">
              <input
                className="datesInput inputDue"
                onChange={e => handleDateInput(e, 'due')}
                onFocus={() => setDayClicked('due')}
                placeholder="Due date"
                ref={toInputRef}
                type="text"
                value={toInput}
              />
            </div>
            {isHoverOnSelector && showResetOption && (from || to) ? (
              <Icon
                className="closeIcon"
                color={isErrorInInput ? '#ffeeeb' : colors.grey[10]}
                icon={close}
                onClick={handleResetClick}
              />
            ) : (
              <Icon
                color={isErrorInInput ? '#ffeeeb' : colors.grey[0]}
                icon={calendar}
              />
            )}
          </div>
        }
      >
        {recentSelections && (
          <div className="dateRecentSelections">
            <div className="selectionTitle">
              <img
                alt="export"
                className="icon recentSelectionImage"
                src="/assets/images/dateSelector/recent-selection.svg"
              />
              <div>Recent Selections</div>
            </div>
            <div className="selectionsContainer">
              {recentSelections &&
                recentSelections.map(date => {
                  const startDateSelected = new Date(date.startDate);
                  const dueDateSelected = new Date(date.dueDate);
                  return (
                    <div
                      className="singleSelection"
                      onClick={() =>
                        handleRecentSelections(
                          startDateSelected,
                          dueDateSelected
                        )
                      }
                    >
                      {formatDate(startDateSelected, 'dd$ $MMM')}{' '}
                      {startDateSelected.getFullYear()} -&nbsp;
                      {formatDate(dueDateSelected, 'dd$ $MMM')}{' '}
                      {dueDateSelected.getFullYear()}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <DayPicker
          className="Range"
          disabledDays={{
            before: minDate && new Date(minDate),
            after: maxDate && new Date(maxDate)
          }}
          modifiers={modifiers}
          month={month}
          navbarElement={<MemoizedNavbar />}
          numberOfMonths={2}
          onDayClick={handleDayClick}
          onDayMouseEnter={handleDayMouseEnter}
          onMonthChange={setMonth}
          selectedDays={selectedDays}
        />
        {shouldShowFooter && (
          <div className="dateRangePickerFooterContainer">
            <div
              className="dateRangePickerSecondaryCta"
              onClick={onClickSecondaryCta}
            >
              {secondaryCtaLabel}
            </div>
            <SimpleButton
              className="dateRangePickerPrimaryCta"
              color="primary"
              isDisabled={isPrimaryCtaDisabled}
              onClick={handleOnClickPrimaryCta}
            >
              {primaryCtaLabel}
            </SimpleButton>
          </div>
        )}
      </DropDown>
    </StyledDateRangePicker>
  );
}

DateRangePicker.defaultProps = {
  defaultEnd: '',
  defaultStart: '',
  isOpen: false,
  isPrimaryCtaDisabled: false,
  maxDate: null,
  minDate: null,
  onClickPrimaryCta: null,
  onClickSecondaryCta: null,
  onDateChange: null,
  onInputError: null,
  primaryCtaLabel: 'Apply',
  recentSelections: null,
  secondaryCtaLabel: 'Cancel',
  selectorId: 'dateRangePicker',
  selectReset: false,
  setOpen: null,
  setSelectReset: null,
  shouldShowFooter: false,
  showResetOption: true
};

DateRangePicker.propTypes = {
  defaultEnd: PropTypes.string,
  defaultStart: PropTypes.string,
  isOpen: PropTypes.bool,
  isPrimaryCtaDisabled: PropTypes.bool,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  onClickPrimaryCta: PropTypes.func,
  onClickSecondaryCta: PropTypes.func,
  onDateChange: PropTypes.func,
  onInputError: PropTypes.func,
  primaryCtaLabel: PropTypes.string,
  recentSelections: PropTypes.arrayOf(Object),
  secondaryCtaLabel: PropTypes.string,
  selectorId(props, propName) {
    if (propName === 'selectorId' && props[propName] === 'dateRangePicker') {
      throw new Error(
        'Please add selectorId prop to DateRangePicker component.'
      );
    }
  },
  selectReset: PropTypes.bool,
  setOpen: PropTypes.func,
  setSelectReset: PropTypes.func,
  shouldShowFooter: PropTypes.bool,
  showResetOption: PropTypes.bool
};

export default DateRangePicker;
