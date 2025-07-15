import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock/lib/bodyScrollLock.es6';
import ReactModal from 'react-modal';
import Box from '../Box';
import Text from '../Text';
import Icon from '../Icon';
import CloseButton from '../CloseButton';

const ModalTitle = ({
  children,
  closeModal,
  textColor,
  icon,
  iconColor,
  borderColor,
  isClosableWithIcon
}) => {
  return (
    <Box
      alignItems="center"
      borderBottom="1px solid"
      borderColor={borderColor}
      display="flex"
      justifyContent="space-between"
      position="relative"
      px={12}
      py={8}
    >
      <Text
        color={textColor || 'text.highEmphasis'}
        display="grid"
        gridTemplateColumns="auto auto"
        type="header4"
      >
        {icon && (
          <Icon
            color={iconColor}
            icon={icon}
            mr={4}
            mt={1}
            size="modalTitleIcon"
          />
        )}
        {children}
      </Text>
      <Box>
        {isClosableWithIcon && (
          <CloseButton
            onClick={() => {
              closeModal();
            }}
          />
        )}
      </Box>
    </Box>
  );
};

ModalTitle.propTypes = {
  borderColor: PropTypes.string,
  children: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
  icon: PropTypes.shape({ render: PropTypes.func }),
  iconColor: PropTypes.string,
  isClosableWithIcon: PropTypes.bool,
  textColor: PropTypes.string
};

ModalTitle.defaultProps = {
  borderColor: 'basic.80',
  children: null,
  icon: null,
  iconColor: null,
  isClosableWithIcon: true,
  textColor: null
};

export const ModalBody = ({ children, ...rest }) => {
  return (
    <Box
      alignItems="center"
      borderBottom="1px solid"
      borderColor="basic.80"
      overflowY="auto"
      position="relative"
      px={12}
      py={8}
      {...rest}
    >
      <Text color="text.normalEmphasis" type="body">
        {children}
      </Text>
    </Box>
  );
};

ModalBody.propTypes = {
  /**
   * Contents of ModalBody
   */
  children: PropTypes.node
};

ModalBody.defaultProps = {
  children: null
};

export const ModalFooter = ({ children, ...rest }) => {
  return (
    <Box
      bg="basic.90"
      borderBottom="1px solid"
      borderColor="basic.80"
      borderRadius="large"
      display="flex"
      justifyContent="flex-end"
      position="relative"
      px={12}
      py={8}
      {...rest}
    >
      {children}
    </Box>
  );
};

ModalFooter.propTypes = {
  /**
   * Contents of ModalFooter
   */
  children: PropTypes.node
};

ModalFooter.defaultProps = {
  children: null
};

const Modal = ({
  ariaLabelledBy,
  ariaDescribedBy,
  contentRef,
  contentLabel,
  isOpen,
  isClosableWithIcon,
  closeModal,
  onAfterClose,
  onAfterOpen,
  onRequestClose,
  overlayRef,
  children,
  modalTitle,
  modalTitleTextColor,
  modalTitleIcon,
  modalTitleIconColor,
  modalTitleBorderColor,
  shouldCloseOnEsc,
  shouldCloseOnOverlayClick,
  shouldFocusAfterRender,
  shouldReturnFocusAfterClose,
  skipTitle,
  ...rest
}) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpen) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [isOpen]);
  return (
    <Box
      appElement={document.querySelector('body')}
      aria={
        {
          labelledby: ariaLabelledBy,
          describedby: ariaDescribedBy
        }
        /* Additional aria attributes (optional). */
      }
      ariaHideApp
      as={ReactModal}
      bg="basic.100"
      bodyOpenClassName="ReactModal__Body--open"
      borderRadius="large"
      className="ReactModal__Content"
      closeTimeoutMS={
        0
        /* Number indicating the milliseconds to wait before closing
																		 the modal. */
      }
      contentLabel={contentLabel}
      contentRef={
        contentRef
        /* Content ref callback. */
      }
      display="grid"
      gridTemplateRows="auto 1fr auto"
      htmlOpenClassName="ReactModal__Html--open"
      isOpen={isOpen}
      maxHeight="80%"
      onAfterClose={
        onAfterClose
        /* Function that will be run after the modal has closed. */
      }
      onAfterOpen={
        onAfterOpen
        /* Function that will be run after the modal has opened. */
      }
      onRequestClose={
        onRequestClose
        /* Function that will be run when the modal is requested
																		 to be closed (either by clicking on overlay or pressing ESC).
																		 Note: It is not called if isOpen is changed by other means. */
      }
      outline="none"
      overflowX="auto"
      overlayClassName="ReactModal__Overlay"
      overlayRef={
        overlayRef
        /* Overlay ref callback. */
      }
      portalClassName="ReactModalPortal"
      position="relative"
      role="dialog"
      shadow="overlay"
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldFocusAfterRender={shouldFocusAfterRender}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
      width="70%"
      {...rest}
    >
      {!skipTitle ? (
        <ModalTitle
          borderColor={modalTitleBorderColor}
          closeModal={closeModal}
          icon={modalTitleIcon}
          iconColor={modalTitleIconColor}
          isClosableWithIcon={isClosableWithIcon}
          textColor={modalTitleTextColor}
        >
          {modalTitle}
        </ModalTitle>
      ) : (
        <Box position="absolute" right="10px" top="10px" zIndex="3">
          <CloseButton
            borderRadius="50%"
            onClick={() => {
              closeModal();
            }}
            variant="solid"
          />
        </Box>
      )}

      {children}
    </Box>
  );
};

