/* eslint-disable react/jsx-fragments */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormControlContext } from '../FormControl';
import PseudoBox from '../PseudoBox';
import Box from '../Box';
import { InputLabel } from '../FormLabel';
import { IconButton } from '../Button';
import Icon from '../Icon';
import inputStyle from './styles';

const InputIconButton = forwardRef(
  ({ icon, iconOrientation, onIconClick }, ref) => {
    const formControl = useFormControlContext();
    const styleProps = {
      alignItems: 'center',
      color: formControl.isFocused ? 'primary.50' : 'basic.20',
      display: 'flex',
      position: 'absolute',
      top: 0,
      bottom: 0,
      margin: 'auto'
    };
    const stateStyleProps = {
      border: 'none',
      bg: 'transparent',
      cursor: 'pointer'
    };

    if (iconOrientation === 'right') {
      styleProps.left = 'auto';
      styleProps.right = 4;
    }
    return (
      <Box {...styleProps} ref={ref}>
        <IconButton
          _active={stateStyleProps}
          _focus={stateStyleProps}
          _hover={stateStyleProps}
          bg="transparent"
          border="none"
          color="basic"
          icon={icon}
          onClick={onIconClick}
          size={3}
          variant="ghost"
        />
      </Box>
    );
  }
);

InputIconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  iconOrientation: PropTypes.oneOf(['left', 'right']),
  onIconClick: PropTypes.func
};

InputIconButton.defaultProps = {
  iconOrientation: 'left',
  onIconClick: null
};

const InputIcon = forwardRef(({ icon, iconOrientation, size }, ref) => {
  const formControl = useFormControlContext();
  const styleProps = {
    color: formControl.isFocused ? 'primary.50' : 'basic.20',
    position: 'absolute',
    pointerEvents: 'none',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 4
  };
  if (iconOrientation === 'right') {
    styleProps.left = 'auto';
    styleProps.right = 4;
  }
  return (
    <Box {...styleProps} ref={ref}>
      <Icon
        color={formControl.isFocused ? 'primary.50' : 'basic.20'}
        icon={icon}
        size={size}
      />
    </Box>
  );
});

InputIcon.propTypes = {
  icon: PropTypes.shape({ render: PropTypes.func }).isRequired,
  iconOrientation: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.string
};

InputIcon.defaultProps = {
  iconOrientation: 'left',
  size: 'icons.s'
};

