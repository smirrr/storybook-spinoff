import React from 'react';
import PropTypes from 'prop-types';
import { caretDown, caretUp } from '../IconLib';
import Tooltip from '../Toolip';
import { selectedItemsFormattedString } from './utils';
import Box from '../Box';
import Icon from '../Icon';

const DropDownSelector = ({
  listDisplayKey,
  showDropDown,
  toggleDropDown,
  selectedItems
}) => (
  <Box className="dropDownSelector" onClick={toggleDropDown}>
    <Box className="textContainer">
      <span aria-describedby="tooltipAria">
        {selectedItems && selectedItems.length
          ? selectedItemsFormattedString(selectedItems)
          : 'Select Dogs'}
      </span>
      {selectedItems && selectedItems.length > 0 && (
        <Tooltip id="tooltipAria">
          {selectedItems.map(item => item[listDisplayKey]).join(', ')}
        </Tooltip>
      )}
    </Box>
    {showDropDown ? <Icon icon={caretUp} /> : <Icon icon={caretDown} />}
  </Box>
);

DropDownSelector.propTypes = {
  listDisplayKey: PropTypes.string,
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  showDropDown: PropTypes.bool,
  toggleDropDown: PropTypes.func
};

DropDownSelector.defaultProps = {
  listDisplayKey: 'name',
  selectedItems: [],
  showDropDown: false,
  toggleDropDown: () => {}
};

export default DropDownSelector;
