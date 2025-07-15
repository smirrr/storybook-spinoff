import React from 'react';
import AvatarGroup from '.';

const data = [
  {
    id: 1,
    name: 'Ursula Mahoney',
    src: 'https://bit.ly/uchiha-itachi'
  },
  {
    id: 2,
    name: 'Amalia Valentine',
    src: 'https://bit.ly/uchiha-itachi'
  },
  {
    id: 3,
    name: 'Sebastian Ingram',
    src: 'https://bit.ly/uchiha-itachi'
  },
  {
    id: 4,
    name: 'Nathan Kline',
    src: 'https://bit.ly/uchiha-itachi'
  },
  {
    id: 5,
    name: 'Elizabeth Stout',
    src: 'https://bit.ly/uchiha-itachi'
  },
  {
    id: 6,
    name: 'Benny Bowers',
    src: 'https://bit.ly/uchiha-itachi'
  }
];

export default {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs', 'molecule'],

  argTypes: {
    usersList: {
      control: 'object',
      description: 'An array of user objects to display avatars for.',
    },
    avatarSize: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl', 'xxl'],
      description: 'Sets the size of the individual avatars.',
    },
    showMax: {
      control: { type: 'number', min: 1 },
      description: 'The maximum number of avatars to display before grouping.',
    },
    showGroupedAvatarsCount: {
      control: 'boolean',
      description: 'If true, displays a count of the grouped avatars.',
    },
  },
  args: {
    usersList: data,
    avatarSize: 'm',
    showMax: 6,
    showGroupedAvatarsCount: false,
  },
};

export const Default = {};

export const WithCustomSize = {
  args: {
    avatarSize: 'x',
  },
};

export const Shrunk = {
  args: {
    avatarSize: 'm',
    showMax: 3,
    showGroupedAvatarsCount: true,
  },
};