import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variant } from '@styled-system/variant';
import Box from '../Box';

export const textTypes = [
  'title1',
  'header1',
  'header2',
  'header3',
  'header4',
  'header5',
  'header6',
  'subheader',
  'body',
  'note',
  'button',
  'tag',
  'label',
  'inputFieldLabel',
  'timestamp'
];

export const variants = {
  title1: {
    fontSize: ['size56'],
    lineHeight: ['size64'],
    fontWeight: 'normal',
    letterSpacing: 'small'
  },
  header1: {
    fontSize: ['size40'],
    lineHeight: ['size48'],
    fontWeight: 'normal'
  },
  header2: {
    fontSize: ['size32'],
    lineHeight: ['size40'],
    fontWeight: 'normal'
  },
  header3: {
    fontSize: ['size24'],
    lineHeight: ['size28'],
    fontWeight: 'normal'
  },
  header4: {
    fontSize: ['size20'],
    lineHeight: ['size24'],
    fontWeight: 'bold'
  },
  header5: {
    fontSize: ['size16'],
    lineHeight: ['size20'],
    fontWeight: 'bold'
  },
  header6: {
    fontSize: ['size12'],
    lineHeight: ['size16'],
    fontWeight: 'bold',
    letterSpacing: 'medium'
  },
  subheader: {
    fontSize: ['size20'],
    lineHeight: ['size32'],
    fontWeight: 'bold'
  },
  body: {
    fontSize: ['size16'],
    lineHeight: ['size24'],
    fontWeight: 'normal'
  },
  note: {
    fontSize: ['size14'],
    lineHeight: ['size20'],
    fontWeight: 'normal'
  },
  button: {
    fontSize: ['size14'],
    lineHeight: ['size16'],
    fontWeight: 'bold'
  },
  tag: {
    fontSize: ['size14'],
    lineHeight: ['size16'],
    fontWeight: 'medium',
    letterSpacing: 'medium'
  },
  label: {
    fontSize: ['size12'],
    lineHeight: ['size16'],
    fontWeight: 'medium',
    letterSpacing: 'medium'
  },
  inputFieldLabel: {
    fontSize: ['size10'],
    lineHeight: ['size12'],
    fontWeight: 'medium',
    letterSpacing: 'medium'
  },
  timestamp: {
    fontSize: ['size12'],
    lineHeight: ['size16'],
    fontWeight: 'normal'
  }
};
const StyledText = styled(Box)(
  variant({
    prop: 'type',
    variants
  })
);

// This component should be used any time there is any text to be rendered on the screen, even within other components, because this is where all the styles, the html tags required for the page, and the
const Text = forwardRef(
  ({ customClass, children, tag, type, color, ...rest }, ref) => {
    return (
      <StyledText
        as={tag}
        className={customClass}
        color={color}
        ref={ref}
        type={type}
        {...rest}
      >
        {children}
      </StyledText>
    );
  }
);

Text.propTypes = {
  /**
   * The textual content to be rendered on the screen
   */
  children: PropTypes.node.isRequired,
  /**
   * Color of the text
   */
  color: PropTypes.string,
  /**
   * The custom class for text from parent.
   */
  customClass: PropTypes.string,
  /**
   * The html tag that the text to be rendered is wrapped in. This is available to be toggled because often the design and the page structure differ from each other. In such a case, use the html tag that is appropriate.
   */
  tag: PropTypes.string,
  /**
   * The design style with which the text is to be rendered
   */
  type: PropTypes.oneOf(textTypes)
};

Text.defaultProps = {
  color: 'currentColor',
  tag: 'div',
  type: textTypes[8],
  customClass: ''
};

Text.displayName = 'Text';

export default Text;
