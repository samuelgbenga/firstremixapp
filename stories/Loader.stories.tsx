import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "~/components/loader/loader";
 // Adjust the import path as needed

const meta = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage of the Loader component with default values
export const Default: Story = {
  args: {
    text: "Loading...",
  },
};

// Loader with larger dimensions
export const LargeLoader: Story = {
  args: {
    width: 64,
    height: 8,
    text: "Loading Large...",
  },
};

// Centered Loader with reduced motion enabled
export const Centered: Story = {
  args: {
    center: true,
    width: 32,
    height: 4,
    text: "Centered Loading...",
  },
};

// Loader without animations (for users with reduced motion)
export const NoAnimation: Story = {
  render: (args) => {
    // Simulate reduced motion preference
    return <Loader {...args} />;
  },
  args: {
    text: "No Animation",
  },
};
