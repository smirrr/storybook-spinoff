import React, { useState, useEffect } from 'react';
import Box from '../Box';
import Modal, { ModalBody, ModalFooter } from '.';
import { SimpleButton as Button } from '../Button';
import { warningFilled } from '../IconLib';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs', 'molecule'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal.',
    },
    modalTitle: {
      control: 'text',
      description: 'The title displayed at the top of the modal.',
    },
    modalTitleTextColor: {
      control: 'text',
      description: 'Color of the modal title text.',
    },
    modalTitleIcon: {
      control: false,
      description: 'An icon component to display next to the modal title.',
    },
    modalTitleIconColor: {
      control: 'text',
      description: 'Color of the modal title icon.',
    },
    isClosableWithIcon: {
      control: 'boolean',
      description: 'If true, a close icon button will be displayed in the modal header.',
    },
    shouldCloseOnEsc: {
      control: 'boolean',
      description: 'If true, the modal will close when the Escape key is pressed.',
    },
    shouldCloseOnOverlayClick: {
      control: 'boolean',
      description: 'If true, the modal will close when the overlay is clicked.',
    },
    closeModal: { control: false },
    onRequestClose: { control: false },
    ariaDescribedBy: { control: false },
    ariaLabelledBy: { control: false },
    contentLabel: { control: false },
    contentRef: { control: false },
    overlayRef: { control: false },
  },
  args: {
    isOpen: false,
    modalTitle: 'This is the modal title',
    contentLabel: 'CONTENT LABEL',
    isClosableWithIcon: true,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    closeModal: () => console.log('Modal closed (via prop)'),
    onRequestClose: () => console.log('Modal requested close (via prop)'),
  },
};

// --- Helper component for interactive modal stories ---
const ModalStoryWrapper = (args) => {
  const [modalOpen, setModalOpen] = useState(args.isOpen);

  useEffect(() => {
    setModalOpen(args.isOpen);
  }, [args.isOpen]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const combinedCloseModal = () => {
    handleCloseModal();
    args.closeModal();
  };
  const combinedRequestClose = () => {
    handleCloseModal();
    args.onRequestClose();
  };

  // Default content for the modal body
  const defaultModalBodyContent = `
    (number) pending members will be reinvited. Click confirm to continue.
    (number) pending members will be reinvited. Click confirm to continue.
    (number) pending members will be reinvited. Click confirm to continue.
  `;

  // Use a prop from args if available, otherwise fallback to default
  const bodyContent = args.bodyContent || defaultModalBodyContent;

  return (
    <Box>
      <Modal
        {...args}
        isOpen={modalOpen}
        closeModal={combinedCloseModal}
        onRequestClose={combinedRequestClose}
      >
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
          <Button color="negative" mr={4} onClick={combinedCloseModal}>
            Button 1
          </Button>
          <Button color="basic">Button 2</Button>
        </ModalFooter>
      </Modal>
      <Button mt={4} onClick={handleOpenModal}>
        Open Modal
      </Button>
    </Box>
  );
};

// --- Helper for long text content, now passed via args ---
const longModalBodyContent = `
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
  (number) pending members will be reinvited. Click confirm to continue.
`;

// --- Stories ---

export const DefaultModal = {
  render: ModalStoryWrapper,
  args: {
    // Uses default args from `export default` and default bodyContent from wrapper
  },
};

export const ModalWithLongText = {
  render: ModalStoryWrapper, // Still uses the wrapper
  args: {
    bodyContent: longModalBodyContent, // Pass long content via an arg
  },
};

export const ModalWithCustomTitleColor = {
  render: ModalStoryWrapper,
  args: {
    modalTitleTextColor: 'primary.50',
  },
};

export const ModalWithIconInTheTitle = {
  render: ModalStoryWrapper,
  args: {
    modalTitleIcon: warningFilled,
    modalTitleTextColor: 'primary.50',
  },
};

export const ModalWithCustomColoredIconInTheTitle = {
  render: ModalStoryWrapper,
  args: {
    modalTitleIcon: warningFilled,
    modalTitleIconColor: 'negative.50',
  },
};

export const ModalWithNoCloseButton = {
  render: ModalStoryWrapper,
  args: {
    modalTitle: 'This modal has no close button',
    isClosableWithIcon: false,
    modalTitleIcon: warningFilled,
    modalTitleIconColor: 'negative.50',
  },
};

export const ModalThatCantBeClosed = {
  render: (args) => {
    // This story needs a custom render to manage closing behavior explicitly
    const [modalOpen, setModalOpen] = useState(args.isOpen);
    useEffect(() => {
      setModalOpen(args.isOpen);
    }, [args.isOpen]);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const uniqueCloseButtonHandler = () => {
      handleCloseModal();
      console.log("Modal closed ONLY via explicit button click.");
    };

    return (
      <Box>
        <Modal
          {...args}
          isOpen={modalOpen}
          closeModal={handleCloseModal} // Pass local handler
          onRequestClose={handleCloseModal} // Pass local handler
        >
          <ModalBody>{longModalBodyContent}</ModalBody>
          <ModalFooter>
            <Button color="negative" mr={4} onClick={uniqueCloseButtonHandler}>
              This is the only way to close the modal
            </Button>
            <Button color="basic">Button 2</Button>
          </ModalFooter>
        </Modal>
        <Button mt={4} onClick={handleOpenModal}>
          Open
        </Button>
      </Box>
    );
  },
  args: {
    modalTitle: 'This modal requires explicit action to close',
    isClosableWithIcon: false,
    shouldCloseOnEsc: false,
    shouldCloseOnOverlayClick: false,
    modalTitleIcon: warningFilled,
    modalTitleIconColor: 'negative.50',
    closeModal: () => console.log('Attempted to close via prop callback (disabled)'),
    onRequestClose: () => console.log('Attempted to request close via prop callback (disabled)'),
  },
};