import React from 'react';
// import { action } from '@storybook/addon-actions'; // Keep this for logging actions manually

import * as Icons from '../../IconLib'; // Assuming this correctly imports your icon components
import SimpleButton, {
  simpleButtonVariants,
  simpleButtonColors,
  simpleButtonSizes,
} from './index'; // Assuming '.' refers to your SimpleButton component

// Helper to get icon options for the argType 'select' control
const IconsSelectOptions = Object.keys(Icons).reduce((acc, key) => {
  // Basic check to include only React components from IconsLib
  if (typeof Icons[key] === 'function' || (typeof Icons[key] === 'object' && Icons[key] !== null && Icons[key].$$typeof === Symbol.for('react.element'))) {
    acc[key] = key; // Use the key as both label and value
  }
  return acc;
}, { 'None': null }); // Add a 'None' option to clear the icon


export default {
  title: 'Atoms/Buttons/SimpleButton',
  // subtitle: '', // Subtitle is typically not used in modern Storybook; use tags or component descriptions
  component: SimpleButton,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define default args for all stories in this file
  args: {
    children: 'Button', // Default text for the button
    color: simpleButtonColors[0], // Default to the first color
    isActive: false,
    isDisabled: false,
    isLoading: false,
    leftIcon: null, // Default to no left icon
    loadingText: null, // Default to no loading text
    rightIcon: null, // Default to no right icon
    size: simpleButtonSizes[0], // Default to the first size
    variant: simpleButtonVariants[0], // Default to the first variant
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
    color: {
      control: { type: 'radio' },
      options: simpleButtonColors,
      description: 'Defines the color scheme of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: simpleButtonColors[0] },
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
    rightIcon: {
      control: { type: 'select' },
      options: Object.values(IconsSelectOptions), // Pass the actual icon components as options
      mapping: Icons, // Map option values (string names) to actual Icon components
      description: 'Icon component to display on the right side of the button.',
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: 'null' },
      },
    },
    size: {
      control: { type: 'radio' }, // Use 'radio' for a set of mutually exclusive options
      options: simpleButtonSizes,
      description: 'Defines the size of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: simpleButtonSizes[0] },
      },
    },
    variant: {
      control: { type: 'radio' }, // Use 'radio' for a set of mutually exclusive options
      options: simpleButtonVariants,
      description: 'Defines the visual style/variant of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: simpleButtonVariants[0] },
      },
    },
  },
};

// --- Stories ---

// Default Story (interactive via argTypes)
export const Default = (args) => <SimpleButton {...args} />;
// No specific args needed here, as it uses the default ones from `export default`

// Example: Primary button with left and right icons
export const PrimaryWithIcons = (args) => (
  <SimpleButton {...args} />
);
PrimaryWithIcons.args = {
  children: 'Action Button',
  variant: 'primary',
  leftIcon: Icons.add,
  rightIcon: Icons.arrowRight,
};

// Example: Disabled button
export const Disabled = (args) => (
  <SimpleButton {...args} />
);
Disabled.args = {
  children: 'Disabled Button',
  isDisabled: true,
};

// Example: Loading button
export const Loading = (args) => (
  <SimpleButton {...args} />
);
Loading.args = {
  children: 'Loading...',
  isLoading: true,
  loadingText: 'Please wait...',
};

// Example: Active button
export const Active = (args) => (
  <SimpleButton {...args} />
);
Active.args = {
  children: 'Active State',
  isActive: true,
};