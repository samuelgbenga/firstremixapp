import { animate, useReducedMotion } from "framer-motion";
import { useInViewport } from "~/hooks";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Color,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  LinearSRGBColorSpace,
  Scene,
  ShaderMaterial,
  Texture,
  WebGLRenderer,
} from "three";
import { resolveSrcFromSrcSet } from "~/utils/image";
import { cssProps } from "~/utils/style";
import { cleanRenderer, cleanScene, textureLoader } from "~/utils/three";
import styles from "./carousel.module.css";
import fragment from "./carousel-fragment.glsl?raw";
import vertex from "./carousel-vertex.glsl?raw";

interface Image {
  src: string;
  srcSet: string;
  alt: string;
}

interface CarouselProps {
  width: number;
  height: number;
  images: Image[];
  placeholder?: string;
}

interface NavigateParams {
  duration: number;
  direction: number;
  index?: number;
}

function determineIndex(
  imageIndex: number,
  index: number | null,
  images: Texture[],
  direction: number
) {
  if (index !== null) return index;
  const length = images.length;
  const prevIndex = (imageIndex - 1 + length) % length;
  const nextIndex = (imageIndex + 1) % length;
  return direction > 0 ? nextIndex : prevIndex;
}

function determineIndexs(
  imageIndex: number,
  index: number | null,
  images: Image[],
  direction: number
) {
  if (index !== null) return index;
  const length = images.length;
  const prevIndex = (imageIndex - 1 + length) % length;
  const nextIndex = (imageIndex + 1) % length;
  return direction > 0 ? nextIndex : prevIndex;
}

