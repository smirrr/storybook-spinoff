import React from 'react';
import StatusBar from '.';

const sampleData = [
  { id: 1, background: '#52A393', value: 5, label: 'Strongly Agree' },
  { id: 2, background: '#7BCDBD', value: 3, label: 'Agree' },
  { id: 3, background: '#F7BBB5', value: 1, label: 'Disagree' },
  { id: 4, background: '#EC8074', value: 2, label: 'Strongly Disagree' },
];

export default {
  title: 'Atoms/StatusBar',
  component: StatusBar,
  tags: ['autodocs', 'atom'],
  args: {
    data: sampleData,
    height: 16,
    width: 300,
    enableTooltip: false,
    tooltipTitle: '',
    customTooltipContent: '',
  },
  argTypes: {
    data: { control: 'object' },
    enableTooltip: { control: 'boolean' },
    tooltipTitle: { control: 'text' },
    customTooltipContent: { control: 'text' },
    height: { control: 'number' },
    width: { control: 'number' },
  },
};

// 🔹 Default
export const Default = (args) => <StatusBar {...args} />;

// 🔹 With Custom Box Dimensions
export const WithCustomBox = (args) => (
  <StatusBar {...args} height={20} width={200} />
);

// 🔹 With Default Tooltip
export const WithTooltip = (args) => (
  <StatusBar {...args} enableTooltip height={20} width={200} />
);

// 🔹 With Custom Tooltip Title
export const WithCustomTooltipTitle = (args) => (
  <StatusBar
    {...args}
    enableTooltip
    tooltipTitle="User responses"
    height={20}
    width={200}
  />
);

// 🔹 With Custom Tooltip Content
export const WithCustomTooltipContent = (args) => (
  <StatusBar
    {...args}
    enableTooltip
    customTooltipContent="Custom tooltip content rendered"
    height={20}
    width={200}
  />
);
