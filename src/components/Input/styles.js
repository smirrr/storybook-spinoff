import { variants as textVariants } from '../Text';

const readOnly = {
  _readOnly: {
    userSelect: 'all'
  }
};

const inputVariants = ({ label, iconOrientation }) => {
  return {
    basic: {
      px: 8,
      pt: label ? 11 : 7,
      pb: label ? 3 : 7,
      borderRadius: 'large',
      ...textVariants.label
    },
    basicWithIcon: {
      px: 8,
      pt: label ? 11 : 7,
      pb: label ? 3 : 7,
      pl: iconOrientation === 'left' ? 14 : 8,
      pr: iconOrientation === 'left' ? 8 : 14,
      borderRadius: 'large',
      ...textVariants.label
    },
    withIcon: {
      pl: iconOrientation === 'left' ? 14 : 8,
      pr: iconOrientation === 'left' ? 8 : 14,
      pt: 3,
      pb: 3,
      borderRadius: 'medium',
      ...textVariants.label
    },
    withIconClick: {
      pl: iconOrientation === 'left' ? 14 : 8,
      pr: iconOrientation === 'left' ? 8 : 14,
      pt: 3,
      pb: 3,
      borderRadius: 'medium',
      ...textVariants.label
    },
    withoutLabel: {
      px: 8,
      pt: 3,
      pb: 3,
      borderRadius: 'medium',
      ...textVariants.label
    }
  };
};

const variantProps = props => inputVariants(props)[props.variant];

const getInputBgCol = ({ isInvalid, isDisabled, isReadOnly }) => {
  if (isInvalid) return 'negative.100';
  if (isDisabled) return 'basic.80';
  if (isReadOnly) return 'transparent';
  return 'basic.100';
};

const inputStyle = props => {
  const baseStyle = {
    ...readOnly,
    boxSizing: 'border-box',
    transition: 'all 0.2s',
    border: '1px solid',
    borderColor: 'basic.70',
    boxShadow: 'base',
    bg: getInputBgCol(props.formControl),
    color: 'basic.20',
    _placeholder: {
      color: 'basic.20'
    },
    _hover: {
      borderColor: 'basic.30',
      boxShadow: 'hoverAlt'
    },
    _focus: {
      zIndex: 1,
      borderColor: 'primary.50',
      boxShadow: 'focusAlt',
      outline: 'none'
    },
    _disabled: {
      color: 'basic.30',
      opacity: 0.6,
      cursor: 'not-allowed',
      borderColor: 'basic.70'
    },
    _invalid: {
      borderColor: 'negative.80'
    }
  };
  return {
    width: '100%',
    height: '100%',
    transition: 'all 0.2s',
    pt: 8,
    outline: 'none',
    background: 'none',
    ...baseStyle,
    ...variantProps(props),
    ...textVariants.note,
    color: 'text.highEmphasis'
  };
};

export default inputStyle;
