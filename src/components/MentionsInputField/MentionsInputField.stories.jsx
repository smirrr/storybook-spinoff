import React, { useRef, useState, useEffect } from 'react'; // Import useEffect
import MentionsInputField from './index';

// --- Reusable Data ---
const allUsers = [
  {
    id: 'c6919045-329f-41f8-ba57-4687a8235495',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish',
    display: 'Ashish+3',
    email: 'ashish@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c',
  },
  {
    id: 'c6919045-329f-41f8-ba57-468668235495',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish+1',
    display: 'Ashish+3',
    email: 'ashish+1@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c',
  },
  {
    id: 'c6919045-329f-41f8-ba57-4686a8235595',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish+2',
    display: 'Ashish+3',
    email: 'ashish+2@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c',
  },
  {
    id: 'c6919045-329f-41f8-ba57-4686a8235495',
    org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
    name: 'Ashish+3',
    display: 'Ashish+3',
    email: 'ashish+3@gmail.com',
    image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c',
  },
];

const objectiveOwner = {
  id: 'c6919045-329f-41f8-ba57-4686a8235495',
  org_reference_id: '094f3ab7-15c2-4b15-ba87-06da40abd259',
  name: 'Ashish+3',
  display: 'Ashish+3',
  email: 'ashish+3@gmail.com',
  image: 'https://lh3.googleusercontent.com/a-/AOh14Gg7uyg-0YKHhpBVOwotwbbfXINJhFaTIQQQ8ynqgg=s96-c',
};

// --- Default Export for Storybook ---
export default {
  component: MentionsInputField,
  title: 'Molecules/MentionsInputField',
  tags: ['autodocs', 'molecule'], // Enable autodocs and categorize

  // Define argTypes for interactive controls and documentation
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'The initial text value of the input field.',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the input field. Use `onValueChange` to update.',
      // This is a controlled prop, so we typically don't allow direct control in Storybook
      // unless it's specifically for demonstrating external updates.
      // For general use, let `onValueChange` handle it.
      // control: { type: 'text' }, // Uncomment if you want to explicitly control `value` via Storybook args
    },
    allUsers: {
      control: 'object',
      description: 'An array of all possible users for mentions.',
    },
    preExistingUsers: {
      control: 'object',
      description: 'An array of users already mentioned or associated with the initial content.',
    },
    isEditEnabled: {
      control: 'boolean',
      description: 'If true, enables edit mode for the input field.',
    },
    onValueChange: {
      action: 'value changed', // Log value changes to the actions panel
      description: 'Callback function triggered when the input value changes.',
    },
    onConfirmClick: {
      action: 'confirm clicked', // Log confirm clicks
      description: 'Callback function triggered when the "confirm" action is performed (e.g., post button clicked).',
    },
    onHeightChange: {
      action: 'height changed', // Log height changes
      description: 'Callback function triggered when the input field\'s height changes (e.g., due to content wrapping).',
    },
    _handleCancelReply: {
      action: 'cancel reply',
      description: 'Callback to handle canceling a reply.',
    },
    _handleReplyToComment: {
      action: 'reply to comment',
      description: 'Callback to handle replying to a comment.',
    },
    setCheckInContainerModified: {
      action: 'set check-in container modified',
      description: 'Callback to indicate the container has been modified.',
    },
    inputReference: { control: false }, // Refs are not directly controlled via Storybook args
    mentionContainerRef: { control: false }, // Refs are not directly controlled via Storybook args
  },
  // Set common args for all stories
  args: {
    allUsers: allUsers,
    preExistingUsers: [objectiveOwner],
    initialValue: '',
    isEditEnabled: false,
    // Provide no-op functions for callbacks by default
    _handleCancelReply: () => {},
    _handleReplyToComment: () => {},
    onConfirmClick: (value, mentions) => console.log('Confirm clicked:', { value, mentions }),
    onHeightChange: (height) => console.log('Height changed:', height),
    onValueChange: (value) => console.log('Value changed:', value),
    setCheckInContainerModified: () => {},
  },
};

