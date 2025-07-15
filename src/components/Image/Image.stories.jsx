import React from 'react';
// Remove: import { files, text } from '@storybook/addon-knobs'; // NO LONGER NEEDED!

import Image from './index';

export default {
  title: 'Atoms/Image',
  component: Image,
  tags: ["autodocs"],

  // Define argTypes to create interactive controls for your props
  argTypes: {
    // Control for the 'size' prop
    size: {
      control: { type: 'text' }, // Text input for size (e.g., '100px', '50%', 'auto')
      description: 'CSS size value for the image (e.g., "100px", "50%", "auto").',
      defaultValue: '100px', // Set a default value
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100px' },
      },
    },
    // Control for the 'src' prop
    src: {
      control: { type: 'text' }, // Use text input for URL, or 'file' if you want a file picker
      // If you want a file picker, change type to 'file' and add accept: 'image/*'
      // control: { type: 'file', accept: 'image/*' },
      description: 'Source URL of the image.',
      defaultValue: 'https://bit.ly/uchiha-itachi', // Set a default image URL
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'https://bit.ly/uchiha-itachi' },
      },
    },
    // Control for the 'fallbackSrc' prop
    fallbackSrc: {
      control: { type: 'text' }, // Use text input for URL, or 'file' for a file picker
      // control: { type: 'file', accept: 'image/*' },
      description: 'Source URL of a fallback image to display if the main image fails to load.',
      defaultValue: 'https://bit.ly/uchiha-itachi', // Default is null for no fallback
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'https://bit.ly/uchiha-itachi' },
      },
    },
    // Action logger for 'onLoad' prop
    onLoad: {
      action: 'imageLoaded', // This will log the action in Storybook's Actions panel
      description: 'Callback fired when the image successfully loads.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'noop' },
      },
    },
    // Action logger for 'onError' prop
    onError: {
      action: 'imageError', // This will log the action in Storybook's Actions panel
      description: 'Callback fired when the image fails to load.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'https://shorturl.at/Ntd9c' },
      },
    },
    // Add any other props your Image component might accept (e.g., alt, objectFit, etc.)
  },
};

// This is now a standard CSF story function.
// Storybook will automatically pass the props (args) based on your argTypes defined above.
export const DefaultImage = (args) => {
  // All 'knob' values are now passed directly as 'args'
  return <Image {...args} />;
};

// If you had specific parameters for the story, they go here.
// The `docs: { disable: true, page: null }` parameter is typically
// not needed with modern docs. If you explicitly want to hide this
// story from the auto-generated docs page, you can keep it.
DefaultImage.parameters = {
  // docs: { disable: true }, // Uncomment if you specifically want to hide this from the docs page
};