import { Meta, StoryObj } from "@storybook/react";
import {
  SegmentedControl,
  SegmentedControlOption,
} from "~/components/segmented-control";
import { useState } from "react";

// Component Meta Configuration
const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  argTypes: {
    currentIndex: { control: "number" },
    onChange: { action: "changed" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

// Template for rendering the SegmentedControl with options
const Template = (args: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <SegmentedControl
      {...args}
      currentIndex={currentIndex}
      onChange={(index) => {
        setCurrentIndex(index);
        args.onChange(index);
      }}
    >
      <SegmentedControlOption>Option 1</SegmentedControlOption>
      <SegmentedControlOption>Option 2</SegmentedControlOption>
      <SegmentedControlOption>Option 3</SegmentedControlOption>
    </SegmentedControl>
  );
};

// Story: Default SegmentedControl
export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    label: "Segmented Control",
  },
  play: async ({ canvasElement, args }) => {
    const options =
      canvasElement.querySelectorAll<HTMLButtonElement>('[role="radio"]');

    // Simulate selecting each option
    options[1].click(); // Select Option 2
    await new Promise((r) => setTimeout(r, 500)); // Short delay for visual testing

    options[2].click(); // Select Option 3
    await new Promise((r) => setTimeout(r, 500));

    options[0].click(); // Re-select Option 1
  },
};