// --- Reusable Component Wrapper for State Management ---
// This wrapper handles the local state for the input field and logs actions.
const MentionsInputFieldStoryWrapper = ({ initialValue, ...args }) => {
  const [value, setValue] = useState(initialValue || ''); // Use initialValue for initial state
  const inputRef = useRef(null); // Ref for the containing div if needed by your component
  const mentionInputRef = useRef(null); // Ref for the actual input field
  const mentionContainerRef = useRef(null); // Ref for the mentions container

  // Sync initialValue with local state for reset functionality in Storybook
  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const handleValueChange = (val) => {
    setValue(val);
    args.onValueChange(val); // Also call the Storybook arg for action logging
  };

  const handleConfirmClick = (val, mentions) => {
    args.onConfirmClick(val, mentions);
    // Optionally clear the input after confirm
    // setValue('');
  };

  const handleHeightChange = (height) => {
    args.onHeightChange(height);
  };

  return (
    <div ref={inputRef} style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}>
      <MentionsInputField
        {...args} // Spread all Storybook args (excluding initialValue, value, onValueChange, onConfirmClick, onHeightChange which are managed here)
        initialValue={initialValue} // Pass initialValue down
        inputReference={mentionInputRef}
        mentionContainerRef={mentionContainerRef}
        onConfirmClick={handleConfirmClick}
        onHeightChange={handleHeightChange}
        onValueChange={handleValueChange}
        value={value} // Controlled component value
      />
      {args.children} {/* Render any additional children passed to the wrapper */}
    </div>
  );
};

// --- Stories ---

/**
 * The default Mentions Input Field, ready for typing and mentioning users.
 */
export const Default = {
  render: MentionsInputFieldStoryWrapper, // Use the wrapper
  args: {
    initialValue: '',
    // All other args come from the default export
  },
};

/**
 * Demonstrates how to externally update the input field's value.
 * Click the button below the input to add text programmatically.
 */
export const ExternallyUpdated = {
  render: (args) => {
    const [currentValue, setCurrentValue] = useState(args.initialValue);
    const inputRef = useRef(null);
    const mentionInputRef = useRef(null);
    const mentionContainerRef = useRef(null);

    // Sync initialValue from Storybook args
    useEffect(() => {
      setCurrentValue(args.initialValue || '');
    }, [args.initialValue]);

    const _handleValueChange = (val) => {
      setCurrentValue(val);
      args.onValueChange(val); // Also call the Storybook arg for action logging
    };

    const handleConfirmClick = (val, mentions) => {
      args.onConfirmClick(val, mentions);
      // Optionally clear the input after confirm
      // setCurrentValue('');
    };

    const handleHeightChange = (height) => {
      args.onHeightChange(height);
    };

    return (
      <div ref={inputRef} style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px' }}>
        <MentionsInputField
          {...args} // Spread args from Storybook (excluding overridden ones below)
          initialValue={args.initialValue}
          inputReference={mentionInputRef}
          isEditEnabled // Assuming this story specifically enables edit mode
          mentionContainerRef={mentionContainerRef}
          onConfirmClick={handleConfirmClick}
          onHeightChange={handleHeightChange}
          onValueChange={_handleValueChange}
          value={currentValue} // Use the story's local state
        />
        <div
          style={{ marginTop: '20px', cursor: 'pointer', background: '#eee', padding: '10px', border: '1px solid #ddd' }}
          onClick={() => {
            setCurrentValue(`${currentValue} 123`);
            console.log('Externally updated value:', `${currentValue} 123`);
          }}
        >
          Click me to add text externally
        </div>
      </div>
    );
  },
  args: {
    initialValue: 'Start with some text', // Provide an initial value for external updates
    isEditEnabled: true, // Ensure edit is enabled for this story
  },
};

// Add more stories here as needed, following the same pattern
// export const MentionsWithSpecificUsers = { ... }
// export const MentionsInDisabledState = { ... }