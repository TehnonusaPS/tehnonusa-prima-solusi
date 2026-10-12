"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { pointsInner, pointsOuter, type ParticlePoint } from "./particle-utils";

export interface ParticleRingCanvasProps {
  interactive?: boolean;
  enableZoom?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export default function ParticleRingCanvas({
  interactive = true,
  enableZoom = false,
  autoRotate = true,
  className,
}: ParticleRingCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [10, -7.5, -5],
        fov: 50,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
      className={className}
    >
      <OrbitControls
        enableZoom={enableZoom}
        enablePan={false}
        enableRotate={interactive}
        autoRotate={autoRotate}
        autoRotateSpeed={0.7}
        rotateSpeed={0.5}
        maxDistance={25}
        minDistance={6}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <pointLight position={[-30, 0, -30]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[30, 0, 30]} intensity={2.0} color="#0085eb" />
      <InstancedPointCircle />
    </Canvas>
  );
}

function InstancedPointCircle() {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const allPoints: ParticlePoint[] = useMemo(
    () => [...pointsInner, ...pointsOuter],
    []
  );

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.12, 10, 10), []);
  const sphereMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.35,
        metalness: 0.2,
      }),
    []
  );

  useEffect(() => {
    if (!instancedMeshRef.current) return;
    const dummy = new THREE.Object3D();
    const colorHelper = new THREE.Color();

    allPoints.forEach((point, i) => {
      dummy.position.set(point.position[0], point.position[1], point.position[2]);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);

      colorHelper.set(point.color);
      instancedMeshRef.current!.setColorAt(i, colorHelper);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [allPoints]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={instancedMeshRef}
        args={[sphereGeometry, sphereMaterial, allPoints.length]}
      />
    </group>
  );
}
