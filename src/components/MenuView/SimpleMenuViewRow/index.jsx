/* eslint-disable react/sort-prop-types */
/* eslint-disable react/jsx-sort-default-props */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import PseudoBox from '../../PseudoBox';
import Text from '../../Text';

const SimpleMenuViewRow = ({
  children,
  isDisabled,
  item,
  isFullWidth,
  onSelection,
  optionLabel,
  selectedItem,
  className,
  defaultBg,
  defaultTextColor,
  disableBg,
  disableTextColor,
  selectionBg,
  selectionTextColor,
  type,
  width,
  ...rest
}) => {
  return (
    <PseudoBox
      _hover={{
        bg: !isDisabled ? '#ebf6ff' : ''
      }}
      backgroundColor={
        isDisabled
          ? disableBg
          : selectedItem && selectedItem.id === item.id
            ? selectionBg
            : defaultBg
      }
      borderBottomWidth="1px"
      borderColor="#e2e2ea"
      borderStyle="solid"
      className={className}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      display="flex"
      flexDirection="row"
      onClick={() => onSelection(item)}
      pl="16px"
      py="8px"
      textOverflow="ellipsis"
      transition="all 0.2s"
      width={isFullWidth ? '100%' : width}
      {...rest}
    >
      {children || (
        <Text
          className="dropdownrow"
          color={
            isDisabled
              ? disableTextColor
              : selectedItem && selectedItem.id === item.id
                ? selectionTextColor
                : defaultTextColor
          }
          fontWeight="bold"
          type={type}
        >
           {item && item[optionLabel]}
        </Text>
      )}
    </PseudoBox>
  );
};

const defaultFunction = () => {};

SimpleMenuViewRow.propTypes = {
  /**
   *This child for Menu view row where one can pass any node or any other components.
   */
  children: PropTypes.node,
  /**
   *Default background color value.
   */
  defaultBg: PropTypes.string,
  /**
   *Default background text color value.
   */
  defaultTextColor: PropTypes.string,
  /**
   *Disable background color value.
   */
  disableBg: PropTypes.string,
  /**
   *Disable text color value.
   */
  disableTextColor: PropTypes.string,
  /**
   *Selection background color value.
   */
  selectionBg: PropTypes.string,
  /**
   *Selection Text color value.
   */
  selectionTextColor: PropTypes.string,
  /**
   *This className for Menu view row.
   */
  className: PropTypes.string,
  /**
   *Boolean which check if this row is disable.
   */
  isDisabled: PropTypes.bool,
  /**
   *If row will take full width or not
   */
  isFullWidth: PropTypes.bool,
  /**
   *Current item.
   */
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  /**
   *A callback which update the selected item .
   */
  onSelection: PropTypes.func,
  /**
   *Property from the object to display the text
   */
  optionLabel: PropTypes.string,
  /**
   *Object of selected item.
   */
  selectedItem: PropTypes.oneOfType([PropTypes.object]),
  /**
   *Type for text i.e. 'title1' | 'header1' | 'header2' | 'header3' | 'header4' |
   'header5' | 'header6' | 'subheader' | 'body' | 'note' | 'button' | 'tag' |
   'label' | 'inputFieldLabel' | 'timestamp'.
   */
  type: PropTypes.string,
  /**
   *Width of row/custom components.
   */
  width: PropTypes.string
};

SimpleMenuViewRow.defaultProps = {
  children: null,
  defaultBg: '#ffffff',
  defaultTextColor: '#6c6d6f',
  disableBg: '#ffffff',
  disableTextColor: '#adadae',
  isDisabled: false,
  selectionBg: '#ebf6ff',
  selectionTextColor: '#2f53d7',
  className: null,
  isFullWidth: false,
  onSelection: defaultFunction(),
  optionLabel: 'label',
  selectedItem: null,
  type: 'body',
  width: '300px'
};

SimpleMenuViewRow.displayName = 'SimpleMenuViewRow';
export default SimpleMenuViewRow;
