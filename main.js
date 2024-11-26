// for making multiple cube 

import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// **Import the THREE.js library** to create 3D graphics and **OrbitControls** for interactive control of the camera.

// Initialize the scene
const scene = new THREE.Scene(); 
// **Create a scene** where all 3D objects, lights, and cameras will exist. The scene acts as a container.

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  35, // Field of view (FOV): the extent of the observable world seen by the camera in degrees.
  window.innerWidth / window.innerHeight, // Aspect ratio: width divided by height of the viewport.
  0.1, // Near clipping plane: minimum render distance.
  80   // Far clipping plane: maximum render distance.
);
camera.position.z = 20; 
// **Set the camera's position** so it is 10 units away from the origin along the Z-axis.

// Initialize the renderer
const canvas = document.querySelector('canvas.three'); 
// Select the `<canvas>` element with the class `three` where the scene will be rendered.

const renderer = new THREE.WebGLRenderer({
  canvas: canvas, 
});
// **Create a WebGL renderer** for rendering 3D graphics using the canvas element.

renderer.setSize(window.innerWidth, window.innerHeight); 

// Set the size of the renderer to match the width and height of the browser window.

// Install the controls
const controls = new OrbitControls(camera, canvas); 
// **Enable OrbitControls** to allow the user to orbit, zoom, and pan the camera using the mouse.

controls.enableDamping = true; 
// **Enable damping (smooth movement)** for smoother camera transitions.

controls.autoRotate = true; 
// **Enable auto-rotation** of the camera around the scene.

// Add multiple cubes to the scene
const createMultipleCubes = (count) => { 
  // Function to create multiple cubes and add them to the scene.
  const cubeGeometry = new THREE.BoxGeometry(1,1,1); 
  // Create a cube geometry (box) with dimensions 1x1x1.

  for (let i = 0; i < count; i++) { 
    // Loop `count` times to create the specified number of cubes.

    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: `hsl(${Math.random() * 360}, 100%, 50%)`, 
      // Create a material with a random color using HSL (Hue, Saturation, Lightness).
    });

    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial); 
    // Combine the geometry and material into a **mesh**, which is the actual object added to the scene.

    cubeMesh.position.set(
      (Math.random() - 0.5) * 20, // Random X position within a range of -10 to +10.
      (Math.random() - 0.5) * 20, // Random Y position within a range of -10 to +10.
      (Math.random() - 0.5) * 20  // Random Z position within a range of -10 to +10.
    );

    cubeMesh.rotation.set(
      Math.random() * Math.PI,    // Random rotation around the X-axis.
      Math.random() * Math.PI,    // Random rotation around the Y-axis.
      Math.random() * Math.PI     // Random rotation around the Z-axis.
    );

    scene.add(cubeMesh); 
    // Add the cube mesh to the scene.
  }
};

// Call the function to create multiple cubes
createMultipleCubes(30); 
// Create and add 20 randomly positioned and rotated cubes to the scene.

// Render loop
const renderloop = () => { 
  // Function for rendering the scene continuously (animation loop).
  controls.update(); 
  // Update the OrbitControls for damping and auto-rotation effects.

  renderer.render(scene, camera); 
  // Render the scene using the camera.

  window.requestAnimationFrame(renderloop); 
  // Continuously request the next frame to keep the animation running.
};
renderloop(); 
// Start the render loop.