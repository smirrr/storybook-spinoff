import React from "react";
import TextBox from "./index"; // Assuming '.' refers to your TextBox component
import Text from "../Text"; // Assuming Text is another component you might be using or that TextBox wraps

export default {
  title: "Atoms/TextBox",
  component: TextBox, // Specify TextBox as the component for documentation
  tags: ["autodocs"], // Recommended for auto-generated documentation
  // Define default args for all stories in this file
  args: {
    children:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    type: "body", // Default text type
    maxLines: 4, // Default max lines
  },
  // Define argTypes to create interactive controls for your props
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The text content displayed inside the TextBox.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "null" },
      },
    },
    type: {
      control: {
        type: "select", // Use 'select' for predefined options (like radios)
        labels: {
          // Optional: custom labels for the dropdown
          title1: "Title",
          header1: "Header 1",
          header2: "Header 2",
          header3: "Header 3",
          header4: "Header 4",
          header5: "Header 5",
          header6: "Header 6",
          subheader: "Subheader",
          body: "Body",
          note: "Note",
          button: "Button",
          tag: "Tag",
          label: "Label",
          inputFieldLabel: "Input Field Label",
          timestamp: "Timestamp",
        },
      },
      options: [
        // The actual values that will be passed to the component
        "title1",
        "header1",
        "header2",
        "header3",
        "header4",
        "header5",
        "header6",
        "subheader",
        "body",
        "note",
        "button",
        "tag",
        "label",
        "inputFieldLabel",
        "timestamp",
      ],
      description: "The semantic type/style of the text.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'body'" },
      },
    },
    maxLines: {
      control: { type: "number", min: 1 }, // Use 'number' for numeric input
      description:
        "Maximum number of lines to display before truncating the text.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
      },
    },
  },
  // You might want to remove 'Text' from here if TextBox doesn't directly render 'Text' or if 'Text' is just a utility.
  // Generally, `component` should point to the main component being documented.
  // If `TextBox` is a wrapper around `Text`, then `TextBox` should be the `component`.
};

// Default story, which will use the args and argTypes defined above.
export const Default = (args) => <TextBox {...args} />;

// You can create specific stories for different types if you want presets
export const HeaderExample = (args) => <TextBox {...args} />;
HeaderExample.args = {
  type: "header1",
  children: "This is a Header Example",
  maxLines: 1,
};

export const NoteExample = (args) => <TextBox {...args} />;
NoteExample.args = {
  type: "note",
  children: "This is a small note or disclaimer.",
  maxLines: 2,
};

// No longer needed for modern Storybook
// withKnobs.story = {
//   knobs: {
//     escapeHTML: true,
//   },
//   parameters: { docs: { disable: true, page: null } }
// };
