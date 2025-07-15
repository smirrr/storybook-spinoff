import React, { Fragment, useState, useEffect } from 'react';
import DateRangePicker from './index';

export default {
  component: DateRangePicker,
  title: 'Molecules/DateRangePicker',
  tags: ['autodocs', 'molecule'],

  argTypes: {
    defaultStart: {
      control: 'date',
      description: 'The initially selected start date.',
    },
    defaultEnd: {
      control: 'date',
      description: 'The initially selected end date.',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the date range picker.',
    },
    selectorId: {
      control: 'text',
      description: 'A unique ID for the selector element that triggers the picker.',
    },
    setOpen: {
      action: 'setOpen called',
      description: 'Callback function to update the `isOpen` state.',
    },
    onDateChange: {
      action: 'date range changed',
      description: 'Callback function triggered when the selected date range changes.',
    },
    minDate: {
      control: 'date',
      description: 'The earliest selectable date.',
    },
    maxDate: {
      control: 'date',
      description: 'The latest selectable date.',
    },
    shouldShowFooter: {
      control: 'boolean',
      description: 'If true, displays a footer with action buttons.',
    },
    showResetOption: {
      control: 'boolean',
      description: 'If true and `shouldShowFooter` is true, displays a "Reset" button in the footer.',
    },
    onClickPrimaryCta: {
      action: 'primary CTA clicked',
      description: 'Callback for the primary CTA button in the footer.',
    },
    onClickSecondaryCta: {
      action: 'secondary CTA clicked',
      description: 'Callback for the secondary CTA button in the footer.',
    },
  },
  args: {
    defaultStart: null,
    defaultEnd: null,
    isOpen: false,
    selectorId: 'date-range-picker-selector',
    setOpen: () => {}, // Using a simple no-op function for action logging
    onDateChange: () => {}, // Using a simple no-op function for action logging
    minDate: undefined,
    maxDate: undefined,
    shouldShowFooter: false,
    showResetOption: true,
    onClickPrimaryCta: () => {}, // Using a simple no-op function for action logging
    onClickSecondaryCta: () => {}, // Using a simple no-op function for action logging
  },
};

export const Default = {
  render: (args) => {
    const [isOpen, setOpen] = useState(args.isOpen);
    const [startDate, setStartDate] = useState(args.defaultStart);
    const [endDate, setEndDate] = useState(args.defaultEnd);

    useEffect(() => {
      setStartDate(args.defaultStart);
      setEndDate(args.defaultEnd);
      setOpen(args.isOpen);
    }, [args.defaultStart, args.defaultEnd, args.isOpen]);

    const handleDateChange = (range) => {
      setStartDate(range.at(0));
      setEndDate(range.at(1));
      args.onDateChange(range);
    };

    return (
      <Fragment>
        <DateRangePicker
          {...args}
          defaultStart={startDate}
          defaultEnd={endDate}
          isOpen={isOpen}
          setOpen={(state) => {
            setOpen(state);
            args.setOpen(state);
          }}
          onDateChange={handleDateChange}
        />
        <p style={{ marginTop: '20px' }}>
          Selected Range: {startDate?.toLocaleDateString() || 'None'} - {endDate?.toLocaleDateString() || 'None'}
        </p>
      </Fragment>
    );
  },
  args: {
    defaultStart: new Date(2025, 0, 15),
    defaultEnd: new Date(2025, 0, 25),
    selectorId: 'default-picker-trigger',
  },
};

export const WithDateConstraints = {
  render: (args) => {
    // Picker 1
    const [isOpen1, setOpen1] = useState(false);
    const [startDate1, setStartDate1] = useState(args.defaultStart);
    const [endDate1, setEndDate1] = useState(args.defaultEnd);

    // Picker 2
    const [isOpen2, setOpen2] = useState(false);
    const [startDate2, setStartDate2] = useState(args.defaultStart);
    const [endDate2, setEndDate2] = useState(args.defaultEnd);

    useEffect(() => {
      setStartDate1(args.defaultStart);
      setEndDate1(args.defaultEnd);
      setStartDate2(args.defaultStart);
      setEndDate2(args.defaultEnd);
    }, [args.defaultStart, args.defaultEnd]);

    const handleDateChange1 = (range) => {
      setStartDate1(range.at(0));
      setEndDate1(range.at(1));
      args.onDateChange(range);
    };

    const handleDateChange2 = (range) => {
      setStartDate2(range.at(0));
      setEndDate2(range.at(1));
      args.onDateChange(range);
    };

    return (
      <Fragment>
        <h4>Picker with Constraints</h4>
        <DateRangePicker
          {...args}
          defaultStart={startDate1}
          defaultEnd={endDate1}
          isOpen={isOpen1}
          setOpen={(state) => {
            setOpen1(state);
            args.setOpen(state);
          }}
          onDateChange={handleDateChange1}
          selectorId="constrained-picker-trigger"
          minDate={args.minDate || new Date(2023, 6, 21)}
          maxDate={args.maxDate || new Date(2023, 7, 21)}
        />
        <p style={{ marginTop: '10px' }}>
          Picker 1 Range: {startDate1?.toLocaleDateString() || 'None'} - {endDate1?.toLocaleDateString() || 'None'}
        </p>

        <h4 style={{ marginTop: '30px' }}>Another Picker (with Footer)</h4>
        <DateRangePicker
          {...args}
          defaultStart={startDate2}
          defaultEnd={endDate2}
          isOpen={isOpen2}
          setOpen={(state) => {
            setOpen2(state);
            args.setOpen(state);
          }}
          onDateChange={handleDateChange2}
          selectorId="footer-picker-trigger"
          shouldShowFooter
          showResetOption={false}
        />
        <p style={{ marginTop: '10px' }}>
          Picker 2 Range: {startDate2?.toLocaleDateString() || 'None'} - {endDate2?.toLocaleDateString() || 'None'}
        </p>
      </Fragment>
    );
  },
  args: {
    defaultStart: new Date(2023, 6, 25),
    defaultEnd: new Date(2023, 7, 5),
  },
};

export const WithCustomFooterActions = {
  render: (args) => {
    const [isOpen, setOpen] = useState(false);
    const [start, setStart] = useState(args.defaultStart);
    const [end, setEnd] = useState(args.defaultEnd);

    useEffect(() => {
      setStart(args.defaultStart);
      setEnd(args.defaultEnd);
    }, [args.defaultStart, args.defaultEnd]);

    const onClickPrimaryCta = (range) => {
      setStart(range.at(0));
      setEnd(range.at(1));
      setOpen(false);
      args.onClickPrimaryCta(range);
    };

    const onClickSecondaryCta = () => {
      setStart(null);
      setEnd(null);
      setOpen(false);
      args.onClickSecondaryCta();
    };

    return (
      <Fragment>
        <DateRangePicker
          {...args}
          defaultStart={start}
          defaultEnd={end}
          isOpen={isOpen}
          setOpen={(state) => {
            setOpen(state);
            args.setOpen(state);
          }}
          selectorId="footer-actions-picker-trigger"
          shouldShowFooter
          showResetOption={false}
          onClickPrimaryCta={onClickPrimaryCta}
          onClickSecondaryCta={onClickSecondaryCta}
        />
        <p style={{ marginTop: '20px' }}>
          Selected Range: {start?.toLocaleDateString() || 'None'} - {end?.toLocaleDateString() || 'None'}
        </p>
      </Fragment>
    );
  },
  args: {
    defaultStart: new Date(2024, 5, 1),
    defaultEnd: new Date(2024, 5, 30),
    shouldShowFooter: true,
    showResetOption: false,
  },
};