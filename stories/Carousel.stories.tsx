// Carousel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "~/components/carousel"; // Adjust the import path as necessary

// Define meta configuration for the Carousel component
const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images for the carousel
const images = [
  {
    src: '/static/modern-styling-in-react-banner.jpg',
    srcSet: "/static/modern-styling-in-react-banner-placeholder.jpg",
    alt: 'Slide 1',
  },
  {
    src: '/static/hello-world-banner.jpg',
    srcSet: 'https://via.placeholder.com/800x400?text=Slide+2',
    alt: 'Slide 2',
  },
  {
    src: '/static/hello-world-banner.jpg',
    srcSet: 'https://via.placeholder.com/800x400?text=Slide+3',
    alt: 'Slide 3',
  },
];

// Default Story: Basic carousel with default images
export const Default: Story = {
  args: {
    width: 800,
    height: 400,
    images,
    placeholder: "/static/modern-styling-in-react-banner-placeholder.jpg",
  },
};

// With Different Placeholder: Example with a custom placeholder
export const WithDifferentPlaceholder: Story = {
  args: {
    width: 800,
    height: 400,
    images,
    placeholder: 'https://via.placeholder.com/800x400?text=Custom+Placeholder',
  },
};

// Small Carousel: Demonstrates a smaller carousel size
export const SmallCarousel: Story = {
  args: {
    width: 400,
    height: 200,
    images,
    placeholder: 'https://via.placeholder.com/400x200?text=Loading...',
  },
};

// Navigation Example: Shows navigation between slides
export const NavigationExample: Story = {
  args: {
    width: 800,
    height: 400,
    images,
    placeholder: '/static/hello-world-banner.jpg',
  },
  play: async ({ canvasElement }) => {
    // Simulate navigation by clicking the next button
    const nextButton = canvasElement.querySelector<HTMLButtonElement>(
      "[aria-label='Next slide']"
    );
    if (nextButton) nextButton.click();
    
    // Wait for a moment to observe the change
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Click the previous button
    const prevButton = canvasElement.querySelector<HTMLButtonElement>(
      "[aria-label='Previous slide']"
    );
    if (prevButton) prevButton.click();
  },
};