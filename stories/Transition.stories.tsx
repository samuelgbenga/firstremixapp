import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Transition } from "~/components/transition";

const meta: Meta<typeof Transition> = {
  title: "Components/Transition",
  component: Transition,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Transition>;

export const Default: Story = {
  render: (args) => {
    const [show, setShow] = useState(false);

    return (
      <div>
        <button onClick={() => setShow(!show)}>Toggle Transition</button>
        <Transition {...args} in={show} timeout={{ enter: 500, exit: 300 }}>
          {({ visible, status, nodeRef }) => (
            <div
              ref={nodeRef as React.RefObject<HTMLDivElement>}
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            >
              Transition {status}
            </div>
          )}
        </Transition>
      </div>
    );
  },
  args: {
    initial: true,
    unmount: true,
    onEnter: () => console.log("Entering..."),
    onEntered: () => console.log("Entered!"),
    onExit: () => console.log("Exiting..."),
    onExited: () => console.log("Exited!"),
  },
};
