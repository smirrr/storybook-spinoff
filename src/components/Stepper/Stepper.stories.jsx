import React from 'react';
import Stepper from '.'; // Assuming this is your Stepper component

// Define the steps array outside the component/stories for reusability
const defaultSteps = [
  {
    id: 'step1',
    label: 'Questions'
  },
  {
    id: 'step2',
    label: 'Audience'
  },
  {
    id: 'step3',
    label: 'Basic Details'
  },
  {
    id: 'step4',
    label: 'Preview'
  }
];

export default {
  title: 'Molecules/Stepper',
  component: Stepper,
  // Add tags for better organization and to enable automatic documentation generation
  tags: ['autodocs', 'molecule'], // 'autodocs' will generate documentation based on argTypes

  // Define argTypes for consistent controls and documentation across stories
  argTypes: {
    activeIndex: {
      control: { type: 'number', min: 0, step: 1 }, // Control for numeric input, with min/step
      description: 'The zero-based index of the currently active step.',
    },
    labels: {
      control: 'object', // Allows editing the array of step objects in the UI
      description: 'An array of step objects, each with an `id` and `label`.',
    },
    // If your Stepper component has other props (e.g., onClickStep, orientation),
    // you would define their argTypes here as well.
    // onClickStep: {
    //   action: 'stepClicked', // Logs when a step is clicked
    //   description: 'Callback function when a step is clicked.',
    // },
  },
  // Set default args that apply to all stories unless overridden
  args: {
    activeIndex: 0, // Default to the first step
    labels: defaultSteps, // Use the predefined steps as default labels
  },
};

// --- Stories ---

// This story will serve as your main interactive playground
export const Default = {
  // No custom render function or args needed here, as it uses the defaults
  // defined in the `export default` and allows interaction via controls.
  // The controls panel in Storybook will automatically appear based on `argTypes` and `args`.
};

// Example of another story, if you had a specific use case
export const LastStepActive = {
  args: {
    activeIndex: defaultSteps.length - 1, // Set active index to the last step
    labels: defaultSteps, // Explicitly use default steps (though inherited)
  },
};

export const CustomSteps = {
  args: {
    activeIndex: 1,
    labels: [
      { id: 'start', label: 'Start' },
      { id: 'progress', label: 'In Progress' },
      { id: 'finish', label: 'Done' },
    ],
  },
};

// The 'parameters' block that was disabling docs is no longer needed in this format,
// as 'autodocs' tag handles documentation automatically.