import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "~/components/section";
import { Text } from "~/components/text"; // Assuming Text is another component used in your stories

const meta = {
  title: "Components/Section", // Storybook category and component name
  component: Section, // The component that we're creating the story for
  tags: ["autodocs"], // Optional, helps with autogenerated docs
  parameters: {
    layout: "fullscreen", // Centers the component in Storybook preview
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    children: "This is a default section", // The text content for the section
  },
};

// Custom Element Story
export const CustomElement: Story = {
  args: {
    as: "article", // This will render the section as an <article> element
    children: "This section is rendered as an article",
  },
};

// Section with Custom Class Story
export const WithCustomClass: Story = {
  args: {
    className: "custom-class-name", // Custom className for additional styling
    children: "This section has a custom class applied",
  },
};

// Section with Child Components Story
export const WithChildren: Story = {
  args: {
    children: (
      <>
        <Text size="l" weight="bold">Heading Inside Section</Text>
        <Text>This is a section that contains multiple elements.</Text>
      </>
    ),
  },
};
