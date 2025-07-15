import React from 'react';
// import { action } from 'storybook/actions';

import * as Icons from '../../IconLib'; // Assuming this correctly imports your icon components
import DropdownButton, {
  dropdownButtonVariants,
  dropdownButtonSizes
} from './index'; // Assuming '.' refers to your DropdownButton component

// Helper to get icon options for the argType 'select' control
const IconsSelectOptions = Object.keys(Icons).reduce((acc, key) => {
  if (typeof Icons[key] === 'function' || (typeof Icons[key] === 'object' && Icons[key] !== null && Icons[key].$$typeof === Symbol.for('react.element'))) {
    // Basic check to include only React components from IconsLib
    acc[key] = key; // Use the key as both label and value
  }
  return acc;
}, { 'None': null }); // Add a 'None' option to clear the icon


export default {
  title: 'Atoms/Buttons/DropdownButton',
  // subtitle: '', // Subtitle is typically not used in modern Storybook; use tags or component descriptions
  component: DropdownButton,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define default args for all stories in this file
  args: {
    children: 'Button', // Default text for the button
    isActive: false,
    isDisabled: false,
    isLoading: false,
    leftIcon: null, // Default to no left icon
    loadingText: null, // Default to no loading text
    // onClick is typically handled via action in argTypes, or explicitly in stories if needed
    size: dropdownButtonSizes[0], // Default to the first size
    variant: dropdownButtonVariants[0], // Default to the first variant
    badgeCount: 0, // Default to no badge count
  },

  // Define argTypes to create interactive controls for your props
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'The text content displayed inside the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    isActive: {
      control: { type: 'boolean' },
      description: 'If `true`, the button will appear in an active state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'If `true`, the button will be disabled and unclickable.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'If `true`, the button will display a loading spinner and optional loading text.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: { type: 'select' },
      options: Object.values(IconsSelectOptions), // Pass the actual icon components as options
      mapping: Icons, // Map option values (string names) to actual Icon components
      description: 'Icon component to display on the left side of the button.',
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: 'null' },
      },
    },
    loadingText: {
      control: { type: 'text' },
      description: 'Text to display when the button is in a loading state.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'null' },
      },
    },
    onClick: {
      action: 'buttonClick', // This will log an action when the onClick prop is called
      description: 'Callback function invoked when the button is clicked.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: { type: 'radio' }, // Use 'radio' for a set of mutually exclusive options
      options: dropdownButtonSizes,
      description: 'Defines the size of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: dropdownButtonSizes[0] },
      },
    },
    variant: {
      control: { type: 'radio' }, // Use 'radio' for a set of mutually exclusive options
      options: dropdownButtonVariants,
      description: 'Defines the visual style/variant of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: dropdownButtonVariants[0] },
      },
    },
    badgeCount: {
      control: { type: 'number', min: 0 },
      description: 'Number to display in a badge on the button.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
};

// --- Stories ---

// Default Story (interactive via argTypes)
export const Default = (args) => <DropdownButton {...args} />;
// No specific args needed here, as it uses the default ones from `export default`

// Example: Story with a specific variant and icon
export const PrimaryWithIcon = (args) => (
  <DropdownButton {...args} />
);
PrimaryWithIcon.args = {
  children: 'Primary Action',
  variant: 'primary', // Override default variant
  leftIcon: Icons.add, // Set a specific icon
  badgeCount: 5,
};

// Example: Disabled Button
export const Disabled = (args) => (
  <DropdownButton {...args} />
);
Disabled.args = {
  children: 'Disabled Button',
  isDisabled: true,
};

// Example: Loading Button
export const Loading = (args) => (
  <DropdownButton {...args} />
);
Loading.args = {
  children: 'Loading...',
  isLoading: true,
  loadingText: 'Please wait...',
};

// Example: Active Button
export const Active = (args) => (
  <DropdownButton {...args} />
);
Active.args = {
  children: 'Active State',
  isActive: true,
};