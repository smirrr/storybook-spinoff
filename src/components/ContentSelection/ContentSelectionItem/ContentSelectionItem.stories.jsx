import React, { useState, useEffect } from 'react';
import ContentSelectionItem from '.'; // Assuming ContentSelectionItem is available at the current directory
import Box from '../../Box'; // Assuming Box component is available at '../../Box'

export default {
  title: 'Molecules/ContentSelectionItem',
  component: ContentSelectionItem,
  tags: ['autodocs', 'molecule'],

  argTypes: {
    label: {
      control: 'text',
      description: 'The main text content of the item.',
    },
    showCheckbox: {
      control: 'boolean',
      description: 'If true, displays a checkbox next to the label.',
    },
    isChecked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox.',
    },
    ctaLabel: {
      control: 'text',
      description: 'Text for the call-to-action button (e.g., "Edit").',
    },
    onCheckboxClick: {
      action: 'checkbox clicked', // Logs click events to the Actions panel
      description: 'Callback function triggered when the checkbox is clicked.',
    },
    onCtaClick: {
      action: 'cta clicked', // Logs CTA click events
      description: 'Callback function triggered when the CTA button is clicked.',
    },
    tag: {
      control: 'text',
      description: 'Optional tag displayed next to the label (e.g., "Mandatory").',
    },
  },
  args: {
    label: 'We have autonomy to take decisions',
    showCheckbox: false,
    isChecked: false,
    ctaLabel: '',
    onCheckboxClick: (newState) => console.log('Checkbox clicked! New state:', newState),
    onCtaClick: () => alert('CTA clicked!'),
    tag: '',
  },
};

// --- Story Template for ContentSelectionItem ---
// This component encapsulates the common rendering logic and state management for interactivity.
const ContentSelectionItemStoryTemplate = (args) => {
  // Use local state to manage `isChecked` for interactive stories
  const [localIsChecked, setLocalIsChecked] = useState(args.isChecked);

  // Update local state if `isChecked` prop changes from Storybook controls
  // This ensures the story responds to control panel changes
  useEffect(() => {
    setLocalIsChecked(args.isChecked);
  }, [args.isChecked]);

  const handleCheckboxClick = () => {
    const newState = !localIsChecked;
    setLocalIsChecked(newState);
    // Call the Storybook action logger defined in args
    args.onCheckboxClick(newState);
  };

  const handleCtaClick = () => {
    // Call the Storybook action logger defined in args
    args.onCtaClick();
  };

  return (
    <Box maxWidth="600px" w="100%">
      <ContentSelectionItem
        {...args} // Spread all Storybook args (excluding those managed by local state)
        isChecked={args.showCheckbox ? localIsChecked : undefined} // Only pass if checkbox is shown
        onCheckboxClick={args.showCheckbox ? handleCheckboxClick : undefined} // Only pass if checkbox is shown
        onCtaClick={args.ctaLabel ? handleCtaClick : undefined} // Only pass if CTA is present
      />
    </Box>
  );
};

// --- Stories ---

/**
 * A basic content item displaying only its label.
 * It does not have a checkbox or a CTA button.
 */
export const Default = {
  render: ContentSelectionItemStoryTemplate,
  args: {
    showCheckbox: false,
    ctaLabel: '',
    tag: '',
  },
};

/**
 * This story allows you to dynamically control all available props
 * using Storybook's built-in controls.
 */
export const InteractiveControls = {
  render: ContentSelectionItemStoryTemplate,
  args: {
    label: 'This label can be edited in the controls panel.',
    showCheckbox: true, // Start with checkbox visible for interaction
    isChecked: false,
    ctaLabel: 'Click Me!',
    tag: 'Optional Tag',
  },
};

/**
 * This item features a checkbox that can be toggled.
 * It also has a "Mandatory" tag displayed next to the label.
 */
export const WithCheckbox = {
  render: ContentSelectionItemStoryTemplate,
  args: {
    label: 'Item with a toggleable checkbox and a tag.',
    showCheckbox: true,
    isChecked: true, // Starts checked for this story
    tag: 'Mandatory',
    ctaLabel: '', // Ensure no CTA
  },
};

/**
 * This item includes a Call-to-Action (CTA) button, e.g., an "Edit" button,
 * that triggers an action when clicked.
 */
export const WithCta = {
  render: ContentSelectionItemStoryTemplate,
  args: {
    label: 'We have an effective decision-making process. It represents how clear employees are about the company objectives',
    showCheckbox: false, // No checkbox for this story
    ctaLabel: 'Edit',
    tag: '', // No tag
  },
};

/**
 * This item combines both an interactive checkbox and a CTA button,
 * along with a "Mandatory" tag.
 */
export const WithCtaAndCheckbox = {
  render: ContentSelectionItemStoryTemplate,
  args: {
    label: 'We have an effective decision-making process. It represents how clear employees are about the company objectives',
    showCheckbox: true,
    isChecked: false,
    ctaLabel: 'Edit',
    tag: 'Mandatory',
  },
};