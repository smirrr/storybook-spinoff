import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  AIHoverComponentModal,
  AIHoverComponentWrapper,
  TriangleComponent,
} from './HoverOverlay.Styled';

function HoverOverlay({
  children,
  modalContent,
  highlightColor = 'blue',
  modalId,
  modalBackgroundColor = 'transparent',
  defaultModalWidth,
  preferredPosition,
  showDelay = 300,
  hideDelay = 200,
}) {
  const [show, setShow] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});
  const [modalPosition, setModalPosition] = useState(preferredPosition);
  const [currentModalId, setCurrentModalId] = useState(undefined);
  const wrapperRef = useRef(null);
  const modalRef = useRef(null);
  const [modalTrianglePointerTop, setModalTrianglePointerTop] = useState(-1);
  const [arrowLeftPosition, setArrowLeftPosition] = useState(0);

  // Use refs to store timer IDs for better cleanup
  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const portalContainer = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portalContainer.current);
    return () => {
      // Cleanup timers and portal on unmount
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (document.body.contains(portalContainer.current)) {
        document.body.removeChild(portalContainer.current);
      }
    };
  }, []);

  const clearAllTimers = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const handleShowModal = useCallback(() => {
    const element = modalId ? document.getElementById(modalId) : false;
    if (element || !wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const margin = 10;
    const spaceLeft = wrapperRect.left - 5;
    const spaceRight = window.innerWidth - wrapperRect.right - 5;
    let modalWidth;
    let leftPosition;
    let topPosition;
    let modalSide;

    if (preferredPosition === 'left' && spaceLeft >= defaultModalWidth) {
      modalWidth = defaultModalWidth;
      leftPosition = wrapperRect.left - 5 - modalWidth;
      modalSide = 'left';
      topPosition = wrapperRect.top;
    } else if (
      preferredPosition === 'right' &&
      spaceRight >= defaultModalWidth
    ) {
      modalWidth = defaultModalWidth;
      leftPosition = wrapperRect.right + 5;
      modalSide = 'right';
      topPosition = wrapperRect.top;
    } else if (
      preferredPosition === 'left' &&
      spaceRight >= defaultModalWidth
    ) {
      modalWidth = defaultModalWidth;
      leftPosition = wrapperRect.right + 5;
      modalSide = 'right';
      topPosition = wrapperRect.top;
    } else if (
      preferredPosition === 'right' &&
      spaceLeft >= defaultModalWidth
    ) {
      modalWidth = defaultModalWidth;
      leftPosition = wrapperRect.left - 5 - modalWidth;
      modalSide = 'left';
      topPosition = wrapperRect.top;
    } else if (preferredPosition === 'bottom') {
      modalWidth = defaultModalWidth;
      const idealLeft =
        wrapperRect.left + wrapperRect.width / 2 - modalWidth / 2;
      const minLeft = 10;
      const maxLeft = window.innerWidth - modalWidth - 10;
      leftPosition = Math.max(minLeft, Math.min(idealLeft, maxLeft));
      topPosition = wrapperRect.bottom + 10;
      modalSide = 'bottom';
      setArrowLeftPosition(
        wrapperRect.left + wrapperRect.width / 2 - leftPosition,
      );
    } else if (spaceLeft > spaceRight) {
      modalWidth = spaceLeft - margin;
      leftPosition = margin;
      modalSide = 'left';
      topPosition = wrapperRect.top;
    } else {
      modalWidth = spaceRight - margin;
      leftPosition = wrapperRect.right + 5;
      modalSide = 'right';
      topPosition = wrapperRect.top;
    }

    setPositionStyle({
      top: topPosition,
      left: leftPosition,
      width: modalWidth,
    });
    setModalPosition(modalSide);
    setShow(true);
    setCurrentModalId(modalId);
  }, [modalId, preferredPosition, defaultModalWidth]);

  const handleMouseEnterWrapper = useCallback(() => {
    clearAllTimers();
    showTimerRef.current = setTimeout(() => {
      handleShowModal();
    }, showDelay); // Reduced delay for better responsiveness
  }, [handleShowModal, clearAllTimers]);

  const handleMouseLeaveWrapper = useCallback(() => {
    clearAllTimers();
    if (show) {
      hideTimerRef.current = setTimeout(() => {
        setShow(false);
      }, hideDelay); // Reduced delay for better responsiveness
    }
  }, [show, clearAllTimers]);

  const handleMouseEnterModal = useCallback(() => {
    clearAllTimers();
  }, [clearAllTimers]);

  const handleMouseLeaveModal = useCallback(() => {
    clearAllTimers();
    hideTimerRef.current = setTimeout(() => {
      setShow(false);
    }, hideDelay);
  }, [clearAllTimers]);

  useEffect(() => {
    if (
      show &&
      modalRef.current &&
      wrapperRef.current &&
      (modalPosition === 'left' || modalPosition === 'right')
    ) {
      const modalHeight = modalRef.current.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const wrapperCenter = (wrapperRect.top + wrapperRect.bottom) / 2;
      const margin = 10;

      const idealTop = wrapperCenter - modalHeight / 2;
      const minTop = margin;
      const maxTop = viewportHeight - modalHeight - margin;
      const adjustedTop = Math.max(minTop, Math.min(idealTop, maxTop));

      if (adjustedTop !== positionStyle.top) {
        setPositionStyle((prev) => ({ ...prev, top: adjustedTop }));
        const triangleVerticalPosition = wrapperCenter - adjustedTop;
        setModalTrianglePointerTop(triangleVerticalPosition);
      } else if (modalTrianglePointerTop < 0) {
        const triangleVerticalPosition = wrapperCenter - adjustedTop;
        setModalTrianglePointerTop(triangleVerticalPosition);
      }
    }
  }, [show, positionStyle.top, modalPosition, modalTrianglePointerTop]);

  return (
    <AIHoverComponentWrapper
      highlightColor={highlightColor}
      onMouseEnter={handleMouseEnterWrapper}
      onMouseLeave={handleMouseLeaveWrapper}
      ref={wrapperRef}
    >
      <span className="keywordText">{children}</span>
      {show &&
        ReactDOM.createPortal(
          <AIHoverComponentModal
            id={currentModalId}
            modalBackgroundColor={modalBackgroundColor}
            onMouseEnter={handleMouseEnterModal}
            onMouseLeave={handleMouseLeaveModal}
            ref={modalRef}
            style={positionStyle}
          >
            {modalPosition === 'left' && (
              <TriangleComponent
                direction="right"
                modalBackgroundColor={modalBackgroundColor}
                topPosition={modalTrianglePointerTop}
              />
            )}
            {modalPosition === 'right' && (
              <TriangleComponent
                direction="left"
                modalBackgroundColor={modalBackgroundColor}
                topPosition={modalTrianglePointerTop}
              />
            )}
            {modalPosition === 'bottom' && (
              <TriangleComponent
                arrowLeftPosition={arrowLeftPosition}
                direction="up"
                modalBackgroundColor={modalBackgroundColor}
                topPosition={-15}
              />
            )}
            {modalContent}
          </AIHoverComponentModal>,
          portalContainer.current,
        )}
    </AIHoverComponentWrapper>
  );
}

