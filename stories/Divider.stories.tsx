import { Meta, StoryObj } from "@storybook/react";
import { Divider } from "~/components/divider";


// Define the meta information for the Divider component story
const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Default Divider story
export const Default: Story = {
  args: {
    lineWidth: "100%",
    lineHeight: "2px",
    notchWidth: "90px",
    notchHeight: "10px",
    collapseDelay: 0,
    collapsed: false,
  },
};

// Collapsed Divider story
export const Collapsed: Story = {
  args: {
    lineWidth: "100%",
    lineHeight: "2px",
    notchWidth: "90px",
    notchHeight: "10px",
    collapseDelay: 500,
    collapsed: true,
  },
};
