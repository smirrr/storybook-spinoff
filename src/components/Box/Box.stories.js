import Box from "./index.js";

export default {
  title: "Atoms/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: { border: "solid 1px grey", width: "100px", height: "100px" },
};

export const Bordered = {
  args: {
    children: "Button",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export const Rounded = {
  args: {
    borderRadius: "10px",
  },
};
