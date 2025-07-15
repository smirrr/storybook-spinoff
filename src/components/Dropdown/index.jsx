/* eslint-disable consistent-return */
import React, { memo, useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Renders the dropdown
 * @param {string} id {required} id of the dropdown
 * @param {string} className {optional}
 * @param {boolean} disabled {optional} clicking on the selector won't open the dropdown
 * @param {integer} width
 * @param {boolean} open {optional} pass it to control the dropdown visibility
 * @param {function} onToggle {optional} pass it if you want to call any function when a dropdown is toggled
 * @param {object} dynamicProps pass properties which can change dynamically and can affect the dropdown attributes such as height or width, if you don't pass such props dropdown height and width won't change
 * @param {boolean} preferTop sets the default dropdown position to on top of the selector
 * @param {boolean} preferLeft sets the default dropdown position to the left of the selector
 */

export const toPx = value => (typeof value === 'number' ? `${value}px` : value);

const showDropDownAnimation = keyframes`
   from {
     opacity: 0;
   }
   to {
     opacity: 1;
   }
 `;

const StyledDropdown = styled.div.attrs({ className: 'dropDownBody' })`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1),
    0 32px 32px 0 rgba(134, 139, 143, 0.2);
  background-color: #fff;
  display: ${props => (props.open ? 'block' : 'none')};
  min-width: ${props => `${props.minDropDownWidth}px`};
  max-height: ${props => `${props.maxDropDownHeight}px`};
  ${props => (props.textAlign ? `text-align: ${props.textAlign}` : '')};
  white-space: nowrap;
  z-index: 10;
  position: fixed;
  top: ${props => `${props.dropDownTop}px`};
  ${props => (props.dropDownLeft ? `left: ${props.dropDownLeft}px` : '')};
  ${props => (props.dropDownRight ? `right: ${props.dropDownRight}px` : '')};
  animation: ${showDropDownAnimation} 0.25s linear;
`;

const DropDown = memo(props => {
  const {
    id,
    className,
    enableScrollBlock,
    scrollAncestorIdentifier,
    disabled,
    width,
    open,
    onToggle,
    dynamicProps,
    preferTop,
    preferLeft,
    distanceFromSelector,
    parentContainerId,
    showDarkBg
  } = props;
  const [dropDownTop, setShowDropDownTop] = useState(0);
  const [dropDownLeft, setShowDropDownLeft] = useState(0);
  const [dropDownRight, setShowDropDownRight] = useState(0);
  const [minDropDownWidth, setMinDropDownWidth] = useState(0);
  const [maxDropDownHeight, setMaxDropDownHeight] = useState(0);
  const [showDropDown, setShowDropDown] = useState(
    open !== null ? open : false
  );
  const [reRender, setReRender] = useState(0);

  const getParentTranslatedXY = (x, y, parentContainer) => {
    if (!parentContainer) return { x1: x, y1: y };
    const parentRect = parentContainer.getBoundingClientRect();
    return { x1: x - parentRect.left, y1: y - parentRect.top };
  };

  const evaluateDropDownAttributes = (
    x,
    y,
    dropDownWidth,
    dropDownHeight,
    selectorWidth,
    selectorHeight
  ) => {
    const parentContainer = parentContainerId
      ? document.getElementById(parentContainerId)
      : null;
    const { x1, y1 } = getParentTranslatedXY(x, y, parentContainer);
    const clientHeight = parentContainer
      ? parentContainer.clientHeight
      : window.innerHeight;
    const clientWidth = parentContainer
      ? parentContainer.clientWidth
      : window.innerWidth;
    let float = preferLeft ? 'left' : 'right';
    let position = preferTop ? 'top' : 'bottom';
    // eslint-disable-next-line no-shadow
    let maxDropDownHeight =
      props.maxDropDownHeight && props.maxDropDownHeight <= dropDownHeight
        ? props.maxDropDownHeight
        : dropDownHeight;
    if (dropDownWidth - (clientWidth - x1) > 0) float = 'left';
    if (
      maxDropDownHeight + selectorHeight > clientHeight - y1 &&
      y1 > clientHeight - y1
    ) {
      position = 'top';
    }
    if (position === 'top') {
      const topEstate = y1 - 40;
      maxDropDownHeight =
        maxDropDownHeight < topEstate ? maxDropDownHeight : topEstate;
    }
    if (position === 'bottom') {
      const bottomEstate = clientHeight - y1 - 40;
      maxDropDownHeight =
        maxDropDownHeight < bottomEstate ? maxDropDownHeight : bottomEstate;
    }
    return {
      left: float === 'right' ? x1 : undefined,
      right: float === 'left' ? clientWidth - (x1 + selectorWidth) : undefined,
      top:
        position === 'top'
          ? y1 - maxDropDownHeight
          : y1 + selectorHeight + distanceFromSelector,
      maxDropDownHeight
    };
  };

  const getScrollAncestor = () =>
    enableScrollBlock &&
    scrollAncestorIdentifier &&
    document.querySelector(scrollAncestorIdentifier)
      ? document.querySelector(scrollAncestorIdentifier)
      : null;

  const enableBackgroundScroll = () => {
    if (getScrollAncestor()) getScrollAncestor().style.overflow = 'auto';
  };

  const disableBackgroundScroll = () => {
    if (getScrollAncestor()) getScrollAncestor().style.overflow = 'hidden';
  };

  const closeDropDown = () => {
    enableBackgroundScroll();
    setShowDropDown(false);
    if (onToggle) onToggle(false);
  };

  useEffect(() => {
    const listener = () => {
      setReRender(!reRender);
      enableBackgroundScroll();
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [reRender]);

  useEffect(() => {
    const rect = document.getElementById(id)
      ? document.getElementById(id).getBoundingClientRect()
      : null;
    const dropDown = document.querySelector(`#${id} .dropDownBody`);
    if (document.getElementById(id) && dropDown && rect) {
      const dropDownWidth = dropDown.clientWidth;
      const dropDownHeight = dropDown.scrollHeight;
      const selectorWidth = rect.width;
      const selectorHeight = rect.height;
      setMinDropDownWidth(rect.width);
      const dropDownAttributes = evaluateDropDownAttributes(
        rect.left,
        rect.top,
        dropDownWidth,
        dropDownHeight,
        selectorWidth,
        selectorHeight
      );
      setShowDropDownTop(dropDownAttributes.top);
      setShowDropDownLeft(dropDownAttributes.left);
      setShowDropDownRight(dropDownAttributes.right);
      setMaxDropDownHeight(dropDownAttributes.maxDropDownHeight);
    }
  }, [
    id,
    showDropDown,
    reRender,
    props.maxDropDownHeight,
    dynamicProps,
    preferTop,
    preferLeft
  ]);

  useEffect(() => {
    const selector = document.querySelector(`#${id} .dropDownSelector`);
    const dropDownBody = document.querySelector(`#${id} .dropDownBody`);
    if (!disabled && selector) {
      const listener = e => {
        if (selector === e.target || selector.contains(e.target)) {
          if (!showDropDown) disableBackgroundScroll();
          else enableBackgroundScroll();
          if (props.isCloseOnClickSelector) {
            setShowDropDown(!showDropDown);
            if (onToggle) onToggle(!showDropDown);
          }
        }
      };
      const outSideClickListener = e => {
        if (
          showDropDown &&
          e.target !== selector &&
          !selector.contains(e.target) &&
          !(dropDownBody && dropDownBody.contains(e.target))
        )
          closeDropDown();
      };
      selector.addEventListener('click', listener);
      document.addEventListener('click', outSideClickListener, true);
      return () => {
        selector.removeEventListener('click', listener);
        document.removeEventListener('click', outSideClickListener, true);
      };
    }
  }, [id, showDropDown, disabled, onToggle]);

  useEffect(() => {
    if (open !== undefined) {
      if (open) {
        setShowDropDown(open);
        return;
      }
      setShowDropDown(false);
    }
  }, [open]);

  return (
    <Fragment>
      {showDropDown && showDarkBg && (
        <div
          className="showDarkBg"
          onClick={closeDropDown}
          style={{
            cursor: 'default',
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 8,
            backgroundColor: 'rgba(0,0,0,0)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      )}
      <div
        className={`dropDownWrapper${className ? ` ${className}` : ''}`}
        id={id}
        width={width}
      >
        <div className={`dropDownSelector${showDropDown ? ' active' : ''}`}>
          {props.selector}
        </div>
        <StyledDropdown
          dropDownLeft={dropDownLeft}
          dropDownRight={dropDownRight}
          dropDownTop={dropDownTop}
          maxDropDownHeight={maxDropDownHeight}
          minDropDownWidth={minDropDownWidth}
          open={showDropDown}
        >
          {props.children}
        </StyledDropdown>
      </div>
    </Fragment>
  );
});

DropDown.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  distanceFromSelector: 0,
  dynamicProps: null,
  enableScrollBlock: false,
  id: null,
  isCloseOnClickSelector: true,
  maxDropDownHeight: null,
  onToggle: () => null,
  open: false,
  preferLeft: false,
  preferTop: false,
  scrollAncestorIdentifier: null,
  selector: null,
  width: null,
  parentContainerId: null,
  showDarkBg: false
};

DropDown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  distanceFromSelector: PropTypes.number,
  dynamicProps: PropTypes.shape(Object),
  enableScrollBlock: PropTypes.bool,
  id: PropTypes.string,
  isCloseOnClickSelector: PropTypes.bool,
  maxDropDownHeight: PropTypes.number,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  parentContainerId: PropTypes.string,
  preferLeft: PropTypes.bool,
  preferTop: PropTypes.bool,
  scrollAncestorIdentifier: PropTypes.string,
  selector: PropTypes.node,
  showDarkBg: PropTypes.bool,
  width: PropTypes.string
};

export default DropDown;
