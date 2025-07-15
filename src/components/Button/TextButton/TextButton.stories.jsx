import React from 'react';
// import { action } from '@storybook/addon-actions'; // Keep for manual action logging

import * as Icons from '../../IconLib'; // Assuming this correctly imports your icon components
import TextButton, { textButtonColors, textButtonSizes } from './index'; // Assuming '.' refers to your TextButton component
// import Box from '../Box'; // Uncomment if Box is needed for Variants story
// import Text from '../Text'; // Uncomment if Text is needed for Variants story

// Helper to get icon options for the argType 'select' control
const IconsSelectOptions = Object.keys(Icons).reduce((acc, key) => {
  // Basic check to include only React components from IconsLib
  if (typeof Icons[key] === 'function' || (typeof Icons[key] === 'object' && Icons[key] !== null && Icons[key].$$typeof === Symbol.for('react.element'))) {
    acc[key] = key; // Use the key as both label and value
  }
  return acc;
}, { 'None': null }); // Add a 'None' option to clear the icon


export default {
  title: 'Atoms/Buttons/TextButton',
  // subtitle: '', // Subtitle is typically not used in modern Storybook
  component: TextButton,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define default args for all stories in this file
  args: {
    children: 'Button', // Default text for the button
    color: textButtonColors[0], // Default to the first color
    isActive: false,
    isDisabled: false,
    leftIcon: null, // Default to no left icon
    rightIcon: null, // Default to no right icon
    size: textButtonSizes[0], // Default to the first size
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
      options: textButtonColors,
      description: 'Defines the color scheme of the text button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: textButtonColors[0] },
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
    leftIcon: {
      control: { type: 'select' },
      options: Object.values(IconsSelectOptions),
      mapping: Icons,
      description: 'Icon component to display on the left side of the button.',
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: 'null' },
      },
    },
    onClick: {
      action: 'textButtonClick', // Logs an action when the onClick prop is called
      description: 'Callback function invoked when the text button is clicked.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rightIcon: {
      control: { type: 'select' },
      options: Object.values(IconsSelectOptions),
      mapping: Icons,
      description: 'Icon component to display on the right side of the button.',
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: 'null' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: textButtonSizes,
      description: 'Defines the size of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: textButtonSizes[0] },
      },
    },
  },
};

