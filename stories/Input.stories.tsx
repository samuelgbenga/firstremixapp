import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "~/components/input";
// Adjust the import based on your file structure

const meta = {
  title: "Components/Input",
  component: Input,
  // Optionally, add parameters or tags if necessary
  parameters: {
    layout: "centered", // Optional: positions the story at the center of the screen
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    value: "",
    error: "",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    value: "",
    error: "Please enter a valid email address",
    required: true,
  },
};

export const MultilineInput: Story = {
  args: {
    label: "Your Message",
    multiline: true,
    value: "",
    error: "",
    required: true,
  },
};
