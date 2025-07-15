import React from 'react';
import DiscreteProgress, { availableSizes } from '.';
import theme from '../theming/defaultTheme';

const colors = Object.keys(theme.colors).map(color => `${color}.50`);

export default {
  title: 'Molecules/DiscreteProgress',
  component: DiscreteProgress,
  tags: ['autodocs', 'molecule'],

  argTypes: {
    size: {
      control: { type: 'select' },
      options: availableSizes,
      description: 'The size of the discrete progress indicator.',
    },
    color: {
      control: { type: 'select' },
      options: colors,
      description: 'The color of the active progress steps.',
    },
    steps: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'The total number of discrete steps.',
    },
    value: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'The current progress value.',
    },
  },
  args: {
    size: availableSizes[0],
    color: colors[0],
    steps: 5,
    value: 2,
  },
};

export const Default = {};