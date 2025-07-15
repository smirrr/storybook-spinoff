import { fn } from "storybook/test";

import PseudoBox from "./index";

export default {
  title: "Atoms/PseudoBox",
  component: PseudoBox,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    backgroundColor: { control: "color" },
  },

  args: {
    background: "lightgrey",
    padding: "20px",
    borderRadius: "10px",
    onClick: fn(),
  },
};

export const Primary = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Hoverable = {
  args: {
    _hover: {
      backgroundColor: "lightblue",
      borderColor: "blue",
      boxShadow: "0 0 8px rgba(0,0,255,0.3)",
      transform: "scale(1.02)",
      transition: "all 0.2s ease-in-out",
    },
  },
};
