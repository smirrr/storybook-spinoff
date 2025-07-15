import React from 'react';
import Breadcrumb, { BreadcrumbItem } from './index';

export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: {
      control: 'text',
      defaultValue: '/',
      description: 'Custom separator between breadcrumb items',
    },
    numberOfVisibleBreadcrumbs: {
      control: { type: 'number', min: 1 },
      defaultValue: 3,
      description: 'Number of visible breadcrumbs from the end',
    },
  },
};

// Default
export const Default = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem>Breadcrumb 1</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 3</BreadcrumbItem>
  </Breadcrumb>
);
Default.args = {
  separator: '/',
};

// With custom separator
export const WithCustomSeparator = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem href="https://xto10x.com" isExternal>
      Breadcrumb 1
    </BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 3</BreadcrumbItem>
  </Breadcrumb>
);
WithCustomSeparator.args = {
  separator: '<',
};

// With one breadcrumb
export const WithOneBreadcrumb = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem>Breadcrumb 1</BreadcrumbItem>
  </Breadcrumb>
);
WithOneBreadcrumb.args = {
  separator: '<',
};

// With collapser
export const WithCollapser = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem>Breadcrumb 1</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 3</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 4</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);
WithCollapser.args = {
  separator: '<',
  numberOfVisibleBreadcrumbs: 3,
};
