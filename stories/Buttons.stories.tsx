// Button.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/button";
import { Icon } from "~/components/icon";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    // Control props
    href: { control: "text" },
    secondary: { control: "boolean" },
    loading: { control: "boolean" },
    loadingText: { control: "text" },
    icon: { control: "text" },
    iconEnd: { control: "text" },
    iconHoverShift: { control: "boolean" },
    iconOnly: { control: "boolean" },
    children: { control: "text" },
    rel: { control: "text" },
    target: { control: "text" },
    disabled: { control: "boolean" },
    as: {
      control: "select",
      options: ["button", "a", "Link"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default Button story
export const Default: Story = {
  args: {
    children: "Click Me",
  },
};

// External Link Button
export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    children: "Go to Example",
  },
};

// Button with an icon
export const WithIcon: Story = {
  args: {
    children: "check",
    icon: "check", // Replace with a valid icon name
  },
  render: (args) => (
    <Button {...args}>
      <Icon icon="download" />
      {args.children}
    </Button>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "Loading...",
    children: "Submit",
  },
};

// Disabled Button
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

// Secondary Style Button
export const Secondary: Story = {
  args: {
    secondary: true,
    children: "Secondary Action",
  },
};
