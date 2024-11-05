// src/ThreeDScene.js
import { Link } from "@remix-run/react";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

const ThreeScene1: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    // Basic Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 0.5, 0.1, 1000);
    camera.position.set(2, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // Create a cube with advanced material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
      roughness: 0.5,
      metalness: 0.8,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cubeRef.current = cube;

    // Set cube's position
    cube.position.set(0, 0, 0);

    // Increase intensity and move light closer
    const pointLight = new THREE.PointLight(0xffffff, 5); // Higher intensity (e.g., 5)
    pointLight.position.set(2, 2, 2); // Closer position
    scene.add(pointLight);

    // Add an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // Only rotate the cube when the mouse is inside the div
      // cube.rotation.x += 0.02;
      // cube.rotation.y += 0.02;
      renderer.render(scene, camera);
    };

    animate();
    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = 0.5;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Mouse movement event listener to make the cube follow the mouse
    const handleMouseMove = (event: MouseEvent) => {
      if (!cubeRef.current || !mountRef.current) return;

      const { clientX, clientY } = event;
      const { left, top, width, height } =
        mountRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the center of the div
      const mouseX = (clientX - left - width / 2) / width;
      const mouseY = (clientY - top - height / 2) / height;

      // Set cube rotation based on mouse position
      cubeRef.current.rotation.x = mouseY * Math.PI; // Rotate around x-axis
      cubeRef.current.rotation.y = mouseX * Math.PI; // Rotate around y-axis
    };

    // Attach event listeners to the container div
    mountRef.current?.addEventListener("mouseenter", () => {
      mountRef.current?.addEventListener("mousemove", handleMouseMove);
    });
    mountRef.current?.addEventListener("mouseleave", () => {
      mountRef.current?.removeEventListener("mousemove", handleMouseMove);
    });

    // Clean up on component unmount
    return () => {
      renderer.dispose();
      controls.dispose();
      window.removeEventListener("resize", onWindowResize);

      // Remove event listeners
      mountRef.current?.removeEventListener("mousemove", handleMouseMove);

      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="threeDstdlib">
      <Link to="/">Go Back home</Link>
    </div>
  );
};

export default ThreeScene1;