Modal.propTypes = {
  /**
   * The aria-describedby attribute is used to indicate the IDs of the elements that describe the object.
   */
  ariaDescribedBy: PropTypes.string,
  /**
   * Provides essential information about the modal / extended information that the user might need.
   */
  ariaLabelledBy: PropTypes.string,
  /**
   * Contents of the modal.
   */
  children: PropTypes.node,
  /**
   * Function that closes the modal
   */
  closeModal: PropTypes.func,
  /**
   * String indicating how the content container should be announced to screenreaders
   */
  contentLabel: PropTypes.string,
  /**
   * Content ref callback.
   */
  contentRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  /**
   * If false, the close icon will not be shown
   */
  isClosableWithIcon: PropTypes.bool,
  /**
   * Boolean describing if the modal should be shown or not.
   */
  isOpen: PropTypes.bool,
  /**
   * The title of the modal
   */
  modalTitle: PropTypes.node,
  /**
   * This is the custom color that can be applied to the bottom border of modal title
   */
  modalTitleBorderColor: PropTypes.string,
  /**
   * If provided, icon will be placed on the left of the modal title
   */
  modalTitleIcon: PropTypes.shape({ render: PropTypes.func }),
  /**
   * If provided along with `modalTitleIcon`, this is the custom color that can be applied to the icon
   */
  modalTitleIconColor: PropTypes.string,
  /**
   * Color of the title text
   */
  modalTitleTextColor: PropTypes.string,
  /**
   * Function that will be run after the modal has closed.
   */
  onAfterClose: PropTypes.func,
  /**
   * Function that will be run after the modal has opened.
   */
  onAfterOpen: PropTypes.func,
  /**
   * Function that will be run after the modal has been requested to be closed.
   */
  onRequestClose: PropTypes.func,
  /**
   * Overlay ref callback.
   */
  overlayRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  /**
   * Boolean indicating if pressing the esc key should close the modal
     Note: By disabling the esc key from closing the modal
     you may introduce an accessibility issue.
   */
  shouldCloseOnEsc: PropTypes.bool,
  /**
   * Boolean indicating if the overlay should close the modal
   */
  shouldCloseOnOverlayClick: PropTypes.bool,
  /**
   * Boolean indicating if the modal should be focused after render.
   */
  shouldFocusAfterRender: PropTypes.bool,
  /**
   * Boolean indicating if the modal should restore focus to the element
     that had focus prior to its display.
   */
  shouldReturnFocusAfterClose: PropTypes.bool,
  /**
   * Boolean indicating if the modal should have the top tile bar with heading
   */
  skipTitle: PropTypes.bool
};

Modal.defaultProps = {
  ariaDescribedBy: null,
  ariaLabelledBy: null,
  children: null,
  closeModal: null,
  contentLabel: '',
  contentRef: null,
  isClosableWithIcon: true,
  isOpen: false,
  modalTitle: '',
  modalTitleBorderColor: 'basic.80',
  modalTitleIcon: null,
  modalTitleIconColor: 'currentColor',
  modalTitleTextColor: 'text.highEmphasis',
  onAfterClose: null,
  onAfterOpen: null,
  onRequestClose: null,
  overlayRef: null,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldFocusAfterRender: true,
  shouldReturnFocusAfterClose: true,
  skipTitle: false
};

export default Modal;
