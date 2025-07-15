import React from 'react';
import PropTypes from 'prop-types';
import StyledRadioButton from './ReadioButton.styled';

const RadioButton = ({
  radioButtonColor,
  textColor,
  id,
  size,
  onChange,
  disabled,
  value,
  selectedValue,
  children,
  name,
  ...rest
}) => {
  const _handleChange = e => {
    if (onChange) onChange(e);
  };

  return (
    <StyledRadioButton
      btnColor={radioButtonColor}
      height={size}
      textColor={textColor}
      width={size}
      {...rest}
    >
      <label htmlFor={id}>
        <input
          checked={selectedValue === value}
          disabled={disabled || null}
          id={id}
          name={name}
          onChange={e => _handleChange(e)}
          type="radio"
          value={value}
        />
        <div>{children}</div>
      </label>
    </StyledRadioButton>
  );
};
RadioButton.propTypes = {
  /**
   * child node for radio button label
   */
  children: PropTypes.node,
  /**
   * boolean to disable radio button
   */
  disabled: PropTypes.bool,
  /**
   * id for creating unique radio button
   */
  id: PropTypes.string.isRequired,
  /**
   * name for grouping radio buttons together
   */
  name: PropTypes.string.isRequired,
  /**
   * function to execute onchange of radio button status
   */
  onChange: PropTypes.func,
  /**
   * color of the radio button
   */
  radioButtonColor: PropTypes.string,
  /**
   * selected value for radio group
   */
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  /**
   * size of the radio button
   */
  size: PropTypes.string,
  /**
   * color of the text that comes up
   */
  textColor: PropTypes.string,
  /**
   * value for radio group
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

RadioButton.defaultProps = {
  onChange: () => {},
  size: '16px',
  disabled: false,
  radioButtonColor: '#2f53d7',
  textColor: '#000',
  children: ''
};

RadioButton.displayName = 'Radio Button';

export default RadioButton;
