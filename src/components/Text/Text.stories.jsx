import React from 'react';
// Remove: import { text, radios } from '@storybook/addon-knobs'; // NO LONGER NEEDED!

import Text from './index';

export default {
  title: 'Atoms/Text',
  component: Text,
  tags: ["autodocs"],

  // Define argTypes to create interactive controls for your props
  argTypes: {
    // Control for the 'type' prop (e.g., title1, header1, body, etc.)
    type: {
      control: { type: 'radio' }, // Use a radio button UI control
      options: [ // Provide all available text types from your component
        'title1',
        'header1',
        'header2',
        'header3',
        'header4',
        'header5',
        'header6',
        'subheader',
        'body',
        'note',
        'button',
        'tag',
        'label',
        'inputFieldLabel',
        'timestamp'
      ],
      description: 'Defines the semantic and visual style of the text.',
      defaultValue: 'body', // Set the default value
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'body' },
      },
    },
    // Control for the 'tag' prop (e.g., div, p, span, h1, etc.)
    tag: {
      control: { type: 'text' }, // Use a text input control
      description: 'HTML tag to render the text (e.g., "div", "p", "span", "h1", etc.).',
      defaultValue: 'div', // Set the default value
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
    // Control for the 'children' prop (the text content itself)
    children: {
      control: { type: 'text' }, // Use a text input control for the content
      description: 'The actual text content to display.',
      defaultValue: 'Pack my box with five dozen liquor jugs', // Set the default value
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'null' },
      },
    },
    // TODO: Figure out how to display line-height and font-size dynamically
    // This part is trickier without direct access to your Text component's internal styles.
    // One approach is to read computed styles in a separate Storybook addon or decorator,
    // or to expose these values as part of your component's documentation (e.g., in MDX).
    // For now, these are not directly controllable via 'argTypes' unless your Text component
    // explicitly accepts 'lineHeight' and 'fontSize' as props.
  },
};

// This is now a standard CSF story function.
// Storybook will automatically pass the props (args) based on your argTypes defined above.
export const InteractiveText = (args) => {
  // All 'knob' values are now passed directly as 'args'
  return (
    <Text tag={args.tag} type={args.type} {...args}>
      {args.children}
    </Text>
  );
};

// If you had specific parameters for the story, they go here.
// The `docs: { disable: true, page: null }` parameter is usually not needed
// with modern docs as you control what's shown via MDX files.
// If you truly want to hide this story from the auto-generated docs, keep it.
InteractiveText.parameters = {
  // controls: { disable: false }, // Controls are enabled by default for CSF stories with argTypes
  // docs: { disable: true }, // Uncomment if you specifically want to hide this from the docs page
};