import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DropDown from '.'; // Assuming DropDown component is available
import { SimpleButton as Button } from '../Button'; // Assuming Button component is available
import Box from '../Box'; // Assuming Box component is available

export default {
  title: 'Atoms/Dropdown',
  component: DropDown,
  tags: ['autodocs', 'atom'], // Add tags for better organization and autodocs

  argTypes: {
    id: {
      control: 'text',
      description: 'The ID of the dropdown component.',
    },
    className: {
      control: 'text',
      description: 'CSS class name for styling the dropdown container.',
    },
    isCloseOnClickSelector: {
      control: 'boolean',
      description: 'If true, the dropdown closes when the selector is clicked again.',
    },
    onToggle: {
      action: 'dropdown toggled', // Logs toggle events to the Actions panel
      description: 'Callback function triggered when the dropdown opens or closes.',
    },
    open: {
      control: 'boolean',
      description: 'Controls the open/closed state of the dropdown.',
    },
    preferTop: {
      control: 'boolean',
      description: 'If true, the dropdown prefers to open above the selector.',
    },
    selector: {
      control: false, // Selector is a ReactNode, not directly controllable via argTypes
      description: 'The trigger element that opens/closes the dropdown.',
    },
    children: {
      control: false, // Children are the content of the dropdown, not directly controllable
      description: 'The content to be displayed inside the dropdown.',
    },
    scrollAncestorIdentifier: {
      control: 'text',
      description: 'ID of an ancestor element that acts as a scroll container for positioning.',
    },
    showDarkBg: {
      control: 'boolean',
      description: 'If true, shows a dark background overlay when the dropdown is open.',
    },
  },
  args: {
    id: 'default-dropdown',
    className: 'template',
    isCloseOnClickSelector: true,
    onToggle: () => {}, // A no-op function for the default action logger
    open: false, // Default to closed initially
    preferTop: false,
    showDarkBg: false,
  },
};

// --- Styled Component for Story Layout ---
const StyledDefaultDropdown = styled.div`
  width: 600px;
  overflow: auto;
  height: 500px;
  border: 1px dashed #ccc; /* Added for visual clarity in Storybook */
  padding: 20px;

  .template {
    width: 300px;
    margin-top: 20px; /* Add some margin to separate from other content */
  }
`;

// --- Helper Component for Interactive Dropdown Stories ---
// This wrapper manages the `open` state and the `selector` button consistently.
const DropdownStoryWrapper = ({ children, selector, ...args }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(args.open);

  // Sync initial 'open' prop from Storybook controls
  useEffect(() => {
    setDropdownOpen(args.open);
  }, [args.open]);

  const handleToggle = (state) => {
    setDropdownOpen(state);
    args.onToggle(state); // Call the Storybook arg for action logging
  };

  // Default selector button if none is provided
  const defaultSelector = (
    <Button mt={4} onClick={() => setDropdownOpen(true)}>
      Open Dropdown
    </Button>
  );

  return (
    <StyledDefaultDropdown id={args.scrollAncestorIdentifier || 'story-container'}>
      <DropDown
        {...args} // Spread all args from Storybook controls
        open={isDropdownOpen}
        onToggle={handleToggle}
        selector={selector || defaultSelector} // Use provided selector or default
      >
        {children || ( // Use provided children or default content
          <Box bg="white" borderRadius="4px" p="24px 16px 12px">
            Sample content
          </Box>
        )}
      </DropDown>
    </StyledDefaultDropdown>
  );
};

// --- Stories ---

/**
 * Demonstrates a basic dropdown with default settings.
 * Click the "Open Dropdown" button to toggle its visibility.
 */
export const Default = {
  render: DropdownStoryWrapper, // Use the reusable wrapper
  args: {
    // Inherits all default args from `export default`
    // You can override specific args here if needed for this story
  },
};

/**
 * This story demonstrates a dropdown within a scrollable container.
 * Scroll the main story area to see how the dropdown's position adjusts.
 */
export const WithScroll = {
  render: (args) => (
    <StyledDefaultDropdown id="scroll-container-example">
      {/* Lorem Ipsum content to make the container scrollable */}
      <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px' }}>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for lorem ipsum will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et
          Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit
          amet..', comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et
          Malorum' by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </p>
      </div>

      <DropdownStoryWrapper
        {...args}
        scrollAncestorIdentifier="scroll-container-example" // Point to the ID of the scrollable div
        showDarkBg // Original story had this prop
      >
        <Box
          bg="white"
          borderRadius="4px"
          cursor="pointer"
          p="24px 16px 12px"
        >
          Sample content for scrollable dropdown
        </Box>
      </DropdownStoryWrapper>

      {/* More Lorem Ipsum content to ensure the outer container is also scrollable */}
      <div style={{ height: '300px', border: '1px solid #eee', padding: '10px', marginTop: '20px' }}>
        <p>
          More content below the dropdown to ensure the main story window also scrolls.
          This helps test dropdown positioning in various scroll contexts.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </StyledDefaultDropdown>
  ),
  args: {
    id: 'dropdown-with-scroll',
    showDarkBg: true,
  },
};