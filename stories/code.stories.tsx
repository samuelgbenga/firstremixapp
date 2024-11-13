// Code.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "~/components/code"; // Adjust the import path

// Define meta configuration for the Code component
const meta = {
  title: "Components/Code",
  component: Code,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story: Plain code block with copy functionality
export const Default: Story = {
  args: {
    children: "console.log('Hello, World!');", // Example code to display
    className: "language-js", // Simulate JavaScript syntax highlighting
  },
};

// With Language Label: Example with a labeled code block
export const WithLanguageLabel: Story = {
  args: {
    children: "<h1>Hello, World!</h1>", // HTML example
    className: "language-html", // Simulate HTML syntax highlighting
  },
};

// Long Code Block Story: Testing copy functionality with a larger block of code
export const LongCodeBlock: Story = {
  args: {
    children: `function greet(name) {
  return 'Hello, ' + name;
}

console.log(greet('World'));`,
    className: "language-js", // Simulate JavaScript syntax highlighting
  },
};

// Copied State Story: Simulates a recently copied state
export const CopiedState: Story = {
  args: {
    children: "SELECT * FROM users WHERE status = 'active';", // SQL example
    className: "language-sql", // Simulate SQL syntax highlighting
  },
  play: async ({ canvasElement }) => {
    // This simulates clicking the copy button to show "copied" state
    const copyButton = canvasElement.querySelector<HTMLButtonElement>(
      "[aria-label='Copy']"
    );
    if (copyButton) copyButton.click();
  },
};