export const Carousel: React.FC<CarouselProps> = ({
  width,
  height,
  images,
  placeholder,
  ...rest
}) => {
  const [dragging, setDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [textures, setTextures] = useState<Texture[] | undefined>();
  const [canvasRect, setCanvasRect] = useState<DOMRect>();

  const canvas = useRef<HTMLCanvasElement>(null);
  const imagePlane = useRef<Mesh | null>(null);
  const geometry = useRef<PlaneGeometry | null>(null);
  const material = useRef<ShaderMaterial | null>(null);
  const scene = useRef<Scene | null>(null);
  const camera = useRef<OrthographicCamera | null>(null);
  const renderer = useRef<WebGLRenderer | null>(null);
  const animating = useRef(false);
  const swipeDirection = useRef<number | null>(null);
  const lastSwipePosition = useRef<number>(0);
  const scheduledAnimationFrame = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotion();
  const inViewport = useInViewport(canvas, true);
  const placeholderRef = useRef<HTMLImageElement>(null);
  const initSwipeX = useRef<number>(0);

  const currentImageAlt = `Slide ${imageIndex + 1} of ${images.length}. ${
    images[imageIndex].alt
  }`;

  useEffect(() => {
    if (dragging) {
      document.body.style.cursor = "grabbing";
    }
    return () => {
      document.body.style.cursor = "";
    };
  }, [dragging]);

  useEffect(() => {
    const cameraOptions = [
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000,
    ];
    renderer.current = new WebGLRenderer({
      canvas: canvas.current!,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    });
    camera.current = new OrthographicCamera(...cameraOptions);
    scene.current = new Scene();
    renderer.current.setPixelRatio(2);
    renderer.current.setClearColor(0x111111, 1.0);
    renderer.current.setSize(width, height);
    renderer.current.domElement.style.width = "100%";
    renderer.current.domElement.style.height = "auto";
    scene.current.background = new Color(0x111111);
    camera.current.position.z = 1;

    return () => {
      animating.current = false;
      cleanScene(scene.current!);
      cleanRenderer(renderer.current!);
    };
  }, [height, width]);

  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      const anisotropy = renderer.current!.capabilities.getMaxAnisotropy();

      const texturePromises = images.map(async (image) => {
        // Provide a fallback value for `imageSrc`
        const imageSrc = image.srcSet
          ? (await resolveSrcFromSrcSet(image)) ?? "default-image.png"
          : image.src;

        // Load texture using the resolved or fallback image source
        const imageTexture = await textureLoader.loadAsync(imageSrc);

        renderer.current!.initTexture(imageTexture);
        imageTexture.colorSpace = LinearSRGBColorSpace;
        imageTexture.minFilter = LinearFilter;
        imageTexture.magFilter = LinearFilter;
        imageTexture.anisotropy = anisotropy;
        imageTexture.generateMipmaps = false;

        return imageTexture;
      });

      const textures = await Promise.all(texturePromises);
      if (!mounted) return;

      material.current = new ShaderMaterial({
        uniforms: {
          dispFactor: { value: 0 },
          direction: { value: 1 },
          currentImage: { value: textures[0] },
          nextImage: { value: textures[1] },
          reduceMotion: { value: reduceMotion ?? false }, // Optional chaining for a fallback if needed
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: false,
        opacity: 1,
      });

      geometry.current = new PlaneGeometry(width, height, 1);
      imagePlane.current = new Mesh(geometry.current, material.current);
      imagePlane.current.position.set(0, 0, 0);
      scene.current!.add(imagePlane.current);

      setLoaded(true);
      setTextures(textures);

      requestAnimationFrame(() => {
        renderer.current!.render(scene.current!, camera.current!);
      });
    };

    if (inViewport && !loaded) {
      loadImages();
    }

    return () => {
      mounted = false;
    };
  }, [height, images, inViewport, loaded, reduceMotion, width]);

  const goToIndex = useCallback(
    ({ index, direction = 1 }: { index: number; direction?: number }) => {
      if (!textures || !material.current) return;
      setImageIndex(index);
      const { uniforms } = material.current;
      uniforms.nextImage.value = textures[index];
      uniforms.direction.value = direction;

      const onComplete = () => {
        uniforms.currentImage.value = textures[index];
        uniforms.dispFactor.value = 0;
        animating.current = false;
      };

      if (uniforms.dispFactor.value !== 1) {
        animating.current = true;

        animate(uniforms.dispFactor.value, 1, {
          type: "spring",
          stiffness: 100,
          damping: 20,
          restSpeed: 0.001,
          restDelta: 0.001,
          onUpdate: (value) => {
            uniforms.dispFactor.value = value;
          },
          onComplete,
        });
      }
    },
    [textures]
  );

  const navigate = useCallback(
    ({
      direction,
      index = null,
      duration, // Add duration to the type
    }: {
      direction: number;
      index?: number | null;
      duration?: number; // Make it optional
    }) => {
      if (!loaded) return;
      if (animating.current) {
        cancelAnimationFrame(scheduledAnimationFrame.current!);
        scheduledAnimationFrame.current = requestAnimationFrame(
          () => navigate({ direction, index, duration }) // Pass duration here
        );
        return;
      }

      const finalIndex = determineIndex(
        imageIndex,
        index,
        textures!,
        direction
      );
      goToIndex({ index: finalIndex, direction }); // Pass duration to goToIndex if needed
    },
    [goToIndex, imageIndex, loaded, textures]
  );

  const onNavClick = useCallback(
    (index: number) => {
      if (index === imageIndex) return;
      const direction = index > imageIndex ? 1 : -1;
      navigate({ direction, index });
    },
    [imageIndex, navigate]
  );

  const onSwipeMove = useCallback(
    (x: number) => {
      if (animating.current || !material.current || !textures || !canvasRect)
        return;
      lastSwipePosition.current = x;
      const absoluteX = Math.abs(x);
      const containerWidth = canvasRect.width;
      swipeDirection.current = x > 0 ? -1 : 1;
      const swipePercentage =
        1 - ((absoluteX - containerWidth) / containerWidth) * -1;
      const nextIndex = determineIndexs(
        imageIndex,
        null,
        images,
        swipeDirection.current!
      );
      const uniforms = material.current.uniforms;
      const displacementClamp = Math.min(Math.max(swipePercentage, 0), 1);

      uniforms.currentImage.value = textures[imageIndex];
      uniforms.nextImage.value = textures[nextIndex];
      uniforms.direction.value = swipeDirection.current!;

      uniforms.dispFactor.value = displacementClamp;

      requestAnimationFrame(() => {
        renderer.current!.render(scene.current!, camera.current!);
      });
    },
    [canvasRect, imageIndex, images, textures]
  );

  const onSwipeEnd = useCallback(() => {
    // Ensure `material` and other refs are typed correctly
    if (!material.current) return;

    const uniforms = material.current.uniforms;
    const duration: number = (1 - uniforms.dispFactor.value) * 1000;
    const position: number = Math.abs(lastSwipePosition.current);
    const minSwipeDistance: number | undefined =
      canvasRect && canvasRect.width * 0.2;
    lastSwipePosition.current = 0;

    if (animating.current) return;
    if (position === 0 || !position) return;

    if (minSwipeDistance) {
      if (position > minSwipeDistance) {
        // Ensure `navigate` accepts the correct types
        navigate({
          duration,
          direction: swipeDirection.current ?? 0, // Use 0 as the fallback value for null
        });
      } else {
        uniforms.currentImage.value = uniforms.nextImage.value;
        uniforms.nextImage.value = uniforms.currentImage.value;
        uniforms.dispFactor.value = 1 - uniforms.dispFactor.value;

        navigate({
          direction: (swipeDirection.current ?? 0) * -1, // Use 0 as the fallback value for null
          index: imageIndex, // Add `index` if required by the navigate function
        });
      }
    }
  }, [canvasRect, imageIndex, navigate]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      onSwipeMove(event.clientX - initSwipeX.current);
    },
    [onSwipeMove]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
    onSwipeEnd();

    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove, onSwipeEnd]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      initSwipeX.current = event.clientX;
      setDragging(true);

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [handlePointerMove, handlePointerUp]
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        navigate({ direction: 1 });
        break;
      case "ArrowLeft":
        navigate({ direction: -1 });
        break;
    }
  };

  // Additional methods remain mostly unchanged with TypeScript typings added.

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.carousel} onKeyDown={handleKeyDown} {...rest}>
      <div className={styles.content}>
        <div
          className={styles.imageWrapper}
          data-dragging={dragging}
          onPointerDown={handlePointerDown}
          style={cssProps({ aspectRatio: `${width} / ${height}` }, {})}
        >
          <div
            aria-atomic
            className={styles.canvasWrapper}
            aria-live="polite"
            aria-label={currentImageAlt}
            role="img"
          >
            <canvas aria-hidden className={styles.canvas} ref={canvas} />
          </div>
          {showPlaceholder && placeholder && (
            <img
              aria-hidden
              className={styles.placeholder}
              data-loaded={loaded && !!textures}
              src={placeholder}
              ref={placeholderRef}
              alt=""
              role="presentation"
            />
          )}
        </div>
        <button
          className={styles.button}
          data-prev={true}
          aria-label="Previous slide"
          onClick={() => navigate({ direction: -1 })}
        >
          <ArrowLeft />
        </button>
        <button
          className={styles.button}
          data-next={true}
          aria-label="Next slide"
          onClick={() => navigate({ direction: 1 })}
        >
          <ArrowRight />
        </button>
      </div>
      <div className={styles.nav}>
        {images.map((image, index) => (
          <button
            className={styles.navButton}
            key={image.alt}
            onClick={() => onNavClick(index)}
            aria-label={`Jump to slide ${index + 1}`}
            aria-pressed={index === imageIndex}
          />
        ))}
      </div>
    </div>
  );
};

function ArrowLeft() {
  return (
    <svg fill="currentColor" width="18" height="42" viewBox="0 0 18 42">
      <path d="M18.03 1.375L16.47.125-.031 20.75l16.5 20.625 1.562-1.25L2.53 20.75z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg fill="currentColor" width="18" height="42" viewBox="0 0 18 42">
      <path d="M-.03 1.375L1.53.125l16.5 20.625-16.5 20.625-1.562-1.25 15.5-19.375z" />
    </svg>
  );
}
