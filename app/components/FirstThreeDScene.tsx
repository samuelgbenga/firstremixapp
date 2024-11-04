import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';



export const FirstThreeDScene: React.FC = () => {

    const mountRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
   // Create the scene
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer();
   
   // Set the size of the renderer
   renderer.setSize(window.innerWidth, window.innerHeight);
   if (mountRef.current) {
       mountRef.current.appendChild(renderer.domElement);
   }

   // Create a cube
   const geometry = new THREE.BoxGeometry(1, 1, 1);
   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
   const cube = new THREE.Mesh(geometry, material);
   scene.add(cube);

   // Position the camera
   camera.position.z = 5;

   // Animation loop
   const animate = () => {
       requestAnimationFrame(animate);
       cube.rotation.x += 0.01;
       cube.rotation.y += 0.01;
       renderer.render(scene, camera);
   };
   animate();

   // Cleanup
   return () => {
       if (mountRef.current) {
           mountRef.current.removeChild(renderer.domElement);
       }
   };
}, []);


  return (<div>
    
    <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
  </div>);
}
