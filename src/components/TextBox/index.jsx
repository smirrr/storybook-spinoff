import React, { forwardRef, useEffect, createRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from '../Box';
import Text from '../Text';
import { chevronDown, chevronUp } from '../IconLib';
import { TextButton } from '../Button';

const StyledTextBox = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.maxLines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`;

const isTruncated = (el) => {
  return el.scrollHeight > el.clientHeight
};

// This component should be used any time there is any text to be rendered on the screen, even within other components, because this is where all the styles, the html tags required for the page, and the
const TextBox =forwardRef(({ children, maxLines, ...rest }, ref) => {
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const [isReadMoreButtonExpanded, setIsReadMoreButtonExpanded] = useState(false);
  const [_maxLines, _setMaxLines] = useState(maxLines);
  const refHere = ref || createRef();
  useEffect(() => {
    if(isTruncated(refHere.current)) {
    	setShowReadMoreButton(true);
    }
  }, [refHere]);

  const toggleShowMore = () => {
    _setMaxLines(isReadMoreButtonExpanded ? maxLines : 999);
    setIsReadMoreButtonExpanded(!isReadMoreButtonExpanded);
  };

  return (
    <Box>
      <Box as={StyledTextBox} maxLines={_maxLines} {...rest} ref={refHere}>
        {children}
      </Box>
      {showReadMoreButton && <TextButton color="basic" mt={4} onClick={() => toggleShowMore()} rightIcon={isReadMoreButtonExpanded ? chevronUp : chevronDown} size="small">Read {isReadMoreButtonExpanded ? 'less' : 'more'}</TextButton>}
    </Box>
  );
});

TextBox.propTypes = {
  /**
	 * The textual content to be rendered on the screen
	 */
  children: PropTypes.node.isRequired,
  /**
	 * Max no. of lines allowed by the textbox component
	 */
  maxLines: PropTypes.number
};

TextBox.defaultProps = {
  maxLines: 3
};

TextBox.displayName = 'TextBox';

export default TextBox;
