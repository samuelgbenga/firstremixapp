import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import {ThreeScene} from "app/components/ThreeScene";

const meta = {
  title: "ThreeScene/ThreeScene",
  component: ThreeScene,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof ThreeScene>;

export default meta;
type Story = StoryObj<typeof meta>;

//export const firstThreeScene: Story = {};

export const firstThreeScene: Story = {
  decorators: [
    (StoryComponent) => {
      // Create a functional wrapper for the story component
      const WrapperComponent = () => <StoryComponent />;

      // Define the stub with routes and components needed for testing
      const Stub = createRemixStub([
        {
          path: '/',
          Component: WrapperComponent, // Pass the wrapper component
        },
      ]);

      // Return the story wrapped with the Remix stub environment
      return <Stub />;
    },
  ],
};