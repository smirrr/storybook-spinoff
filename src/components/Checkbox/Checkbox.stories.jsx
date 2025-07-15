import React, { useState, useEffect } from 'react';
import Box from '../Box'; // Assuming Box component is available
import Checkbox from './index'; // Assuming Checkbox component is available

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'atom'], // Add tags for better organization and autodocs

  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controls whether the checkbox is checked.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the checkbox is disabled.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'If true, the checkbox displays an indeterminate state (e.g., for "Select All").',
    },
    id: {
      control: 'text',
      description: 'The unique ID for the checkbox input element.',
    },
    onChange: {
      action: 'checkbox changed', // Logs change events to the Actions panel
      description: 'Callback function triggered when the checkbox state changes.',
    },
    children: {
      control: 'text',
      description: 'The label content displayed next to the checkbox.',
    },
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    id: 'checkbox_default',
    onChange: () => {}, // Using a simple no-op function for default action logging
    children: 'I accept terms of use',
  },
};

// --- Helper Component for Interactive Checkbox Stories ---
// This wrapper manages the `checked` and `indeterminate` states for interactive stories.
const InteractiveCheckboxWrapper = ({ checked: initialChecked, indeterminate: initialIndeterminate, onChange, ...args }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [isIndeterminate, setIsIndeterminate] = useState(initialIndeterminate);

  // Sync initial props from Storybook controls when they change
  useEffect(() => {
    setIsChecked(initialChecked);
    setIsIndeterminate(initialIndeterminate);
  }, [initialChecked, initialIndeterminate]);

  const handleClick = (e) => {
    // Logic for cycling through checked, indeterminate, and unchecked states
    if (args.indeterminateControl) {
      if (isChecked && !isIndeterminate) { // Currently checked, go to indeterminate
        setIsIndeterminate(true);
        setIsChecked(false);
      } else if (isIndeterminate) { // Currently indeterminate, go to unchecked
        setIsIndeterminate(false);
        setIsChecked(false); // When indeterminate is turned off, it should go to unchecked
      } else { // Currently unchecked, go to checked
        setIsChecked(true);
        setIsIndeterminate(false); // Ensure indeterminate is false when checked
      }
    } else { // Standard checkbox toggle
      setIsChecked(!isChecked);
    }
    onChange(e); // Still call the original onChange prop for action logging
  };

  return (
    <Checkbox
      {...args} // Spread all Storybook args (except the state-controlled ones)
      checked={isChecked}
      indeterminate={isIndeterminate}
      onChange={handleClick}
    />
  );
};

// --- Stories ---

/**
 * A basic interactive checkbox. Click it to toggle its checked state.
 */
export const Default = {
  render: InteractiveCheckboxWrapper, // Use the wrapper for state management
  args: {
    checked: false, // Default initial state
    id: 'checkbox_default',
    children: 'I accept terms of use',
  },
};

/**
 * This checkbox demonstrates the indeterminate state, useful for "Select All" functionality.
 * Click it to cycle through checked, indeterminate, and unchecked states.
 */
export const WithIndeterminateState = {
  render: InteractiveCheckboxWrapper,
  args: {
    checked: true, // Initial state for this specific story
    indeterminate: false, // Initial state for this specific story
    id: 'checkbox_indeterminate',
    children: 'Select All',
    indeterminateControl: true, // Custom prop for the wrapper to handle indeterminate logic
  },
};

/**
 * Displays a set of disabled checkboxes, demonstrating both checked and unchecked disabled states.
 * These checkboxes are not interactive.
 */
export const DisabledCheckboxes = {
  // For static stories without state, a direct render function is concise.
  render: (args) => (
    <Box d="flex" flexDirection="column" opacity="0.5">
      <Checkbox {...args} checked={false} disabled id="checkbox_disabled_false">
        Unchecked Disabled
      </Checkbox>
      <br />
      <Checkbox {...args} checked disabled id="checkbox_disabled_true">
        Checked Disabled
      </Checkbox>
      <br />
      <Checkbox {...args} checked={false} disabled indeterminate id="checkbox_disabled_indeterminate">
        Indeterminate Disabled
      </Checkbox>
    </Box>
  ),
  args: {
    // Override common args for this story.
    // onChange is still called, but the checkbox won't visually change.
    // Children are explicitly set for each checkbox in the render function.
  },
};