import React from 'react';
import styled from 'styled-components';
import SimpleMenuView from './index';
import SimpleMenuViewRow from '../SimpleMenuViewRow';
import { DropdownButton } from '../../Button';
import { tag } from '../../IconLib';

// Reusable Data
const item1 = { label: 'Quarter 1', id: 123 };
const item2 = { label: 'Quarter 2', id: 234 };
const item3 = { label: 'Quarter 3', id: 1234 };

const selectedItem = { label: 'Quarter 2', id: 234 };

const onSelection = (id) => {
  console.log(id, '-------id------>>>>>');
};

const CustomWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px 16px;
`;

// Storybook Metadata
export default {
  title: 'Molecules/MenuView/SimpleMenuView',
  component: SimpleMenuView,
  tags: ['autodocs', 'molecule'],
  argTypes: {
    width: {
      control: 'text',
    },
    isFullWidth: {
      control: 'boolean',
    },
  },
  args: {
    width: '300px',
    isFullWidth: false,
    // type: 'label',
    // items: [item1, item2, item3],
    // selectedItem: selectedItem,
  },
};

// 🔹 Default
export const Default = (args) => (
  <SimpleMenuView {...args}>
    <SimpleMenuViewRow
      item={item1}
      isDisabled={false}
      selectedItem={selectedItem}
      onSelection={onSelection}
    />
    <SimpleMenuViewRow
      item={item3}
      defaultBg="#FF4784"
      defaultTextColor="#d8d8d8"
      selectedItem={selectedItem}
      onSelection={onSelection}
    />
    <SimpleMenuViewRow
      item={item2}
      isDisabled
      onSelection={onSelection}
    />
  </SimpleMenuView>
);

// 🔹 Full Width
export const FullWidth = (args) => (
  <SimpleMenuView {...args}>
    <SimpleMenuViewRow
      item={item2}
      isDisabled
      isFullWidth
      selectedItem={selectedItem}
      onSelection={onSelection}
    />
    <SimpleMenuViewRow className={CustomWrapper} isFullWidth>
      <DropdownButton>I am inside menu view row</DropdownButton>
    </SimpleMenuViewRow>
  </SimpleMenuView>
);
FullWidth.args = {
  isFullWidth: true,
};

// 🔹 Custom Color Full Width
export const CustomColorFullWidth = (args) => (
  <SimpleMenuView {...args}>
    <SimpleMenuViewRow
      item={item3}
      defaultBg="#FF4784"
      defaultTextColor="#d8d8d8"
      isFullWidth
      selectedItem={selectedItem}
      onSelection={onSelection}
    />
  </SimpleMenuView>
);
CustomColorFullWidth.args = {
  isFullWidth: true,
};

// 🔹 With Custom Component
export const WithCustomComponent = (args) => (
  <SimpleMenuView {...args}>
    <SimpleMenuViewRow border="none" className={CustomWrapper}>
      <DropdownButton>I am inside menu view row</DropdownButton>
    </SimpleMenuViewRow>
  </SimpleMenuView>
);
