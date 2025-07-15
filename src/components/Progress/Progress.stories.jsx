import React from 'react';
import Progress, { availableSizes } from '.'; // Assuming availableSizes is exported from your component
import theme from '../theming/defaultTheme'; // Assuming you still need to import theme for colors

// Derive colors from your theme once
const colors = Object.keys(theme.colors).map(color => `${color}.50`);

export default {
  title: 'Atoms/Progress',
  component: Progress,
  // Add tags for better organization and to enable automatic documentation generation
  tags: ['autodocs', 'atom'],

  // Define argTypes for consistent controls and documentation across stories
  argTypes: {
    size: {
      control: 'select', // Use a select control for predefined options
      options: availableSizes, // Pass the array of available sizes
      description: 'The size of the progress bar.',
    },
    color: {
      control: 'select', // Use a select control for predefined color options
      options: colors, // Pass the array of derived colors
      description: 'The color of the progress bar, derived from the theme.',
    },
    min: {
      control: { type: 'number' }, // Numeric input for min value
      description: 'The minimum possible value of the progress bar.',
    },
    max: {
      control: { type: 'number' }, // Numeric input for max value
      description: 'The maximum possible value of the progress bar.',
    },
    value: {
      control: { type: 'number' }, // Numeric input for current value
      description: 'The current value of the progress bar.',
    },
    // Add other props if your Progress component accepts them
  },
  // Set default args that apply to all stories unless overridden
  args: {
    size: availableSizes[0], // Default to the first available size
    color: colors[0],       // Default to the first color
    min: 0,
    max: 100,
    value: 20,              // Default progress value
  },
};

// --- Stories ---

// This story now serves as your main interactive playground.
// It inherits all default props from `export default.args`
// and all controls from `export default.argTypes`.
export const Playground = {
  // No specific 'args' or 'render' function is needed here unless
  // you want to override the default initial state for this specific story.
  // Users can interact with all controls in the Storybook UI.
};

// Example of another story if you wanted a specific fixed state
export const HalfProgress = {
  args: {
    value: 50, // Set value to half of max
    // All other props inherit from default args
  },
};

export const SmallRedProgress = {
  args: {
    size: 'small', // Assuming 'small' is an available size
    color: 'red.50', // Assuming 'red.50' is a valid color
    value: 75,
  },
};


// The `withKnobs.story` parameter disabling docs is no longer needed.
// The `tags: ['autodocs']` handles documentation generation automatically for all stories.