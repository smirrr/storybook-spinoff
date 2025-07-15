import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultItemSelectorDropDownSelector from './ItemSelectorDropDownSelector';
import ItemSelectorDropDownBody from './ItemSelectorDropDownBody';
import StyledItemSelectorDropDown from './ItemSelectorDropDown.styled';

const ItemSelectorDropDown = ({
  DropDownSelector,
  id,
  list,
  listDisplayKey,
  listRowHTML,
  maxHeight,
  searchKeys,
  searchPlaceholder,
  selectedItems,
  showSearch,
  title,
  width
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = useMemo(
    () =>
      searchQuery && searchQuery.length > 0
        ? list.filter(item =>
          searchKeys
            .map(key => item[key])
            .join(',')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        : list,
    [searchQuery, list]
  );

  useEffect(() => {
    const selector = document.querySelector(`#${id} .dropDownSelector`);
    const dropDownBody = document.querySelector(
      `#${id} .dropDownBodyContainer`
    );
    if (selector) {
      const outSideClickListener = e => {
        if (
          showDropDown &&
          e.target !== selector &&
          !selector.contains(e.target) &&
          !(dropDownBody && dropDownBody.contains(e.target))
        ) {
          setSearchQuery('');
          setShowDropDown(false);
        }
      };
      document.addEventListener('click', outSideClickListener, true);
      return () => {
        document.removeEventListener('click', outSideClickListener, true);
      };
    }
    return () => {};
  }, [id, showDropDown]);

  const toggleDropDown = () => {
    setSearchQuery('');
    setShowDropDown(!showDropDown);
  };

  return (
    <StyledItemSelectorDropDown
      id={id}
      maxHeight={`${maxHeight}px`}
      width={`${width}px`}
    >
      {DropDownSelector ? (
        <DropDownSelector
          listDisplayKey={listDisplayKey}
          selectedItems={selectedItems}
          showDropDown={showDropDown}
          toggleDropDown={toggleDropDown}
        />
      ) : (
        <DefaultItemSelectorDropDownSelector
          listDisplayKey={listDisplayKey}
          selectedItems={selectedItems}
          showDropDown={showDropDown}
          toggleDropDown={toggleDropDown}
        />
      )}
      {showDropDown && (
        <ItemSelectorDropDownBody
          list={filteredList}
          listRowHTML={listRowHTML}
          searchPlaceholder={searchPlaceholder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearch={showSearch}
          title={title}
          toggleDropDown={toggleDropDown}
        />
      )}
    </StyledItemSelectorDropDown>
  );
};

ItemSelectorDropDown.propTypes = {
  /**
   * Custom DropDownSelector component
   */
  DropDownSelector: PropTypes.element,
  /**
   * id of the dropdown
   */
  id: PropTypes.string.isRequired,
  /**
   * Item array to be displayed in the dropdown
   */
  list: PropTypes.arrayOf(PropTypes.object),
  /**
   * Which key to display in the selector
   */
  listDisplayKey: PropTypes.string,
  /**
   * function to render each item of the dropdown
   */
  listRowHTML: PropTypes.func,
  /**
   * Maximum height of the dropdown
   */
  maxHeight: PropTypes.number,
  /**
   * keys which will be searched
   */
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  /**
   * Custom DropDownSelector component
   */
  searchPlaceholder: PropTypes.string,
  /**
   * List of selected items
   */
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  /**
   * Show/hide Search Bar in the dropdown
   */
  showSearch: PropTypes.bool,
  /**
   * Title of the dropdown
   */
  title: PropTypes.string,
  /**
   * width of dropdown
   */
  width: PropTypes.number
};

ItemSelectorDropDown.defaultProps = {
  DropDownSelector: null,
  list: [],
  listDisplayKey: 'name',
  listRowHTML: () => {},
  maxHeight: 250,
  searchKeys: ['name'],
  searchPlaceholder: 'Search items by name',
  selectedItems: [],
  showSearch: true,
  title: '',
  width: 350
};

ItemSelectorDropDown.displayName = 'DropDown';

export default ItemSelectorDropDown;
