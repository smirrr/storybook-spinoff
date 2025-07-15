import { useTheme } from '../../theming';
import { addBlack, addWhite } from '../../theming/modules/colors';

// //////////////////////////////////////////////////////////

const baseProps = {
  display: 'inline-flex',
  appearance: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s', // TODO - theme variable
  userSelect: 'none',
  position: 'relative',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  outline: 'none',
  alignSelf: 'center',
  borderWidth: '0'
};

// //////////////////////////////////////////////////////////

const sizeProps = ({ size }) => {
  const buttonSizeRelatedStyles = {
    large: {
      py: 6,
      px: 8,
      borderRadius: 'medium'
    },
    medium: {
      py: 4,
      px: 8,
      borderRadius: 'medium'
    },
    small: {
      py: 2,
      px: 4,
      borderRadius: 'small'
    }
  };

  return buttonSizeRelatedStyles[size];
};

// //////////////////////////////////////////////////////////

const colorProps = ({ color }) => {
  const buttonColorRelatedStyles = {
    primary: {
      color: 'text.onDark'
    },
    basic: {
      color: 'text.normalEmphasis'
    },
    positive: {
      color: 'text.onDark'
    },
    negative: {
      color: 'text.onDark'
    },
    accent: {
      color: 'text.onDark'
    }
  };

  return buttonColorRelatedStyles[color];
};

// //////////////////////////////////////////////////////////

const typeProps = ({ variant, color, theme }) => {
  const focusProps = {
    outline: 'none',
    boxShadow: 'focus'
  };
  const activeProps = {
    borderStyle: 'solid'
  };
  const disabledProps = {
    // opacity: "40%"
    cursor: 'not-allowed',
    boxShadow: 'none'
  };
  const hoverProps = {
    cursor: 'pointer'
  };

  const baseColorForSolidButtons =
    variant === 'solid' && color === 'basic'
      ? '#ffffff'
      : theme.colors[color]['50'];

  const buttonVariantRelatedStyles = {
    solid: {
      boxShadow: 'base',
      borderColor: baseColorForSolidButtons,
      borderWidth: 1,
      bg: baseColorForSolidButtons,
      _focus: {
        ...focusProps
      },
      _hover: {
        ...hoverProps,
        bg: addBlack(baseColorForSolidButtons, 0.08),
        borderColor: addBlack(baseColorForSolidButtons, 0.08),
        boxShadow: 'hover'
      },
      _active: {
        ...activeProps,
        bg: addBlack(baseColorForSolidButtons, 0.15),
        borderColor: addBlack(baseColorForSolidButtons, 0.15),
        boxShadow: 'active'
      },
      _disabled: {
        ...disabledProps,
        bg: 'basic.80',
        borderColor: 'basic.80',
        color: 'basic.50'
      }
    },
    secondary: {
      color:
        color !== 'basic' ? baseColorForSolidButtons : 'text.normalEmphasis',
      borderColor: baseColorForSolidButtons,
      borderWidth: 'size2',
      bg: '#ffffff',
      _focus: {
        ...focusProps
      },
      _hover: {
        ...hoverProps,
        bg: addWhite(baseColorForSolidButtons, 0.92)
      },
      _active: {
        ...activeProps,
        bg: addWhite(baseColorForSolidButtons, 0.85)
      },
      _disabled: {
        ...disabledProps,
        color: 'basic.50',
        borderColor: 'basic.80'
      }
    },
    text: {
      color:
        color === 'basic'
          ? theme.colors.text.normalEmphasis
          : baseColorForSolidButtons,
      _focus: {
        ...focusProps,
        boxShadow: `0 0 0 ${theme.borders.size2} ${theme.colors.primary['80']} inset` // TODO - needs to come from theme
      },
      _hover: {
        ...hoverProps,
        color: addBlack(baseColorForSolidButtons, 0.15),
        bg: addWhite(baseColorForSolidButtons, 0.92)
      },
      _active: {
        ...activeProps,
        color: addBlack(baseColorForSolidButtons, 0.2),
        bg: addWhite(baseColorForSolidButtons, 0.85)
      },
      _disabled: {
        ...disabledProps,
        color: 'basic.50'
      }
    }
  };

  return buttonVariantRelatedStyles[variant];
};

// //////////////////////////////////////////////////////////

const useButtonStyle = props => {
  const theme = useTheme();

  const _props = { ...props, theme };
  return {
    ...baseProps,
    ...colorProps(_props),
    ...typeProps(_props),
    ...sizeProps(_props)
  };
};

export default useButtonStyle;
