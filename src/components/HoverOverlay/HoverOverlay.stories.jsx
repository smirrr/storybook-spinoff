import React from 'react';
import HoverOverlay from './index';

export default {
  title: 'Components/HoverOverlay',
  component: HoverOverlay,
};

const ModalContent = () => {
  return (
    <div style={{ padding: '10px', color: 'black', backgroundColor: 'white', maxHeight: '93vh' }}>
      <p>This is the content inside the TooltipModal.</p>
      <p>It can contain any React component or HTML element.</p>
      <p>It can contain any React component or HTML element.</p>
      <p>It can contain any React component or HTML element.</p>
      <p>It can contain any React component or HTML element.</p>
    </div>
  );
};

export const Controlled = () => {
  return (
    <div>
      <p>
        This is the{' '}
        <HoverOverlay
          defaultModalWidth={200}
          highlightColor="#e5f1ff"
          modalBackgroundColor="white"
          modalContent={<ModalContent />}
          modalId="parentComponentName"
          preferredPosition="bottom"
        >
          highlighted text{' '}
        </HoverOverlay>{' '}
        surrounded by the TooltipModal.{' '}
        <HoverOverlay
          defaultModalWidth={200}
          highlightColor="#e5f1ff"
          modalBackgroundColor="white"
          modalContent={<ModalContent />}
          modalId="parentComponentName"
          preferredPosition="left"
        >
          Highlighted text
        </HoverOverlay>{' '}
        to the right.
      </p>
    </div>
  );
};
