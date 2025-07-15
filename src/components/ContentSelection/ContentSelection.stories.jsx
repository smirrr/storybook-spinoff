/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect, Fragment } from 'react';
import ContentSelection, { ContentSelectionItem } from '.'; // Assuming ContentSelection and ContentSelectionItem are available
import {
  title,
  description,
  contentWithoutCheckbox,
  getContentWithCheckbox,
  getUpdatedContentWithCheckedItems,
} from './storiesUtil'; // Assuming these utility functions and mock data are available
import Box from '../Box'; // Assuming Box component is available
import Text from '../Text'; // Assuming Text component is available
import Checkbox from '../Checkbox'; // Assuming Checkbox component is available
import Tag from '../Tag'; // Assuming Tag component is available

export default {
  title: 'Molecules/ContentSelection',
  component: ContentSelection,
  tags: ['autodocs', 'molecule'], // Enable autodocs and categorize

  argTypes: {
    title: {
      control: 'text',
      description: 'The main title for the content selection section.',
    },
    description: {
      control: 'text',
      description: 'A brief description for the content selection section.',
    },
    help: {
      control: 'text', // Can be JSX, but control as text for simple display
      description: 'Optional helper text or component displayed next to the title.',
    },
    // Props specific to ContentSelectionItem will be handled within the render function as they are dynamic children.
  },
  args: {
    title: title,
    description: description,
    help: null, // Default to no help text
  },
};

// --- Story Template for ContentSelection with dynamic content ---
// This template will handle the common rendering logic for content items.
const ContentSelectionStoryTemplate = ({
  initialContent,
  showCheckbox,
  showSelectAll,
  showIndeterminate,
  help,
  ...args
}) => {
  const [content, setContent] = useState(() => initialContent);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [isSelectAllIndeterminate, setIsSelectAllIndeterminate] = useState(false);

  // Initialize select all state based on initial content
  useEffect(() => {
    if (showSelectAll || showIndeterminate) {
      const allChecked = content.every(item => item.isChecked);
      const someChecked = content.some(item => item.isChecked);
      setIsSelectAllChecked(allChecked);
      setIsSelectAllIndeterminate(someChecked && !allChecked);
    }
  }, [content, showSelectAll, showIndeterminate]);

  const _handleCheckboxClick = (id) => {
    const updatedContent = content.map((c) =>
      c.id === id ? { ...c, isChecked: !c.isChecked } : c
    );
    setContent(updatedContent);

    if (showSelectAll || showIndeterminate) {
      const allChecked = updatedContent.every((i) => i.isChecked);
      const someChecked = updatedContent.some((i) => i.isChecked);

      setIsSelectAllChecked(allChecked);
      setIsSelectAllIndeterminate(someChecked && !allChecked);
    }
  };

  const _handleSelectAllChecked = () => {
    const newSelectAllCheckedState = !(isSelectAllChecked && !isSelectAllIndeterminate); // Toggles correctly from checked or indeterminate
    const updatedContent = getUpdatedContentWithCheckedItems(
      content,
      newSelectAllCheckedState,
    );
    setContent(updatedContent);
    setIsSelectAllChecked(newSelectAllCheckedState);
    setIsSelectAllIndeterminate(false);
  };

  const _handleCtaClick = (id) => {
    alert(`Edit CTA clicked for item ID: ${id}`);
    // In a real app, this would open a popup for editing
  };

  return (
    <Box maxWidth="600px" w="100%">
      <ContentSelection {...args} help={help}>
        {(showSelectAll || showIndeterminate) && (
          <Box mb="4px" ml="13px">
            <Checkbox
              checked={isSelectAllChecked}
              id="selectAllCheckbox"
              indeterminate={isSelectAllIndeterminate}
              onChange={_handleSelectAllChecked}
            >
              <Text color="#6c6d6f" type="timestamp">
                Select all questions
              </Text>
            </Checkbox>
          </Box>
        )}
        {content.map((c, i) => (
          <ContentSelectionItem
            ctaLabel={i === 2 ? 'Edit' : ''} // Example of conditional CTA
            id={c.id}
            index={i}
            isChecked={c.isChecked}
            key={c.id}
            label={c.label}
            onCheckboxClick={showCheckbox ? _handleCheckboxClick : undefined}
            onCtaClick={_handleCtaClick}
            showCheckbox={showCheckbox}
          />
        ))}
      </ContentSelection>
    </Box>
  );
};

// --- Stories ---

/**
 * Displays a list of content items without checkboxes.
 * Each item is purely for display.
 */
export const WithoutCheckbox = {
  render: ContentSelectionStoryTemplate,
  args: {
    initialContent: contentWithoutCheckbox,
    showCheckbox: false,
    showSelectAll: false,
    showIndeterminate: false,
    // `title` and `description` are inherited from default args
  },
};

/**
 * Displays content items with individual checkboxes.
 * Users can select/deselect items one by one.
 */
export const WithCheckbox = {
  render: ContentSelectionStoryTemplate,
  args: {
    initialContent: getContentWithCheckbox(contentWithoutCheckbox),
    showCheckbox: true,
    showSelectAll: false,
    showIndeterminate: false,
  },
};

/**
 * Features a "Select all" checkbox to control the selection of all items.
 * Items are initially all selected.
 */
export const WithSelectAll = {
  render: ContentSelectionStoryTemplate,
  args: {
    initialContent: getUpdatedContentWithCheckedItems(
      getContentWithCheckbox(contentWithoutCheckbox),
      true // Start with all items checked
    ),
    showCheckbox: true,
    showSelectAll: true,
    showIndeterminate: false,
    help: <Tag h="0">Recommended</Tag>, // Pass JSX directly
  },
};

/**
 * Implements a "Select all" checkbox with an indeterminate state,
 * reflecting when some but not all items are selected.
 * Items are initially all selected.
 */
export const WithIndeterminateSelectAll = {
  render: ContentSelectionStoryTemplate,
  args: {
    initialContent: getUpdatedContentWithCheckedItems(
      getContentWithCheckbox(contentWithoutCheckbox),
      true // Start with all items checked
    ),
    showCheckbox: true,
    showSelectAll: false, // Indeterminate handles the "select all" functionality visually
    showIndeterminate: true,
    help: <Tag h="0">Recommended</Tag>,
  },
};