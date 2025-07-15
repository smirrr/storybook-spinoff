import React from 'react';
// import { action } from '@storybook/addon-actions'; // Keep this for logging actions manually

import * as Icons from '../../IconLib'; // Assuming this correctly imports your icon components
import IconButton, { iconButtonVariants, iconButtonColors } from './index'; // Assuming '.' refers to your IconButton component

// Helper to get icon options for the argType 'select' control
const IconsSelectOptions = Object.keys(Icons).reduce((acc, key) => {
  // Basic check to include only React components from IconsLib
  if (typeof Icons[key] === 'function' || (typeof Icons[key] === 'object' && Icons[key] !== null && Icons[key].$$typeof === Symbol.for('react.element'))) {
    acc[key] = key; // Use the key as both label and value
  }
  return acc;
}, { 'None': null }); // Add a 'None' option to clear the icon

export default {
  title: 'Atoms/Buttons/IconButton',
  // subtitle: '', // Subtitle is typically not used in modern Storybook
  component: IconButton,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define default args for all stories in this file
  args: {
    icon: Icons.add, // Default to 'add' icon
    color: iconButtonColors[0], // Default to the first color
    isActive: false,
    isDisabled: false,
    isLoading: false,
    variant: iconButtonVariants[0], // Default to the first variant
  },

  // Define argTypes to create interactive controls for your props
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: Object.values(IconsSelectOptions), // The labels for the dropdown (e.g., 'add', 'close')
      mapping: Icons, // Maps the selected string label to the actual Icon component (e.g., 'add' -> Icons.add)
      description: 'The icon component to display inside the button.',
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: Icons.add },
      },
    },
    color: {
      control: { type: 'radio' },
      options: iconButtonColors,
      description: 'Defines the color scheme of the icon button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: iconButtonColors[0] },
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
      description: 'If `true`, the button will display a loading spinner.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'iconButtonClick', // This will log an action when the onClick prop is called
      description: 'Callback function invoked when the icon button is clicked.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    variant: {
      control: { type: 'radio' },
      options: iconButtonVariants,
      description: 'Defines the visual style/variant of the icon button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: iconButtonVariants[0] },
      },
    },
  },
};

// --- Stories ---

// Default Story (interactive via argTypes)
export const Default = (args) => <IconButton {...args} />;
// No specific args needed here, as it uses the default ones from `export default`

// Example: Primary variant with a different icon
export const PrimaryEditIcon = (args) => (
  <IconButton {...args} />
);


// Example: Disabled button
export const Disabled = (args) => (
  <IconButton {...args} />
);
Disabled.args = {
  isDisabled: true,
  icon: Icons.close,
};

// Example: Loading button
export const Loading = (args) => (
  <IconButton {...args} />
);
// Loading.args = {
//   isLoading: true,
//   icon: Icons.add,
// };

// No longer needed for modern Storybook
// withKnobs.story = {
//   parameters: { docs: { disable: true, page: null } }
// };