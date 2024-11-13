import { Meta, StoryObj } from "@storybook/react";
import { Monogram } from "~/components/monogram";

const meta: Meta<typeof Monogram> = {
  title: "Components/Monogram",
  component: Monogram,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    highlight: false,
  },
};

export const Highlighted: Story = {
  args: {
    highlight: true,
  },
};
