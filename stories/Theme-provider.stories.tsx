import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider, useTheme } from "~/components/theme/theme-provider";

// Define a simple component that uses the theme context
const ThemeTestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

const meta = {
  title: "Components/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
  args: {
    theme: "light",
    children: <ThemeTestComponent />,
  },
};

export const DarkTheme: Story = {
  args: {
    theme: "dark",
    children: <ThemeTestComponent />,
  },
};

export const WithToggle: Story = {
  args: {
    theme: "light",
    children: <ThemeTestComponent />,
    toggleTheme: () => console.log("Toggle theme functionality goes here."),
  },
};
