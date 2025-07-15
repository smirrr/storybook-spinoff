import Link from "./index";

export default {
  title: "Atoms/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  // args: { onClick: fn() },
};

export const Primary = {
  args: {
    children: "Home",
  },
};

export const WithExternalLink = {
  args: {
    children: "Go to Xto10X",
    href: "https://xto10x.com",
    isExternal: true,
  },
};

export const LinkWithCustomColor = {
  render: (args) => <Link color="link" {...args}>Go to Xto10X</Link>,
};

export const DisabledLink = {
  args: {
    children: "Go to Xto10X",
    opacity: "0.5",
    isDisabled: true,
  },
};
