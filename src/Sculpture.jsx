import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function Sculpture() {
  const host = useRef(null);

  useEffect(() => {
    const container = host.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 9.7);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const geometry = new THREE.TorusKnotGeometry(1.48, 0.43, 220, 36, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xc4b6eb,
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      iridescence: 0.65,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [150, 420],
    });
    const knot = new THREE.Mesh(geometry, material);
    knot.rotation.set(0.25, -0.4, -0.4);
    scene.add(knot);

    const rim = new THREE.DirectionalLight(0xd0b4ff, 3);
    rim.position.set(3, 3, 4);
    scene.add(rim);
    const cool = new THREE.DirectionalLight(0xffd1b6, 2.5);
    cool.position.set(-4, -2, 3);
    scene.add(cool);

    const dustPositions = new Float32Array(54 * 3);
    for (let i = 0; i < 54; i++) {
      const angle = i * 2.399963;
      const radius = 2.9 + Math.sin(i * 1.7) * 0.45;
      dustPositions[i * 3] = Math.cos(angle) * radius;
      dustPositions[i * 3 + 1] = Math.sin(angle) * radius * 0.85;
      dustPositions[i * 3 + 2] = Math.sin(i * 0.8) * 1.3 - 1;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xd4c7ff,
      size: 0.016,
      transparent: true,
      opacity: 0.6,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    let frame = 0;
    let visible = true;
    let disposed = false;
    let scrollOffset = window.scrollY / Math.max(window.innerHeight, 1);
    const pointer = { x: 0, y: 0 };
    const rotation = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    const render = () => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const elapsed = clock.getElapsedTime();
      rotation.x += (pointer.x - rotation.x) * 0.035;
      rotation.y += (pointer.y - rotation.y) * 0.035;
      if (!media.matches) {
        knot.rotation.y =
          elapsed * 0.14 - 0.4 + rotation.x * 0.5 + scrollOffset * 0.65;
        knot.rotation.x = 0.25 + rotation.y * 0.3 + scrollOffset * 0.2;
        knot.rotation.z = -0.4 + Math.sin(elapsed * 0.22) * 0.12;
        knot.position.y = Math.sin(elapsed * 0.7) * 0.07;
        knot.scale.setScalar(1 + Math.sin(elapsed * 0.55) * 0.018);
        dust.rotation.z = elapsed * -0.025;
      }
      renderer.render(scene, camera);
      container.classList.add("is-rendered");
      if (!media.matches) frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame && !disposed) render();
    };
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = 9.7 / Math.min(1, camera.aspect);
      camera.updateProjectionMatrix();
      if (!frame) start();
    };
    const onPointer = (event) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resizeObserver = new ResizeObserver(resize);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    observer.observe(container);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", onPointer);
    container.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    const onScroll = () => {
      scrollOffset = window.scrollY / Math.max(window.innerHeight, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", start);
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", start);
      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      container.classList.remove("is-rendered");
    };
  }, []);

  return (
    <div className="sculpture-canvas" ref={host} aria-hidden="true">
      <div className="sculpture-fallback">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
