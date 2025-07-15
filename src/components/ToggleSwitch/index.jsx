import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StyledToggleSwitch from './ToggleSwitch.styled';

const ToggleSwitch = ({ checked, onClick, disabled, id, ...rest }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked !== checked) setIsChecked(checked);
  }, [checked]);

  const _handleClick = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledToggleSwitch
      className="switch"
      disabled={disabled}
      id={id || null}
      onClick={() => _handleClick()}
      {...rest}
    >
      <input checked={isChecked} onChange={() => {}} type="checkbox" />
      <span className="slider round" />
    </StyledToggleSwitch>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string
};

ToggleSwitch.defaultProps = {
  disabled: false,
  checked: false,
  onClick: null,
  id: null
};

ToggleSwitch.displayName = 'ToggleSwitch';
export default ToggleSwitch;
