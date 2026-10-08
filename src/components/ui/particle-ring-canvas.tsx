"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { pointsInner, pointsOuter, type ParticlePoint } from "./particle-utils";

export default function ParticleRingCanvas() {
  return (
    <Canvas
      camera={{
        position: [10, -7.5, -5],
      }}
      style={{ width: "100%", height: "100%" }}
      className="bg-slate-950"
    >
      <OrbitControls maxDistance={22} minDistance={8} enablePan={false} />
      <directionalLight />
      <pointLight position={[-30, 0, -30]} intensity={1.5} />
      <PointCircle />
    </Canvas>
  );
}

function PointCircle() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={`inner-${point.idx}`} point={point} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={`outer-${point.idx}`} point={point} />
      ))}
    </group>
  );
}

function Point({ point }: { point: ParticlePoint }) {
  return (
    <Sphere position={point.position} args={[0.1, 8, 8]}>
      <meshStandardMaterial
        emissive={point.color}
        emissiveIntensity={0.6}
        roughness={0.4}
        color={point.color}
      />
    </Sphere>
  );
}
