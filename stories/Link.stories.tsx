import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "~/components/link/link";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    href: { control: "text", description: "The URL or path for the link" },
    children: { control: "text", description: "The text or content of the link" },
    secondary: { control: "boolean", description: "Determines the style of the link" },
    rel: { control: "text", description: "Specifies the relationship between the current and linked document" },
    target: { control: "text", description: "Specifies where to open the linked document" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example story
export const Default: Story = {
  args: {
    href: "/",
    children: "Home Link",
  },
};

// Example for an external link
export const ExternalLink: Story = {
  args: {
    href: "https://example.com",
    children: "External Link",
    rel: "noreferrer noopener",
    target: "_blank",
  },
};

// Example for a secondary styled link
export const SecondaryLink: Story = {
  args: {
    href: "#",
    children: "Secondary Link",
    secondary: true,
  },
};
