import type { Meta, StoryObj } from "@storybook/react";
import { DecoderText } from "~/components/decoder-text/decoder-text";


const meta: Meta<typeof DecoderText> = {
  title: "Components/DecoderText",
  component: DecoderText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Hello, World!",
    start: true,
    delay: 500,
    className: "",
  },
};

export const SamuelGbenga: Story = {
    args: {
      text: "Samuel Gbenga",
      delay: 500,
      className: "text",
    },
  };