HoverOverlay.propTypes = {
  /**
   * This can be a react component (JSX Element) or a string
   */
  children: PropTypes.node.isRequired,
  /**
   * This denotes the default width of the modal in pixels.
   * It is used to calculate the position of the modal relative to the highlighted text.
   */
  defaultModalWidth: PropTypes.number,

  /**
   * This denotes the highlight color of the text surrounded by the tooltip
   */
  highlightColor: PropTypes.string,
  /**
   * This denotes the background color of the modal and the arrow that points to the highlighted text
   */
  modalBackgroundColor: PropTypes.string,
  /**
   * This can be a react component (JSX Element) or a string. This is the main body of the modal.
   */
  modalContent: PropTypes.node.isRequired,
  /**
   * This is an optional prop to control the number of modals that can appear on the screen at a time. Only one component posessing a particular ID can appear.
   */
  modalId: PropTypes.string,
  /**
   * This is the preferred position of the modal relative to the highlighted text.
   * It can be 'left', 'right', or 'bottom'.
   */
  preferredPosition: PropTypes.oneOf(['left', 'right', 'bottom']),
  /**
   * Delay in milliseconds before showing the overlay on hover
   */
  showDelay: PropTypes.number,
  /**
   * Delay in milliseconds before hiding the overlay when mouse leaves
   */
  hideDelay: PropTypes.number,
};

HoverOverlay.defaultProps = {
  defaultModalWidth: 0.6054 * window.innerWidth,
  highlightColor: '#e5f1ff',
  modalBackgroundColor: 'transparent',
  modalId: undefined,
  preferredPosition: 'left',
  showDelay: 300,
  hideDelay: 200,
};

export default HoverOverlay;
