import React from "react";
// Remove: import { files, radios, text } from '@storybook/addon-knobs'; // NO LONGER NEEDED!

import Avatar, { AvatarBadge, AvatarName, avatarSizes } from "./index";

export default {
  title: "Molecules/Avatar",
  component: Avatar,
  tags: ["autodocs"], // Recommended for auto-generated documentation

  // Define argTypes to create interactive controls for your props
  argTypes: {
    // Control for the 'size' prop (radio buttons)
    size: {
      control: { type: "radio" }, // Use a radio button UI control
      options: avatarSizes, // Provide the available avatarSizes
      description: "Defines the size of the avatar.",
      defaultValue: avatarSizes[0], // Set the default value
      table: {
        type: { summary: "string" },
        defaultValue: { summary: avatarSizes[0] },
      },
    },
    // Control for the 'name' prop (text input)
    name: {
      control: { type: "text" }, // Use a text input control
      description:
        "Name of the user, used for initials if no image is provided.",
      defaultValue: "Example Name", // Set the default value
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Example Name" },
      },
    },
    // Control for the 'src' prop (file picker/text input for image URL)
    src: {
      // For a file picker (uploading local images to Storybook)
      // control: { type: 'file', accept: 'image/*' },
      // For a text input for a URL (more common for external images)
      control: { type: "text" },
      description:
        "URL of the avatar image. If empty, initials will be generated.",
      defaultValue: "https://bit.ly/uchiha-itachi", // Set a default image URL
      // If you want to start with no image, set defaultValue: '' or null
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"" (empty string for no image)' },
      },
    },
    // Control for the 'badgeText' prop (text input)
    badgeText: {
      control: { type: "text" }, // Use a text input control
      description:
        'Text to display as a badge on the avatar (e.g., "Admin", "Pro").',
      defaultValue: null, // Set the default value (null or empty string to hide)
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "null" },
      },
    },
    // You might want to add controls for other Avatar props here, e.g.,
    // onClick: { action: 'avatarClicked' },
    // onError: { action: 'imageLoadError' },
  },
  // The 'subtitle' from knobs is replaced by parameters.docs.description.component
  parameters: {
    docs: {
      description: {
        component:
          "An Avatar denotes a user, with a picture of said user. It can also have a badge indicating some special status to the user. For a fun image, use this one! https://bit.ly/uchiha-itachi",
      },
    },
  },
  // Subcomponents are usually documented in an MDX file, not directly in the CSF export default.
  // If you want to show their props table, you'd use <Controls of={AvatarBadge} /> in .mdx
  // subcomponents: { AvatarBadge, AvatarName } // This is not a standard CSF property
};

// This is now a standard CSF story function.
// Storybook will automatically pass the props (args) based on your argTypes defined above.
export const InteractiveAvatar = (args) => {
  // All 'knob' values are now automatically passed as 'args'.
  // You can spread them directly onto your component.
  return <Avatar {...args} />;
};

// If you had specific parameters for this story, they go here.
// The `docs: { disable: true, page: null }` parameter is generally not needed
// with modern docs as you control what's shown via MDX files.
// If you truly want to hide this specific story from the auto-generated docs page, you can keep it.
InteractiveAvatar.parameters = {
  // docs: { disable: true }, // Uncomment if you specifically want to hide this from the docs page
};
