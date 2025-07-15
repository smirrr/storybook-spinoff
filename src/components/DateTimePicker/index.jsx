import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import StyledDateTimeSelector from './DateTimePicker.styled';
import { Input } from '../Input';
import { eventSchedule } from '../IconLib';
import FormControl from '../FormControl';

const DateTimePicker = forwardRef(
  (
    {
      icon,
      iconOrientation,
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      value,
      variant,
      positionVariant,
      showConfirmInTime,
      renderDayWrapper,
      renderCustomValue,
      ...rest
    },
    ref
  ) => {
    const inputProps = {
      icon,
      iconOrientation,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      variant
    };
    const formControlProps = {
      value,
      isDisabled,
      isInvalid,
      isReadOnly,
      isRequired
    };
    const datetimeProps = { ...rest };

    const [dateValue, setDateValue] = useState(null);

    useEffect(() => {
      setDateValue(value);
    }, [value]);

    const handleDateTimeChange = dt => {
      onChange(dt);
    };

    // openCalendar, closeCalendar can also be passed as params.
    const renderInput = props => (
      <FormControl {...formControlProps}>
        <Input
          {...inputProps}
          {...props}
          value={renderCustomValue ? value : props.value}
        />
      </FormControl>
    );

    const renderDay = (props, currentDate) => (
      <td {...props}>
        {renderDayWrapper ? renderDayWrapper(currentDate) : currentDate.date()}
      </td>
    );

    const renderView = (mode, renderDefault) => {
      // Show confirm button to close calendar
      if (!showConfirmInTime || ['years', 'months', 'days']?.includes(mode))
        return renderDefault();

      return (
        <div className="wrapper">
          {renderDefault()}
          <div className="rdtControls">
            <button onClick={() => ref.current._closeCalendar()} type="button">
              Confirm
            </button>
          </div>
        </div>
      );
    };
    return (
      <StyledDateTimeSelector>
        <Datetime
          className={`reactDateTime ${positionVariant}`}
          onChange={handleDateTimeChange}
          ref={ref}
          renderDay={renderDay}
          renderInput={renderInput}
          renderView={(mode, renderDefault) => renderView(mode, renderDefault)}
          value={dateValue}
          {...datetimeProps}
        />
      </StyledDateTimeSelector>
    );
  }
);

DateTimePicker.propTypes = {
  /**
   * Pass an `icon` from IconLib for when `variant` is set to `withIcon`. Only applicable for variant = `withIcon`
   */
  icon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * Orientation of the icon
   */
  iconOrientation: PropTypes.oneOf(['left', 'right']),
  /**
   * If true, datetime input is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * If true, datetime input has error styles applied
   */
  isInvalid: PropTypes.bool,
  /**
   * If true, datetime input is read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * If true, datetime input has `required` attribute set to true, along with `aria-required` attribute
   */
  isRequired: PropTypes.bool,
  /**
   * Label for input field. Only applicable when variant = `basic` or `basicWithIcon`
   */
  label: PropTypes.string,
  /**
   * onBlur function of the input
   */
  onBlur: PropTypes.func,
  /**
   * onChange function of the input
   */
  onChange: PropTypes.func,
  /**
   * onFocus function of the input
   */
  onFocus: PropTypes.func,
  /**
   * Native placeholder attribute
   */
  placeholder: PropTypes.string,
  /**
   * Open calendar below, middle or above the input field
   */
  positionVariant: PropTypes.oneOf(['default', 'below', 'middle', 'above']),
  /**
   * Customize date cell in the calendar. A moment object will be passed to the function
   */
  renderDayWrapper: PropTypes.func,
  /**
   * Show confirm button to close calendar in time view. Ref is neccessary for this.
   */
  showConfirmInTime: PropTypes.bool,
  /**
   * If supplied, input will have a pre-filled value
   */
  value: PropTypes.string,
  /**
   * `basic` variant includes the `material design style input label`. `withIcon` does not include a label.
   */
  variant: PropTypes.oneOf([
    'basic',
    'basicWithIcon',
    'withoutLabel',
    'withIcon',
    'withIconClick'
  ]),
  /**
   * If supplied, input will have customised value
   */
  renderCustomValue: PropTypes.bool
};

DateTimePicker.defaultProps = {
  icon: eventSchedule,
  iconOrientation: 'right',
  isDisabled: undefined,
  isInvalid: undefined,
  isReadOnly: true,
  isRequired: undefined,
  label: undefined,
  onBlur: null,
  onChange: null,
  onFocus: null,
  placeholder: null,
  positionVariant: 'default',
  renderCustomValue: false,
  renderDayWrapper: null,
  showConfirmInTime: false,
  value: '',
  variant: 'basicWithIcon'
};

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
