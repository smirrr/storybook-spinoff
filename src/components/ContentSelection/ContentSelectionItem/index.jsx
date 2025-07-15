import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../Box';
import Text from '../../Text';
import Checkbox from '../../Checkbox';

const ContentSelectionItem = ({
  ctaLabel,
  id,
  index,
  isChecked,
  isDisabled,
  label,
  onCheckboxClick,
  onCtaClick,
  showCheckbox,
  tag,
  ...rest
}) => {
  const _handleCheckboxClick = () => {
    onCheckboxClick(id);
  };
  const _handleCtaClick = () => {
    if (!ctaLabel) return;
    onCtaClick(id);
  };

  const labelElem = (
    <Text color="grey.10" type="timestamp">
      {index > -1 && `${index + 1}. `}
      {label}
    </Text>
  );

  return (
    <Box
      border="1px solid"
      borderColor="grey.80"
      borderRadius="3px"
      boxSizing="border-box"
      d="flex"
      flex="1"
      justifyContent="space-between"
      m="4px 0"
      p="9px 12px"
      w="100%"
      {...rest}
    >
      <Box alignItems="center" d="inline-flex" justifyContent="flex-start">
        {showCheckbox && (
          <Checkbox
            checked={isChecked}
            disabled={isDisabled}
            id={`checkbox_${id}`}
            onChange={_handleCheckboxClick}
          >
            {labelElem}
          </Checkbox>
        )}
        {!showCheckbox && labelElem}
      </Box>
      <Box d="flex">
        {ctaLabel && (
          <Text
            alignItems="center"
            color="blue.50"
            cursor="pointer"
            d="flex"
            justifyContent="flex-end"
            minWidth="100px"
            onClick={_handleCtaClick}
            pl="10px"
            tag="div"
            type="tag"
          >
            {ctaLabel}
          </Text>
        )}
        {tag && (
          <Text
            alignItems="center"
            color="grey.20"
            d="flex"
            justifyContent="flex-end"
            minWidth={!ctaLabel ? '100px' : 'auto'}
            pl="10px"
            tag="div"
            type="inputFieldLabel"
            userSelect="none"
          >
            {tag}
          </Text>
        )}
      </Box>
    </Box>
  );
};

ContentSelectionItem.displayName = 'ContentSelectionItem';

ContentSelectionItem.propTypes = {
  /** CTA Label */
  ctaLabel: PropTypes.string,
  /** Unique ID if checkbox is enabled */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Index to show numbers in front of labels */
  index: PropTypes.number,
  /** Checkbox checked state */
  isChecked: PropTypes.bool,
  /** Checkbox disabled state */
  isDisabled: PropTypes.bool,
  /** Short label for item */
  label: PropTypes.string.isRequired,
  /** Click handler for checkbox */
  onCheckboxClick: PropTypes.func,
  /** Click handler for CTA */
  onCtaClick: PropTypes.func,
  /** Show and hide checkbox */
  showCheckbox: PropTypes.bool,
  /** Label for tag */
  tag: PropTypes.string
};

ContentSelectionItem.defaultProps = {
  ctaLabel: '',
  id: '',
  index: -1,
  isChecked: false,
  isDisabled: false,
  onCheckboxClick: null,
  onCtaClick: null,
  showCheckbox: false,
  tag: ''
};

export default ContentSelectionItem;
