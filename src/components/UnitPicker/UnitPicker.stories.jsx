import React, { useState } from 'react';
// import { fn } from '@storybook/test'; // Removed this import
import UnitPicker from '.';
import Box from '../Box';

export default {
  title: 'Molecules/UnitPicker',
  component: UnitPicker,
  tags: ['autodocs', 'molecule'],
  args:{
    ctaLabel: 'Confirm',
    placeholder: 'Select a unit',
  },
  argTypes: {


    // We can still define 'action' for documentation purposes,
    // but it won't automatically log unless we manually call a Storybook action.
    // For direct prop assignment, without 'fn()', it just means the prop accepts a function.
    onConfirm: {
      description: 'Callback function triggered when the user confirms their selection.',
      // action: 'onConfirm', // Removed this line if you truly don't want any action logging at all.
                              // If you want logging but not 'fn()', you'd need to explicitly import
                              // `action` from '@storybook/addon-actions' and call it within handleConfirm.
                              // For simplicity, removing it entirely for "without that".
    },
    unit: {
      control: 'select',
      options: ['DAYS', 'WEEKS', 'MONTHS', null],
      description: 'The currently selected unit.',
    },
    unitOptions: {
      control: 'array',
      description: 'An array of available unit options.',
    },
    value: {
      control: 'number',
      description: 'The currently selected numeric value.',
    },
    valueRange: {
      control: 'object',
      description: 'An object defining the min and max allowed values { min, max }.',
    },
    ctaLabel: {
      control: 'text',
      description: 'Text for the call-to-action button.',
    },
    noUnitSuffix: {
      control: 'text',
      description: 'Suffix to display when no unit is selected.',
    },
  },
  // Removed 'args: { onConfirm: fn() }' from default export
  // as we are not using 'fn()' anymore.
};

export const Default = {
  render: (args) => {
    const [pickerValue, setPickerValue] = useState(args.value);
    const [pickerUnit, setPickerUnit] = useState(args.unit);

    // This handler only updates local state now.
    // It will NOT log to Storybook's "Actions" tab automatically.
    const handleConfirm = (data) => {
      console.log('UnitPicker confirmed:', data); // You can add a console log for debugging
      setPickerValue(data.value);
      setPickerUnit(data.unit);
      // args.onConfirm(data); // Removed this call as args.onConfirm is no longer a 'fn()' mock
    };

    return (
      <Box maxWidth="400px">
        <UnitPicker
          {...args}
          onConfirm={handleConfirm} // Pass our local handler
          unit={pickerUnit}
          unitOptions={['DAYS', 'WEEKS', 'MONTHS']}
          value={pickerValue}
          valueRange={{
            max: 7,
            min: 1,
          }}
        />
      </Box>
    );
  },
  // args: {
  //   value: null,
  //   unit: null,
  //   // onConfirm: () => {}, // You could optionally provide a no-op function here if your component
  //                         // strictly expects a function for 'onConfirm', even if it doesn't log.
  // },
};

export const NoUnits = {
  render: (args) => {
    const [pickerValue, setPickerValue] = useState(args.value);

    const handleConfirm = (data) => {
      console.log('UnitPicker (no units) confirmed:', data); // Console log for debugging
      setPickerValue(data.value);
      // args.onConfirm(data); // Removed this call
    };

    return (
      <Box maxWidth="400px">
        <UnitPicker
          {...args}
          ctaLabel="Save"
          noUnitSuffix="times"
          onConfirm={handleConfirm} // Pass our local handler
          value={pickerValue}
          valueRange={{
            max: 15,
            min: 10,
          }}
        />
      </Box>
    );
  },
  // args: {
  //   value: null,
  //   // onConfirm: () => {}, // Optional no-op
  // },
};