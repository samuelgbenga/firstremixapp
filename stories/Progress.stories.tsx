import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "~/components/progress";
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const RouterDecorator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Setup a basic memory router with a root route
  const router = createMemoryRouter([
    {
      path: '/',
      element: children,
    },
  ]);

  return <RouterProvider router={router} />;
};

const meta = {
  title: "Components/Progress",
  component: Progress,
  decorators: [
    (Story) => (
      <RouterDecorator>
        <Story />
      </RouterDecorator>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = { args: {} };
export const LoadingState: Story = { args: { state: "loading" } };
export const CompleteState: Story = { args: { state: "idle", animationComplete: true } };
export const VisibleState: Story = { args: { state: "loading", visible: true } };
