import type { Meta, StoryObj } from "@storybook/react";
import HelloWorld from "./HelloWorld";

const meta = {
  title: "Example/HelloWorld",
  component: HelloWorld,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hello: Story = {};
