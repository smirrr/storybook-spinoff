import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import StyledCheckbox from './Checkbox.styled';

// TODO: Add icon support for all states of checkmark

const getCheckboxClassName = (checked, disabled, indeterminate) => {
  let className = '';
  if (disabled) className += 'disabled';
  if (indeterminate) {
    className += ' indeterminate';
  } else if (checked) {
    className += ' checked';
  }
  return className;
};

const Checkbox = ({
  checked,
  children,
  className,
  disabled,
  id,
  indeterminate,
  onChange
}) => {
  const _handleClick = () => {
    if (onChange) onChange(id);
  };

  return (
    <StyledCheckbox
      className={`${className} checkboxContainer`}
      disabled={disabled}
    >
      <Box as="span">
        <input
          checked={checked}
          data-indeterminate={indeterminate}
          disabled={disabled}
          id={id}
          name={id}
          onChange={_handleClick}
          type="checkbox"
        />
      </Box>
      <Box as="label" htmlFor={id} userSelect="none">
        <Box
          as="span"
          className={`checkmark ${getCheckboxClassName(
            checked,
            disabled,
            indeterminate
          )}`}
        />
        <Box flex="1" fontSize="size14">
          {children}
        </Box>
      </Box>
    </StyledCheckbox>
  );
};

Checkbox.propTypes = {
  /**
   * Is checkbox checked state?
   */
  checked: PropTypes.bool.isRequired,
  /**
   * Label for checkbox
   */
  children: PropTypes.node.isRequired,
  /**
   * Class name for checkbox's parent element
   */
  className: PropTypes.string,
  /**
   * Is checkbox disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Unique identifier for checkbox id and name
   */
  id: PropTypes.string.isRequired,
  /**
   * Is checkbox in indeterminate state?
   */
  indeterminate: PropTypes.bool,
  /**
   * Handler to change state of checkbox
   */
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  className: '',
  disabled: false,
  indeterminate: false,
  onChange: null
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
