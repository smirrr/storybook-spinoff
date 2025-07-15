import React, { useState } from 'react';
import Proptypes from 'prop-types';
import StyledRepliesAccordion from './RepliesAccordian.styled';
import { boldChevronDown, boldChevronUp } from '../IconLib';

import Icon from '../Icon';

const RepliesAccordion = props => {
  const {
    replyRenderFunction,
    replies,
    closedText,
    hideText,
    onToggle,
    noAccordionReplyCount
  } = props;

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleToggle = () => {
    const previousState = isAccordionOpen;
    setIsAccordionOpen(!previousState);
    onToggle();
  };

  return (
    <StyledRepliesAccordion>
      {isAccordionOpen ||
      (noAccordionReplyCount && replies.length <= noAccordionReplyCount) ? (
          <div className="repliesParentContainer">
            {replies.map(reply => {
              return replyRenderFunction(reply);
            })}
          </div>
        ) : null}
      {!(noAccordionReplyCount && replies.length <= noAccordionReplyCount) ? (
        <div className="openCloseText" onClick={handleToggle}>
          {isAccordionOpen ? hideText : closedText}
          <div className="chevronIcon">
            <Icon
              color="grey.100"
              icon={!isAccordionOpen ? boldChevronDown : boldChevronUp}
              size="10px"
            />
          </div>
        </div>
      ) : null}
    </StyledRepliesAccordion>
  );
};

RepliesAccordion.propTypes = {
  /**
   *function to render each individual reply
   */
  replyRenderFunction: Proptypes.func,
  /**
   * Array of objects of each reply
   */
  replies: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      text: Proptypes.string
    })
  ),
  /**
   * String to show when the accordion is closed
   */
  closedText: Proptypes.string,
  /**
   * String to show when the accordion is open
   */
  hideText: Proptypes.string,
  /**
   *function to execute when the button is clicked
   */
  onToggle: Proptypes.func,
  noAccordionReplyCount: Proptypes.number
};

RepliesAccordion.defaultProps = {
  replyRenderFunction: () => {},
  replies: [{ id: 'wdw' }],
  closedText: 'show',
  hideText: 'hide',
  onToggle: () => {},
  noAccordionReplyCount: 0
};

RepliesAccordion.displayName = 'Replies Accordion';

export default RepliesAccordion;
