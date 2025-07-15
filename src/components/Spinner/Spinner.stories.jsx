import React from "react";
// Remove addon-knobs imports:
// import { files, select, text } from '@storybook/addon-knobs';
import theme from "../theming/defaultTheme"; // Assuming this path is correct
import Spinner from "."; // Assuming '.' refers to your Spinner component

// Generate color options dynamically from your theme
const colors = Object.keys(theme.colors).map((color) => `${color}.50`);
colors.push("transparent"); // Add 'transparent' to the options

export default {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define default args for all stories in this file
  args: {
    size: "100px",
    speed: "1s",
    thickness: "4px",
    color: "primary.50",
    emptyColor: "transparent",
    customSVG: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>', // Default to no custom SVG
  },

  // Define argTypes to create interactive controls for your props
  argTypes: {
    size: {
      control: { type: "text" },
      description: 'The size of the spinner (e.g., "50px", "2em").',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "100px" },
      },
    },
    speed: {
      control: { type: "text" },
      description: 'The animation speed of the spinner (e.g., "1s", "500ms").',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "1s" },
      },
    },
    thickness: {
      control: { type: "text" },
      description: 'The thickness of the spinner ring (e.g., "2px", "0.5em").',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "4px" },
      },
    },
    color: {
      control: { type: "select" },
      options: colors, // Use the dynamically generated colors for selection
      description: "The color of the spinning part of the spinner.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary.50" },
      },
    },
    emptyColor: {
      control: { type: "select" },
      options: colors, // Use the dynamically generated colors for selection
      description: 'The color of the static, "empty" part of the spinner ring.',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "transparent" },
      },
    },
    customSVG: {
      // Storybook's built-in controls don't directly support file uploads like addon-knobs.
      // For `customSVG`, you have a few options:
      // 1. If it expects a URL/path: `control: { type: 'text' }` for manual entry.
      // 2. If it expects a React component or SVG string: This requires a custom control or
      //    providing specific static examples in separate stories.
      // For this example, we'll use 'text' assuming it might accept a data URL or path.
      // If it expects a file object directly from an input, that's more complex for Storybook controls.
      control: { type: "text" }, // You might need a custom control for actual file uploads
      description:
        "A custom SVG element to use instead of the default spinner animation.",
      table: {
        type: { summary: "string | React.ComponentType" }, // Adjust summary based on what `customSVG` expects
        defaultValue: { summary: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>' },
      },
    },
  },
};

// --- Stories ---

// Default Story (interactive via argTypes)
export const Default = (args) => <Spinner {...args} />;
// This story will use all the default args and argTypes defined above.

// Example: A smaller, faster spinner
export const SmallFastSpinner = (args) => <Spinner {...args} />;
SmallFastSpinner.args = {
  size: "50px",
  speed: "0.5s",
  thickness: "2px",
  color: "accent.50",
};

// Example: Spinner with a custom SVG (requires your Spinner component to handle this prop)
// Note: You would typically provide a base64 encoded SVG string or a direct SVG component here
// For demonstration, let's use a simple placeholder if it accepts a string.
// If it expects a React component, you'd define one here.
export const WithCustomSVG = (args) => <Spinner {...args} />;
WithCustomSVG.args = {
  // Replace with an actual SVG string or a URL to an SVG file that your Spinner component can consume
  customSVG:
    '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red"/></svg>',
  size: "80px",
  // When using customSVG, other props like color, emptyColor, thickness, speed might not apply
  // depending on how your Spinner component handles the `customSVG` prop.
  color: "transparent", // Make default spinner invisible if custom SVG takes over
  emptyColor: "transparent",
  thickness: "0px",
};
