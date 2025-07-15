import React from 'react';
// Removed: import { fn } from '@storybook/test';
import RepliesAccordion from './index';

// Define the data array outside the component/stories for reusability
const defaultRepliesData = [
  {
    id: 'c6919045-329f-41f8-ba57-4687a8235495',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish',
    display: 'Ashish+3',
    email: 'ashish@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c'
  },
  {
    id: 'c6919045-329f-41f8-ba57-468668235495',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish+1',
    display: 'Ashish+3',
    email: 'ashish+1@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c'
  },
  {
    id: 'c6919045-329f-41f8-ba57-4686a8235595',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish+2',
    display: 'Ashish+3',
    email: 'ashish+2@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c'
  },
  {
    id: 'c6919045-329f-41f8-ba57-4686a8235495',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish+3',
    display: 'Ashish+3',
    email: 'ashish+3@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c'
  }
];

export default {
  title: 'Molecules/RepliesAccordion',
  component: RepliesAccordion,
  tags: ['autodocs', 'molecule'],
  argTypes: {
    replies: {
      control: 'object',
      description: 'An array of reply objects to be rendered.',
    },
    replyRenderFunction: {
      control: false, // Hide this from controls as it's a function that takes an argument
      description: 'A function that receives a reply object and returns the JSX to render for each reply.',
    },
    closedText: {
      control: 'text',
      description: 'Text to display when the accordion is closed and showing the "open" option.',
    },
    hideText: {
      control: 'text',
      description: 'Text to display when the accordion is open and showing the "hide" option.',
    },
    onToggle: {
      // Removed: action: 'onToggle', // This relies on `@storybook/test` or `@storybook/addon-actions`
      description: 'Callback function triggered when the accordion is opened or closed.',
    },
    noAccordionReplyCount: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'If the number of replies is less than or equal to this count, the accordion will not be displayed.',
    },
  },
  args: {
    replies: defaultRepliesData,
    closedText: 'open',
    hideText: 'hide',
    // Removed: onToggle: fn(),
    // Provide a simple no-op function as the default if your component requires it.
    // Or you can leave it undefined if the component handles undefined onToggle gracefully.
    onToggle: () => console.log('Accordion toggled!'), // Add a console log for basic feedback
    noAccordionReplyCount: undefined,
  },
};

// Define the default reply rendering function once
const defaultReplyRenderFunction = (reply) => {
  return (
    <div style={{ display: 'flex', padding: '8px', borderBottom: '1px solid #eee' }}>
      <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{reply.name}:</span>
      <span>{reply.email}</span>
    </div>
  );
};

// --- Stories ---

export const Default = {
  render: (args) => (
    <RepliesAccordion
      {...args}
      replyRenderFunction={defaultReplyRenderFunction}
    />
  ),
};

export const WithNoAccordionReplyCount = {
  render: (args) => (
    <RepliesAccordion
      {...args}
      replyRenderFunction={defaultReplyRenderFunction}
    />
  ),
  args: {
    noAccordionReplyCount: 4,
  },
};

export const WithFewRepliesToHideAccordion = {
  render: (args) => (
    <RepliesAccordion
      {...args}
      replyRenderFunction={defaultReplyRenderFunction}
    />
  ),
  args: {
    replies: defaultRepliesData.slice(0, 2),
    noAccordionReplyCount: 3,
  },
};

export const WithManyRepliesForFullAccordion = {
  render: (args) => (
    <RepliesAccordion
      {...args}
      replyRenderFunction={defaultReplyRenderFunction}
    />
  ),
  args: {
    replies: [...defaultRepliesData, ...defaultRepliesData, ...defaultRepliesData],
    noAccordionReplyCount: 3,
  },
};

export const Playground = {
  render: (args) => (
    <RepliesAccordion
      {...args}
      replyRenderFunction={defaultReplyRenderFunction}
    />
  ),
  args: {
    replies: [...defaultRepliesData, ...defaultRepliesData],
  },
};