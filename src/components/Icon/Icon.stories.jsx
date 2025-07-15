import React from 'react';
// Remove: import { select } from '@storybook/addon-knobs'; // NO LONGER NEEDED!

import Icon from '.'; // Assuming '.' refers to the Icon component itself
import * as Icons from '../IconLib'; // Import all icons
import theme from '../theming/defaultTheme'; // Import your theme

export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define argTypes to create interactive controls for your props
  argTypes: {
    // Control for the 'size' prop (select/dropdown)
    size: {
      control: { type: 'select' }, // Use a select (dropdown) UI control
      options: Object.keys(theme.sizes.icons), // Options come from theme.sizes.icons keys
      description: 'Defines the size of the icon, based on theme sizes.',
      defaultValue: 'xl', // Set the default value
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xl' },
      },
    },
    // Control for the 'icon' prop (select/dropdown for available icons)
    // The actual Icon component will be dynamically looked up
    iconName: { // Renamed from 'icon' to 'iconName' to avoid conflict with Icon prop
      control: { type: 'select' }, // Use a select (dropdown) UI control
      options: Object.keys(Icons), // Options come from the keys of your Icons library
      description: 'Selects which icon to display from the IconLib.',
      defaultValue: 'add', // Set the default icon name
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'add' },
      },
    },
    // Control for the 'color' prop (select/dropdown for theme colors)
    // Note: This color is then used to look up a hue, e.g., 'primary.50'
    baseColor: { // Renamed from 'color' to 'baseColor' to avoid conflict with Icon prop
      control: { type: 'select' }, // Use a select (dropdown) UI control
      options: Object.keys(theme.colors), // Options come from the top-level keys of your theme colors
      description: 'Selects the base color category for the icon (e.g., "primary", "blue").',
      defaultValue: 'primary', // Set the default base color
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    // You might also want to add a separate control for the hue if it's dynamic
    colorHue: {
      control: { type: 'text' }, // or 'number', or a 'select' if fixed hues
      description: 'The hue/shade of the selected base color (e.g., "50", "100").',
      defaultValue: '50', // Default hue
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '50' },
      },
    },
    // Add any other props your Icon component might accept (e.g., onClick, className)
  },
};

// This is now a standard CSF story function.
// Storybook will automatically pass the props (args) based on your argTypes defined above.
export const DynamicIcon = (args) => {
  // Dynamically retrieve the icon component based on the selected iconName
  const SelectedIconComponent = Icons[args.iconName];

  // Dynamically construct the color string based on selected baseColor and colorHue
  const iconColor = `${args.baseColor}.${args.colorHue}`;

  // Dynamically construct the size string based on the selected size (from theme.sizes.icons)
  const iconSize = `icons.${args.size}`;

  // Render the Icon component with the dynamically selected props
  return (
    <Icon
      icon={SelectedIconComponent} // Pass the actual React component for the icon
      size={iconSize}              // Pass the constructed size string
      color={iconColor}            // Pass the constructed color string
      // Pass any other generic args that might be configured
      // {...args} // Be cautious with spreading if you have conflicting argType names like 'icon' vs 'iconName'
                   // In this case, we're explicitly setting icon, size, and color
    />
  );
};

// You can add parameters specifically for this story if needed.
DynamicIcon.parameters = {
  // controls: { disable: false }, // Controls are enabled by default for CSF stories with argTypes
  // docs: { disable: true }, // Uncomment if you specifically want to hide this from the docs page
};