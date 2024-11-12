import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "~/components/list/list";
// adjust the import path as needed

const meta = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnorderedList: Story = {
  args: {
    ordered: false,
    children: (
      <>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </>
    ),
  },
};

export const OrderedList: Story = {
  args: {
    ordered: true,
    children: (
      <>
        <ListItem>First Item</ListItem>
        <ListItem>Second Item</ListItem>
        <ListItem>Third Item</ListItem>
      </>
    ),
  },
};
