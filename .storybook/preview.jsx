// .storybook/preview.js

import React from "react";
// Remove: import { addDecorator } from "@storybook/react"; // This is deprecated

import ThemeProvider from "../src/components/theming";
import Core from "../src/components/core";

// If you're using @storybook/addon-a11y, import its decorator directly if needed,
// but often it's configured in main.js now.
// If not explicitly needed here, you might not even need this line for modern Storybook.
// import { withA11y } from "@storybook/addon-a11y";


// Define your global decorators using the 'decorators' named export
export const decorators = [
  // ThemeProvider and Core wrapper
  (Story) => (
    <ThemeProvider>
      <Core />
      {/*
        Important: The Story component should be rendered where your actual component
        (the story's content) will appear.
        The padding and background should probably wrap the Story component.
      */}
      <div style={{ padding: "30px", backgroundColor: "#fefefe" }}>
        {Story && <Story />}
      </div>
    </ThemeProvider>
  ),
  // A11y Addon (if not configured in main.js, this is where it goes)
  // If you configure @storybook/addon-a11y in main.js as an addon, you might not
  // need this line here unless you want to apply it conditionally.
  // (Story) => <div className="a11y-wrapper"><Story /></div> // Example placeholder, replace with actual a11y decorator if needed here
];

// Define your global parameters (if any)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  // If you need specific a11y parameters, add them here
  a11y: {
    // You can set options for the a11y addon here
    // e.g., rules: { 'color-contrast': { enabled: false } },
  },
};