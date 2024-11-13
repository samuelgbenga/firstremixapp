// Image.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { Image } from "~/components/image";
import { useState } from "react";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    src: { control: "text" },
    srcSet: { control: "text" },
    placeholder: { control: "text" },
    alt: { control: "text" },
    reveal: { control: "boolean" },
    delay: { control: "number" },
    raised: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

// Default Image
export const Default: Story = {
  args: {
    src: "/static/modern-styling-in-react-banner.jpg",
    alt: "Default Image",
    reveal: false,
    delay: 0,
    raised: false,
    placeholder: "/static/modern-styling-in-react-banner-placeholder.jpg",
  },
};

// Image with reveal effect
export const Reveal: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Reveal Image",
    reveal: true,
    delay: 500,
    placeholder: "https://via.placeholder.com/150",
  },
};

// Raised Image
export const Raised: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Raised Image",
    reveal: false,
    raised: true,
    placeholder: "https://via.placeholder.com/150",
  },
};

// Image with delay
export const DelayedReveal: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Delayed Image",
    reveal: true,
    delay: 1000,
    placeholder: "https://via.placeholder.com/150",
  },
};

// Placeholder image
export const WithPlaceholder: Story = {
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Image with Placeholder",
    reveal: false,
    placeholder: "https://via.placeholder.com/150",
  },
};

// Image loading simulation
export const Loading: Story = {
  render: (args) => {
    const [loaded, setLoaded] = useState(false);
    return (
      <Image
        {...args}
        src={loaded ? args.src : args.placeholder}
        onLoad={() => setLoaded(true)}
      />
    );
  },
  args: {
    src: "https://via.placeholder.com/300",
    alt: "Loading Simulation",
    reveal: true,
    delay: 0,
    placeholder: "https://via.placeholder.com/150",
  },
};
