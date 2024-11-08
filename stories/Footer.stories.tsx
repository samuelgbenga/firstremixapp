import { Meta, StoryObj } from "@storybook/react";
import { Footer } from "~/components/footer/footer";
// Adjust this path as necessary for your project

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "footer", // Add any default values you want for the `className` prop
  },
};

export const Link: Story = {
  args: {
    className: "link", // Add any default values you want for the `className` prop
  },
};

export const Text: Story = {
  args: {
    className: "", // Add any default values you want for the `className` prop
  },
};