export const Input = forwardRef((props, ref) => {
  const {
    icon,
    iconOrientation,
    label,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    isReadOnly,
    isDisabled,
    isInvalid,
    isRequired,
    onChange,
    onBlur,
    onFocus,
    onIconClick,
    placeholder,
    variant,
    ...rest
  } = props;
  const formControl = useFormControlContext();
  const { value } = props || formControl;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  const _onBlur = event => {
    if (!inputValue || !inputValue.length)
      formControl.setContext({ isActive: false, isFocused: false });
    else formControl.setContext({ isFocused: false });
    if (onBlur) onBlur(event);
  };
  const _onFocus = event => {
    formControl.setContext({ isFocused: true, isActive: true });
    if (onFocus) onFocus(event);
  };
  const inputStyleProps = inputStyle({ ...props, formControl });
  return (
    <PseudoBox position="relative">
      {variant === 'basic' && <InputLabel>{label}</InputLabel>}
      {variant === 'withIcon' && (
        <InputIconButton
          icon={icon}
          iconOrientation={iconOrientation}
          onIconClick={onIconClick}
        />
      )}
      {variant === 'withIconClick' && (
        <InputIcon
          icon={icon}
          iconOrientation={iconOrientation}
          size="icons.m"
        />
      )}
      {variant === 'basicWithIcon' && (
        <React.Fragment>
          <InputLabel>{label}</InputLabel>
          <InputIcon
            icon={icon}
            iconOrientation={iconOrientation}
            size="icons.m"
          />
        </React.Fragment>
      )}
      <PseudoBox
        aria-describedby={ariaDescribedby}
        aria-disabled={formControl.isDisabled}
        aria-invalid={formControl.isInvalid}
        aria-label={ariaLabel}
        aria-readonly={isReadOnly}
        aria-required={formControl.isRequired}
        as="input"
        disabled={formControl.isDisabled}
        onBlur={event => _onBlur(event)}
        onChange={event => {
          setInputValue(event.target.value);
          if (onChange) onChange(event);
        }}
        onFocus={event => _onFocus(event)}
        placeholder={variant?.includes('basic') ? null : placeholder}
        readOnly={formControl.isReadOnly}
        ref={ref}
        required={formControl.isRequired}
        value={inputValue}
        variant={variant}
        {...inputStyleProps}
        {...rest}
      />
    </PseudoBox>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /**
   * The label that the input is given, accessible to screen-readers.
   */
  'aria-describedby': PropTypes.string,
  /**
   * Aria-Label attribute
   */
  'aria-label': PropTypes.string,
  /**
   * Pass an `icon` from IconLib for when `variant` is set to `withIcon`. Only applicable for variant = `withIcon`
   */
  icon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * Orientation of the icon
   */
  iconOrientation: PropTypes.oneOf(['left', 'right']),
  /**
   * If true, input is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * If true, input has error styles applied
   */
  isInvalid: PropTypes.bool,
  /**
   * If true, input is read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * If true, input has `required` attribute set to true, along with `aria-required` attribute
   */
  isRequired: PropTypes.bool,
  /**
   * Label for input field. Only applicable when variant = `basic`
   */
  label: PropTypes.string,
  /**
   * onBlur function of the input
   */
  onBlur: PropTypes.func,
  /**
   * onChange function of the input
   */
  onChange: PropTypes.func,
  /**
   * onFocus function of the input
   */
  onFocus: PropTypes.func,
  /**
   * on click event for the icon in the input
   */
  onIconClick: PropTypes.func,
  /**
   * Native placeholder attribute
   */
  placeholder: PropTypes.string,
  /**
   * If supplied, input will have a pre-filled value
   */
  value: PropTypes.string,
  /**
   * `basic` variant includes the `material design style input label`. `withIcon` does not include a label.
   */
  variant: PropTypes.oneOf([
    'basic',
    'basicWithIcon',
    'withoutLabel',
    'withIcon',
    'withIconClick'
  ])
};

Input.defaultProps = {
  'aria-describedby': undefined,
  'aria-label': undefined,
  icon: null,
  iconOrientation: 'left',
  isDisabled: undefined,
  isInvalid: undefined,
  isReadOnly: undefined,
  isRequired: undefined,
  label: undefined,
  onBlur: null,
  onChange: null,
  onFocus: null,
  onIconClick: null,
  placeholder: null,
  value: '',
  variant: 'basic'
};

export const TextArea = forwardRef((props, ref) => {
  const {
    placeholder,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    isReadOnly,
    isDisabled,
    isInvalid,
    isRequired,
    onChange,
    onBlur,
    onFocus,
    ...rest
  } = props;
  const formControl = useFormControlContext();
  const { value } = props || formControl;
  const [textAreaValue, setTextAreaValue] = useState(value);
  const inputStyleProps = inputStyle({
    ...props,
    formControl,
    variant: 'basic'
  });

  useEffect(() => {
    setTextAreaValue(props.value);
  }, [props.value]);

  const _onBlur = event => {
    if (!textAreaValue || !textAreaValue.length)
      formControl.setContext({ isActive: false, isFocused: false });
    else formControl.setContext({ isFocused: false });
    if (onBlur) onBlur(event);
  };
  const _onFocus = event => {
    formControl.setContext({ isFocused: true, isActive: true });
    if (onFocus) onFocus(event);
  };
  return (
    <PseudoBox
      {...rest}
      aria-describedby={ariaDescribedby}
      aria-disabled={formControl.isDisabled}
      aria-invalid={formControl.isInvalid}
      aria-label={ariaLabel}
      aria-readonly={isReadOnly}
      aria-required={formControl.isRequired}
      as="textarea"
      disabled={formControl.isDisabled}
      onBlur={event => _onBlur(event)}
      onChange={event => {
        setTextAreaValue(event.target.value);
        if (onChange) onChange(event);
      }}
      onFocus={event => _onFocus(event)}
      placeholder={placeholder}
      readOnly={formControl.isReadOnly}
      ref={ref}
      required={formControl.isRequired}
      value={textAreaValue}
      {...inputStyleProps}
    />
  );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  /**
   * The label that the textarea is given, accessible to screen-readers.
   */
  'aria-describedby': PropTypes.string,
  /**
   * Aria-Label attribute
   */
  'aria-label': PropTypes.string,
  /**
   * If true, textarea is disabled
   */
  isDisabled: PropTypes.bool,
  /**
   * If true, textarea has error styles applied
   */
  isInvalid: PropTypes.bool,
  /**
   * If true, textarea is read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * If true, textarea has `required` attribute set to true, along with `aria-required` attribute
   */
  isRequired: PropTypes.bool,
  /**
   * onBlur function of the textarea
   */
  onBlur: PropTypes.func,
  /**
   * onChange function of the textarea
   */
  onChange: PropTypes.func,
  /**
   * onFocus function of the textarea
   */
  onFocus: PropTypes.func,
  /**
   * Native placeholder attribute
   */
  placeholder: PropTypes.string,
  /**
   * If supplied, textarea will have a pre-filled value
   */
  value: PropTypes.string
};

TextArea.defaultProps = {
  'aria-describedby': undefined,
  'aria-label': undefined,
  isDisabled: undefined,
  isInvalid: undefined,
  isReadOnly: undefined,
  isRequired: undefined,
  onBlur: null,
  onChange: null,
  onFocus: null,
  placeholder: undefined,
  value: ''
};
