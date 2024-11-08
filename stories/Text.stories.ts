import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "~/components/text";
// Importing the Text component

const meta: Meta<typeof Text> = {
  title: "Components/Text", // Title of the story in Storybook UI
  component: Text, // The component we're documenting
  tags: ["autodocs"], // Enable autodocs to generate documentation
  parameters: {
    layout: "centered", // Center the component in the Storybook canvas
  },
};

export default meta; // Default export to register the component

type Story = StoryObj<typeof meta>;

// Basic Story with default settings
export const Default: Story = {
  args: {
    children: "This is some default text",
  },
};

// Story with a large font size and bold weight
export const LargeBoldText: Story = {
  args: {
    children: "This is large and bold text",
    size: "l", // Large size
    weight: "bold", // Bold weight
  },
};

// Story with secondary text and centered alignment
export const SecondaryCentered: Story = {
  args: {
    children: "This is secondary centered text",
    secondary: true, // Secondary style
    align: "center", // Centered alignment
  },
};

// Story with custom HTML element ('div' instead of 'span')
export const CustomElement: Story = {
  args: {
    children: "This is custom element text",
    as: "div", // Using a 'div' element instead of 'span'
    size: "m",
    weight: "regular",
  },
};
