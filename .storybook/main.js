/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    // "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: { configureJSX: true },
    },
    "@chromatic-com/storybook",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
