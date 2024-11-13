import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "~/components/visually-hidden";

const meta = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Hidden Text</div>,
  },
};

export const Visible: Story = {
  args: {
    children: <div>Hidden Text</div>,
    visible: true,
  },
};

export const ShowOnFocus: Story = {
  args: {
    children: "Focusable Hidden Text",
    showOnFocus: true,
  },
};

