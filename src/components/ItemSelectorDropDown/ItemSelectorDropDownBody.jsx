import React from 'react';
import PropTypes from 'prop-types';
import { search } from '../IconLib';
import Box from '../Box';
import FormControl from '../FormControl';
import { Input } from '../Input';

const ItemSelectorDropDownBody = ({
  list,
  listRowHTML,
  searchPlaceholder,
  searchQuery,
  setSearchQuery,
  showSearch,
  title,
  toggleDropDown
}) => (
  <Box className="dropDownBodyContainer">
    {title && title.length > 0 && <p className="dropdownTitle">{title}</p>}
    {showSearch && (
      <Box mb={24}>
        <FormControl className="drop-down-search">
          <Input
            className="search"
            icon={search}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            value={searchQuery}
            variant="withIcon"
          />
        </FormControl>
      </Box>
    )}
    <Box className={`optionsContainer ${list.length === 0 ? 'empty' : ''}`}>
      {list.length === 0 && (
        <Box as="span" className="emptyPlaceholder">
          No results found
        </Box>
      )}
      {list.map((item, index) => listRowHTML({ item, index, toggleDropDown }))}
    </Box>
  </Box>
);

ItemSelectorDropDownBody.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  listRowHTML: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggleDropDown: PropTypes.func.isRequired
};

export default ItemSelectorDropDownBody;
