import React, { useState, useEffect } from 'react';
import { CheckmarkOutline32 } from '@carbon/icons-react';
import ItemSelectorDropDown from './index'; // Assuming ItemSelectorDropDown is available
import { animalData as initialAnimalData } from './utils'; // Renamed to avoid conflict with args
import { Box, Icon } from '..'; // Assuming Box and Icon components are available

export default {
  title: 'Templates/ItemSelectorDropDown',
  component: ItemSelectorDropDown,
  tags: ['autodocs', 'template'], // Enable autodocs and categorize

  argTypes: {
    id: { control: 'text', description: 'Unique ID for the dropdown.' },
    list: { control: 'object', description: 'Array of items to display in the dropdown.' },
    listRowHTML: { control: false, description: 'Function to render each row of the dropdown list.' },
    maxHeight: { control: 'number', description: 'Maximum height of the dropdown list in pixels.' },
    searchKeys: { control: 'object', description: 'Array of keys to search within list items.' },
    searchPlaceholder: { control: 'text', description: 'Placeholder text for the search input.' },
    selectedItems: { control: 'object', description: 'Array of currently selected items.' },
    showSearch: { control: 'boolean', description: 'If true, displays a search input.' },
    title: { control: 'text', description: 'Title displayed on the dropdown button/selector.' },
    width: { control: 'number', description: 'Width of the dropdown in pixels.' },
    // Add any other props of ItemSelectorDropDown here if needed for controls
  },
  args: {
    id: 'itemSelectorDropDown',
    list: initialAnimalData, // Default list data
    maxHeight: 250,
    searchKeys: ['name', 'color'],
    searchPlaceholder: 'Search items...',
    showSearch: false,
    title: 'Select Item',
    width: 350,
    // selectedItems will be managed by the story template based on internal state
  },
};

// --- Reusable Story Template for ItemSelectorDropDown ---
const ItemSelectorDropDownStoryTemplate = (args) => {
  const [animalDataState, setAnimalDataState] = useState(() =>
    args.list.map((animal, index) => ({ ...animal, selected: index === 0 }))
  );

  // Effect to re-initialize state if the 'list' arg changes from controls
  useEffect(() => {
    setAnimalDataState(
      args.list.map((animal, index) => ({ ...animal, selected: index === 0 }))
    );
  }, [args.list]);

  const onSelectSingle = (animalToSelect, toggleDropDown) => {
    setAnimalDataState(
      animalDataState.map((eachAnimal) =>
        eachAnimal.name === animalToSelect.name
          ? { ...eachAnimal, selected: true }
          : { ...eachAnimal, selected: false }
      )
    );
    toggleDropDown(); // Close dropdown after single selection
  };

  const onSelectMulti = (animalToToggle) => {
    setAnimalDataState(
      animalDataState.map((eachAnimal) =>
        eachAnimal.name === animalToToggle.name
          ? { ...eachAnimal, selected: !eachAnimal.selected }
          : eachAnimal
      )
    );
  };

  const renderListRow = (item, isMultiSelect, toggleDropDown) => (
    <Box
      className={`dropDownItem ${item.selected ? 'selectedItem' : ''}`}
      onClick={() =>
        isMultiSelect ? onSelectMulti(item) : onSelectSingle(item, toggleDropDown)
      }
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: item.selected ? '#e6f7ff' : 'transparent', // Highlight selected
      }}
    >
      <div>
        <span
          style={{
            padding: '4px 6px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            marginRight: '8px',
            borderRadius: '4px',
            color: '#333',
            fontSize: '0.8em'
          }}
        >
          {item.color}
        </span>
        {item.name}
      </div>
      {item.selected && <Icon color="green" icon={CheckmarkOutline32} />}
    </Box>
  );

  const selectedItems = animalDataState.filter((eachAnimal) => eachAnimal.selected);

  return (
    <Box h={400} p={20} w={400} style={{ border: '1px dashed lightgray' }}> {/* Added border for visibility */}
      <ItemSelectorDropDown
        {...args}
        list={animalDataState}
        selectedItems={selectedItems}
        listRowHTML={({ item, toggleDropDown }) =>
          renderListRow(item, args.isMultiSelect, toggleDropDown)
        }
      />
      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#555' }}>
        <strong>Selected:</strong> {selectedItems.map(s => s.name).join(', ') || 'None'}
      </div>
    </Box>
  );
};

// --- Stories ---

/**
 * A single-select item selector dropdown.
 * Only one item can be selected at a time. Selecting an item closes the dropdown.
 */
export const SingleSelectItemSelectorDropDown = {
  render: ItemSelectorDropDownStoryTemplate,
  args: {
    title: 'Select Dog (Single)',
    searchPlaceholder: 'Search Dogs by names, colors',
    isMultiSelect: false, // Custom arg for the template to control selection logic
    showSearch: false,
    // initial state for animalDataState in template handles initial selection
  },
};

/**
 * A multi-select item selector dropdown.
 * Multiple items can be selected. The dropdown does not close on item selection.
 */
export const MultiSelectDropDown = {
  render: ItemSelectorDropDownStoryTemplate,
  args: {
    title: 'Select Dogs (Multi)',
    searchPlaceholder: 'Search Dogs by names',
    isMultiSelect: true, // Custom arg for the template to control selection logic
    showSearch: false,
    // initial state for animalDataState in template handles initial selection
  },
};

// To enable search functionality from controls, you can duplicate a story
// or create a separate one and override `showSearch`.
/**
 * A multi-select dropdown with an enabled search bar.
 */
export const MultiSelectWithSearch = {
  render: ItemSelectorDropDownStoryTemplate,
  args: {
    title: 'Select Dogs (Multi, Search)',
    searchPlaceholder: 'Search Dogs by names',
    isMultiSelect: true,
    showSearch: true, // Enable search for this specific story
  },
};