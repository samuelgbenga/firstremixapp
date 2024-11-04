// src/ThreeScene.js
import { Link } from "@remix-run/react";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    // Set the background color
    scene.background = new THREE.Color(0x1e1e1e);
    const camera = new THREE.PerspectiveCamera(
      75,
      0.5, // Half the aspect ratio for half-width
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      roughness: 0.5,
      metalness: 0.8,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Increase intensity and move light closer
    const pointLight = new THREE.PointLight(0x00ff00, 6); // Higher intensity (e.g., 5)
    pointLight.position.set(2, 2, 2); // Closer position
    scene.add(pointLight);

    // Add an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
      camera.aspect = 0.5;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="threeDSceneContainer" ref={mountRef}>
      <Link to="/sessionRoute">Go to the the session Route</Link>
    </div>
  );
};
