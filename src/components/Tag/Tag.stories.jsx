import React from 'react';
// Remove: import { text } from '@storybook/addon-knobs'; // NO LONGER NEEDED!
 import { action } from 'storybook/actions';
;

import Tag from '.'; // Assuming '.' refers to the Tag component itself
import Box from '../Box'; // Assuming Box is a layout component
import { add, close, notification } from '../IconLib'; // Assuming these are icon components

export default {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ["autodocs"], // Recommended for auto-generated documentation
  args:{
    children: 'Engineering', // <--- NOW children is a GLOBAL default arg

    backgroundColor: 'basic.80', // Default background color
    foregroundColor: 'text.default', // Default text color
  },
  // Define argTypes to create interactive controls for your props
  argTypes: {
    // Control for the main text content of the Tag
    children: {
      control: { type: 'text' },
      description: 'The text content displayed inside the tag.',
      defaultValue: 'Engineering',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'null' },
      },
    },
    // Control for the left icon prop
    leftIcon: {
      // You might use 'select' here if you have a predefined list of icon names/components
      // or 'object' if the icon can be a custom component.
      // For simplicity, we'll make it a boolean to show/hide the default `notification` icon
      // in the controls, or you can use a text input if users can specify icon names.
      // A more advanced setup might use a custom control for icon selection.
      control: { type: 'boolean' }, // Use boolean to toggle default icon for demonstration
      description: 'Icon component to display on the left side of the tag.',
      // defaultValue: undefined, // No default left icon
      // Note: This argType will toggle the `notification` icon for simplicity in the UI.
      // Your Tag component needs to handle receiving the actual Icon component.
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: 'null' },
      },
    },
    // Control for left icon color
    leftIconColor: {
      control: { type: 'color' }, // Color picker for icon color
      description: 'Color of the left icon (e.g., "negative.50" or "#FF0000").',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    // Control for the right icon prop
    rightIcon: {
      control: { type: 'boolean' }, // Use boolean to toggle default icon for demonstration
      description: 'Icon component to display on the right side of the tag.',
      table: {
        type: { summary: 'React.ComponentType' },
        defaultValue: { summary: 'null' },
      },
    },
    // Control for right icon color
    rightIconColor: {
      control: { type: 'color' }, // Color picker for icon color
      description: 'Color of the right icon (e.g., "negative.50" or "#FF0000").',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    // Action prop for right icon click
    onRightIconClick: {
      action: 'rightIconClick', // Logs an action when the right icon is clicked
      description: 'Callback function invoked when the right icon is clicked.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      },
    },
    // Controls for background and foreground colors

    // Add any other props your Tag component might have
  },
};

// --- Stories ---

// Default Tag Story (interactive via argTypes)
export const DefaultTag = (args) => {
  // `args.children` will come from the argTypes default value or control input
  return <Tag {...args} />;
};
DefaultTag.args = {
  // You can set specific args for this story here, overriding argTypes defaults
  children: 'Engineering',
  // backgroundColor: 'basic.80', // Default background color
  // foregroundColor: 'text.default', // Default text color
  // leftIcon: undefined, // Explicitly ensure no icon for this default story
  // rightIcon: undefined,
};

// Story with a Left Icon
export const WithLeftIcon = (args) => (
  // We'll explicitly pass the notification icon component here
  // and spread remaining args for text content etc.
  <Tag leftIcon={notification} {...args} />
);
WithLeftIcon.args = {
  children: 'Engineering',
  // You can set a default for `leftIcon` in argTypes if you want it to appear
  // in the control panel for this story, but direct passing is also fine.
};

// Story with a Colored Left Icon
export const WithColoredLeftIcon = (args) => (
  <Tag leftIcon={notification} leftIconColor="negative.50" {...args} />
);
WithColoredLeftIcon.args = {
  children: 'Engineering',
};

// Story with a Right Icon
export const WithRightIcon = (args) => (
  <Tag rightIcon={add} {...args} />
);
WithRightIcon.args = {
  children: 'Engineering',
};

// Story with a Colored Right Icon
export const WithColoredRightIcon = (args) => (
  <Tag rightIcon={close} rightIconColor="negative.50" {...args} />
);
WithColoredRightIcon.args = {
  children: 'Engineering',
};

// Story with Clickable Right Icon
export const WithClickableRightIcon = (args) => (
  <Tag
    onRightIconClick={action('Right icon has been clicked')} // Use action directly
    rightIcon={close}
    rightIconColor="negative.50"
    {...args} // Spreading args will apply 'children'
  />
);
WithClickableRightIcon.args = {
  children: 'Engineering',
};

// Story for Colored Tags (demonstrates multiple tags with different colors)
export const ColoredTags = (args) => {
  // `args.children` will still be used here from the main control panel
  return (
    <Box
      display="grid"
      gridAutoFlow="row"
      gridGap="5px" // Use string for CSS values
      justifyContent="start"
      justifyItems="start"
    >
      {['primary', 'accent', 'positive', 'negative'].map(color => (
        <Tag
          key={color + '-dark'} // Add a unique key for map
          backgroundColor={`${color}.100`}
          foregroundColor={`${color}.50`}
          rightIcon={notification} // Still display the icon
          // {...args} // Ensure other args like 'children' are passed
        >
          {args.children} 
        </Tag>
      ))}
      {['primary.50', 'accent.50', 'positive.50', 'negative.50'].map(bg => (
        <Tag
          key={bg + '-light'} // Add a unique key for map
          backgroundColor={bg}
          foregroundColor="text.onDark"
          rightIcon={notification} // Still display the icon
          // {...args} // Ensure other args like 'children' are passed
        >
          {args.children} 
        </Tag>
      ))}
    </Box>
  );
};
ColoredTags.args = {
  children: 'Engineering',
  // You might want to unset some specific controls for this story if they conflict
  // e.g., leftIcon: undefined,
  // rightIcon: notification, // Ensure a right icon is displayed for this story
};