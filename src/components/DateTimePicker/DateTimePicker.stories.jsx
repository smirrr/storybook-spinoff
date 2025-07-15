import React, { useState, useRef, useEffect } from 'react';
import DateTimePicker from '.';
import Box from '../Box';

export default {
  title: 'Molecules/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs', 'molecule'],

  argTypes: {
    label: {
      control: 'text',
      description: 'The label displayed for the date-time picker.',
    },
    value: {
      control: 'date',
      description: 'The currently selected date and time.',
    },
    onChange: {
      action: 'datetime changed',
      description: 'Callback function triggered when the date and/or time changes.',
    },
    showConfirmInTime: {
      control: 'boolean',
      description: 'If true, displays a "Confirm" button in the time selection view.',
    },
  },
  args: {
    label: 'Start date & time',
    value: new Date(),
    onChange: () => {}, // Using a simple no-op function for action logging
    showConfirmInTime: false,
  },
};

const DateTimePickerStoryWrapper = (args) => {
  const [date, setDate] = useState(args.value);
  const pickerRef = useRef(null);

  useEffect(() => {
    setDate(args.value);
  }, [args.value]);

  const handleDateTimeChange = (dt) => {
    const newDate = dt && dt._d instanceof Date ? dt._d : dt;
    setDate(newDate);
    args.onChange(dt);
  };

  return (
    <Box maxWidth="400px">
      <DateTimePicker
        {...args}
        value={date}
        onChange={handleDateTimeChange}
        ref={pickerRef}
      />
      <p style={{ marginTop: '20px' }}>
        Current Selection: {date ? date.toLocaleString() : 'None'}
      </p>
    </Box>
  );
};

export const DefaultPicker = {
  render: DateTimePickerStoryWrapper,
  args: {},
};

export const WithConfirmButton = {
  render: DateTimePickerStoryWrapper,
  args: {
    showConfirmInTime: true,
    value: new Date(2025, 6, 15, 10, 30),
  },
};