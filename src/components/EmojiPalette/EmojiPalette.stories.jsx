import React, { useRef, useState } from 'react'; // Import useState for interactive example
import EmojiPalette from './index';

// --- Default Export for Storybook ---
export default {
  component: EmojiPalette,
  title: 'Molecules/EmojiPalette',
  tags: ['autodocs', 'molecule'], // Enable autodocs and categorize

  // Define argTypes for interactive controls and documentation
  argTypes: {
    currentInputValue: {
      control: 'text',
      description: 'The current text value from the associated input field.',
    },
    onChange: {
      action: 'emoji selected', // Log emoji selections to the actions panel
      description: 'Callback function triggered when an emoji is selected.',
    },
    inputContainerRef: {
      control: false, // Refs are not directly controlled via Storybook args
      description: 'Ref to the input field\'s container, used for positioning the palette.',
    },
    // Add any other props your EmojiPalette component might have here
    // Example:
    // someBooleanProp: {
    //   control: 'boolean',
    //   description: 'A description for a boolean prop.',
    // },
  },
  // Set common args for all stories (if you had more than one)
  args: {
    currentInputValue: 'Hello, Storybook! ', // A default value to show the palette integrating with input
    onChange: (emoji) => console.log('Selected emoji:', emoji), // Default logging for actions
  },
};

// --- Story: Default Emoji Palette ---
/**
 * This story demonstrates the basic functionality of the Emoji Palette.
 * You can type in the simulated input field below and select emojis
 * to see how they integrate.
 */
export const Default = {
  // Use a render function for stories that need local state or refs
  render: (args) => {
    // We'll create a dummy input and its ref to simulate the environment
    // where EmojiPalette would typically be used.
    const mockInputRef = useRef(null);
    const [mockInputValue, setMockInputValue] = useState(args.currentInputValue);

    // This onChange simulates how the EmojiPalette would update the main input
    const handleEmojiChange = (emoji) => {
      const newValue = mockInputValue + emoji;
      setMockInputValue(newValue);
      args.onChange(emoji); // Trigger the Storybook action for logging
    };

    return (
      <div style={{ padding: '20px', minHeight: '300px' }}>
        <h3>Simulated Input Field</h3>
        <textarea
          ref={mockInputRef}
          style={{ width: '100%', minHeight: '80px', padding: '10px', border: '1px solid #ddd', marginBottom: '20px' }}
          value={mockInputValue}
          onChange={(e) => setMockInputValue(e.target.value)}
          placeholder="Type something and then select an emoji..."
        />

        <h3>Emoji Palette</h3>
        {/* Pass props, including the simulated inputRef */}
        <EmojiPalette
          {...args} // Spread all args from Storybook controls
          currentInputValue={mockInputValue} // Pass the simulated input value
          inputContainerRef={mockInputRef} // Pass the ref to the simulated textarea
          onChange={handleEmojiChange} // Use our local handler
        />
        <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
          *The EmojiPalette component is likely positioned relative to the `inputContainerRef`.
          In a real application, this ref would point to your actual text input element.
        </p>
      </div>
    );
  },
  args: {
    // Inherits default args from `export default`
    // You can override them here if this specific story needs different starting values
  },
};