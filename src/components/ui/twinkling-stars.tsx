"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pure deterministic generation executed once at module level to comply with React 19 purity
function createStarFieldData(count = 2200) {
  const pos = new Float32Array(count * 3);
  const ph = new Float32Array(count);
  const sp = new Float32Array(count);
  const sz = new Float32Array(count);
  const col = new Float32Array(count * 3);

  const colorWhite = new THREE.Color("#ffffff");
  const colorCyan = new THREE.Color("#7dd3fc"); // Sky / Tehnonusa light accent
  const colorBlue = new THREE.Color("#93c5fd"); // Soft celestial blue

  // Deterministic Linear Congruential Generator
  let seed = 42;
  const nextRand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const radius = 20 + nextRand() * 55;
    const theta = nextRand() * Math.PI * 2;
    const phi = Math.acos(nextRand() * 2 - 1);

    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);

    ph[i] = nextRand() * Math.PI * 2;
    sp[i] = 0.8 + nextRand() * 2.2;

    const isHeroStar = nextRand() < 0.1;
    sz[i] = isHeroStar ? 3.2 + nextRand() * 1.8 : 1.2 + nextRand() * 1.6;

    const randCol = nextRand();
    const starColor =
      randCol < 0.75
        ? colorWhite
        : randCol < 0.875
        ? colorCyan
        : colorBlue;

    col[i * 3] = starColor.r;
    col[i * 3 + 1] = starColor.g;
    col[i * 3 + 2] = starColor.b;
  }

  return { pos, ph, sp, sz, col };
}

const DEFAULT_STAR_DATA = createStarFieldData(2200);

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const vertexShader = `
    attribute float aPhase;
    attribute float aSpeed;
    attribute float aSize;
    attribute vec3 aColor;

    uniform float uTime;

    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      vColor = aColor;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Dual harmonic organic twinkling pulsation (breathing in and out like real night stars)
      float wave1 = sin(uTime * aSpeed + aPhase);
      float wave2 = sin(uTime * (aSpeed * 0.55) + aPhase * 1.6);
      float twinkle = 0.15 + 0.85 * (0.5 + 0.28 * wave1 + 0.22 * wave2);
      
      vAlpha = clamp(twinkle, 0.08, 1.0);

      // Distance attenuation with delicate size breathing
      gl_PointSize = aSize * (170.0 / -mvPosition.z) * (0.8 + 0.2 * wave1);
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      // Perfectly circular particle
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Exponential soft celestial halo falloff + bright diamond center
      float glow = exp(-dist * 6.2);
      float core = smoothstep(0.18, 0.0, dist) * 0.55;

      gl_FragColor = vec4(vColor, (glow + core) * vAlpha);
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[DEFAULT_STAR_DATA.pos, 3]}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[DEFAULT_STAR_DATA.ph, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[DEFAULT_STAR_DATA.sp, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[DEFAULT_STAR_DATA.sz, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[DEFAULT_STAR_DATA.col, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function TwinklingStarsCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <StarField />
    </Canvas>
  );
}

export default TwinklingStarsCanvas;
