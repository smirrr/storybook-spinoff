import React from 'react';
import Tooltip from './index';
import { SimpleButton } from '../Button'; // Assuming SimpleButton is correctly imported

export default {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  // Add tags for better organization and autodocs generation
  tags: ['autodocs', 'atom'],
  // Define common argTypes for all stories to enable Controls in Storybook UI
  argTypes: {
    // This allows you to control the content of the tooltip via Storybook's Controls panel
    children: {
      control: 'text',
      description: 'The content displayed inside the tooltip.',
    },
    // You might also want controls for other tooltip props, like position, delay, etc.
    // For example, if your Tooltip component accepts a 'position' prop:
    // position: {
    //   control: 'select',
    //   options: ['top', 'right', 'bottom', 'left'],
    //   description: 'The position of the tooltip relative to its trigger.',
    // },
  },
};

// Default Tooltip Story
export const Default = {
  // Use a render function to show how the Tooltip interacts with a trigger component
  render: (args) => {
    const tooltipAria = 'button-description-default'; // Unique ID for this story
    return (
      <>
        <SimpleButton aria-describedby={tooltipAria}>
          Hover here for a thing
        </SimpleButton>
        <Tooltip id={tooltipAria} {...args} />
      </>
    );
  },
  // Default arguments for this specific story
  args: {
    children: 'Sample Text',
  },
};

// Playground Story for attaching the tooltip to any component
export const Playground = {
  // The render function allows us to use the `children` arg directly from Controls
  render: (args) => {
    const tooltipAria = 'button-description-playground'; // Unique ID for this story
    return (
      <>
        {/* You can imagine a more complex scenario here where the SimpleButton itself
            might be configurable via an arg, or you could have multiple trigger options. */}
        <SimpleButton aria-describedby={tooltipAria}>
          Hover over me
        </SimpleButton>
        {/* The {...args} ensures that any controls (like 'children') are passed to the Tooltip */}
        <Tooltip id={tooltipAria} {...args} />
      </>
    );
  },
  // Initial arguments for the Playground story
  args: {
    children: 'This is a tooltip controlled by Storybook.',
  },
};