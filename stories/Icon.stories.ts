import type { Meta, StoryObj } from "@storybook/react";
import {Icon} from "~/components/icon/icon";
// Adjust the import path according to where your Icon component is located

const meta = {
  title: "Components/Icon", // The category and name for the component in Storybook
  component: Icon, // The component we're creating a story for
  tags: ["autodocs"], // Optional, helps with autogenerated docs
  parameters: {
    layout: "centered", // Optional, to center the component in Storybook
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const twitter: Story = {
  args: {
    icon: "twitter", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const send: Story = {
  args: {
    icon: "send", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};
// Default Story
export const play: Story = {
  args: {
    icon: "play", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const github: Story = {
  args: {
    icon: "github", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};
// Default Story
export const pause: Story = {
  args: {
    icon: "pause", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const chevronRight: Story = {
  args: {
    icon: "chevron-right", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};

// Default Story
export const close: Story = {
  args: {
    icon: "close", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const link: Story = {
  args: {
    icon: "link", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};

// Default Story
export const figma: Story = {
  args: {
    icon: "figma", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const error: Story = {
  args: {
    icon: "error", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};

// Default Story
export const arrowLeft: Story = {
  args: {
    icon: "arrow-left", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const check: Story = {
  args: {
    icon: "check", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};

// Default Story
export const menu: Story = {
  args: {
    icon: "menu", // Example icon name from your sprite
    size: 24, // Default size for the icon
    className: "icon", // Default class name
  },
};

// Custom Size Story
export const arrowRight: Story = {
  args: {
    icon: "arrow-right", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};

// Custom Size Story
export const copy: Story = {
  args: {
    icon: "copy", // Another example icon name
    size: 48, // Larger size for the icon
    className: "icon", // Custom class name for styling
  },
};
