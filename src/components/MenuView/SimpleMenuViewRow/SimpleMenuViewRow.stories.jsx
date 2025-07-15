import React from 'react';
import Styled from 'styled-components';
import SimpleMenuViewRow from './index';
import { DropdownButton } from '../../Button';

export default {
  title: 'Molecules/MenuView/SimpleMenuViewRow',
  subtitle: 'SimpleMenuViewRow',
  component: SimpleMenuViewRow
};

const item2 = { label: 'Quarter 2', id: 234 };

const className = null;

const selectedItem = { label: 'Quarter 2', id: 234 };

const onSelection = id => {
  console.log(id, '-------id------>>>>>');
};

const customComponentMenuView = Styled.div`
  display:flex;
  justify-content:center;
  padding:4px 16px 4px 16px;
`;

export const DefaultSimpleMenuViewRow = () => {
  return (
    <SimpleMenuViewRow
      className={className}
      isDisabled={false}
      item={item2}
      onSelection={onSelection}
      selectedItem={selectedItem}
      type="label"
    />
  );
};

export const FullWidthSimpleMenuViewRow = () => {
  return (
    <SimpleMenuViewRow
      className={className}
      isDisabled={false}
      isFullWidth
      item={item2}
      onSelection={onSelection}
      selectedItem={selectedItem}
    />
  );
};

export const CustomComponentsMenuView = () => {
  return (
    <SimpleMenuViewRow className={customComponentMenuView}>
      <DropdownButton>I am inside menu view row</DropdownButton>
    </SimpleMenuViewRow>
  );
};
