/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const DNAScene = ({ onBaseClick }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.offsetWidth / mountRef.current.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    mountRef.current.appendChild(renderer.domElement);

    // DNA structure
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const baseColors = [0x4CAF50, 0x8BC34A, 0x2E7D32, 0x1B5E20];
    const backboneColor = 0xFFFFFF;
    let dnaRadius = 3;
    let dnaHeight = 20;

    // Adjust DNA height and radius for mobile view
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      dnaRadius = 2;
      dnaHeight = 15;
    }

    const basePairsCount = 20;
    const twists = 2;

    // Create backbones
    const backboneCurve1 = new THREE.CatmullRomCurve3(
      Array(basePairsCount + 1).fill(0).map((_, i) => {
        const angle = (i / basePairsCount) * Math.PI * 2 * twists;
        const y = (i / basePairsCount) * dnaHeight - dnaHeight / 2;
        return new THREE.Vector3(
          Math.cos(angle) * dnaRadius,
          y,
          Math.sin(angle) * dnaRadius
        );
      })
    );

    const backboneCurve2 = new THREE.CatmullRomCurve3(
      Array(basePairsCount + 1).fill(0).map((_, i) => {
        const angle = (i / basePairsCount) * Math.PI * 2 * twists + Math.PI;
        const y = (i / basePairsCount) * dnaHeight - dnaHeight / 2;
        return new THREE.Vector3(
          Math.cos(angle) * dnaRadius,
          y,
          Math.sin(angle) * dnaRadius
        );
      })
    );

    const backboneGeometry1 = new THREE.TubeGeometry(backboneCurve1, 100, 0.1, 8, false);
    const backboneGeometry2 = new THREE.TubeGeometry(backboneCurve2, 100, 0.1, 8, false);
    const backboneMaterial = new THREE.MeshPhongMaterial({ color: backboneColor, shininess: 100 });

    const backbone1 = new THREE.Mesh(backboneGeometry1, backboneMaterial);
    const backbone2 = new THREE.Mesh(backboneGeometry2, backboneMaterial);
    dnaGroup.add(backbone1, backbone2);

    // Create base pairs
    for (let i = 0; i < basePairsCount; i++) {
      const t = i / (basePairsCount - 1);
      const point1 = backboneCurve1.getPoint(t);
      const point2 = backboneCurve2.getPoint(t);

      const baseGeometry = new THREE.CylinderGeometry(0.2, 0.2, point1.distanceTo(point2), 8);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: baseColors[i % 4], shininess: 100 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);

      base.position.copy(point1.add(point2).multiplyScalar(0.5));
      base.lookAt(point2);
      base.rotateX(Math.PI / 2);

      base.userData = { index: i % 4 };
      dnaGroup.add(base);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 20;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Auto-rotation properties
    let isAutoRotating = true;
    const autoRotationSpeed = 0.005;
    const returnSpeed = 0.02;
    const originalRotation = new THREE.Euler(0, 0, 0);

    // Raycaster for interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(dnaGroup.children);
      if (intersects.length > 0) {
        const clickedBase = intersects[0].object;
        if (clickedBase.userData.index !== undefined) {
          onBaseClick(clickedBase.userData.index);
        }
      }
    };

    const handleMouseDown = () => {
      isAutoRotating = false;
    };

    const handleMouseUp = () => {
      isAutoRotating = true;
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);
    mountRef.current.addEventListener('mousedown', handleMouseDown);
    mountRef.current.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (isAutoRotating) {
        // Auto-rotate when not interacting
        dnaGroup.rotation.y += autoRotationSpeed;

        // Gradually return to original position
        dnaGroup.rotation.x += (originalRotation.x - dnaGroup.rotation.x) * returnSpeed;
        dnaGroup.rotation.z += (originalRotation.z - dnaGroup.rotation.z) * returnSpeed;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeEventListener('mousemove', handleMouseMove);
      mountRef.current.removeEventListener('click', handleClick);
      mountRef.current.removeEventListener('mousedown', handleMouseDown);
      mountRef.current.removeEventListener('mouseup', handleMouseUp);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [onBaseClick]);

  return <div ref={mountRef} className="relative w-full h-full" />;
};

export default DNAScene;

