import React from 'react';
import { action } from 'storybook/actions';
import Toast from './index';

export default {
  title: 'Atoms/Toast',
  subtitle: 'TODO',
  component: Toast
};

export const defaultToast = () => <Toast>Here is a Toast</Toast>;

export const toastWithClose = () => (
  // TODO: How to pass isClosed action to the child component?
  <Toast isClosable>Here is a Toast with a close button</Toast>
);

export const toastWithAction = () => (
  <Toast action="View" onClickAction={action('view has been clicked')}>
    Here is a toast with an action
  </Toast>
);
