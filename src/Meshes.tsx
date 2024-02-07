import { useFrame, useLoader } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { useRef } from "react";
import {
  PerspectiveCamera as PerspectiveCameraType,
  TextureLoader,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface ICubeProps {
  position: [number, number, number];
  size: [number, number, number] | [number, number, number, number];
  color: string;
}

export const Cube: React.FC<ICubeProps> = ({ position, size, color }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current && ref.current.rotation) {
      (ref.current.rotation as THREE.Euler).x += delta;
      (ref.current.rotation as THREE.Euler).y += delta * 2.0;
      (ref.current.position as THREE.Vector3).z =
        Math.sin(state.clock.getElapsedTime()) * 2;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const Sphere: React.FC<ICubeProps> = ({ position, size, color }) => {
  const ref = useRef<THREE.Mesh>(null);
  // useFrame((state, delta) => {
  //   if (ref.current && ref.current.rotation) {
  //     (ref.current.rotation as THREE.Euler).x += delta;
  //     (ref.current.rotation as THREE.Euler).y += delta *2.0;
  //     (ref.current.position as THREE.Vector3).z = Math.sin(state.clock.getElapsedTime()) * 2;

  //   }
  // });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const Torus: React.FC<ICubeProps> = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const TorusKnot: React.FC<ICubeProps> = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface MeshProps {
  controls: React.MutableRefObject<OrbitControlsImpl | null>;
  camera: React.MutableRefObject<PerspectiveCameraType | null>;
}

export const MoonMesh: React.FC<MeshProps> = ({ controls, camera }) => {
  const ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // useFrame((_, delta) => {
  //   if (ref.current && ref.current.rotation) {
  //     (ref.current.rotation as THREE.Euler).y += delta * 0.75;
  //   }
  // });

  const texture = useLoader(TextureLoader, "/moon.jpg");

  return (
    <group ref={groupRef}>
      <mesh
        ref={ref}
        position={[1.5, 1, 0]}
        scale={[0.25, 0.25, 0.25]}
        onDoubleClick={({ point }) => {
          new TWEEN.Tween(controls.current!.target)
            .to(
              {
                x: point.x,
                y: point.y,
                z: point.z,
              },
              1000
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start();

          if (camera.current && camera.current.position) {
            new TWEEN.Tween(camera.current.position)
              .to(
                {
                  x: 1.1,
                  y: 0.5,
                  z: 0.6,
                },
                2000
              )
              .easing(TWEEN.Easing.Cubic.Out)
              .start();
          }
        }}
      >
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial roughness={1} metalness={0} map={texture} />
      </mesh>
    </group>
  );
};

export const EarthMesh: React.FC<MeshProps> = ({ controls, camera }) => {
  const ref = useRef<THREE.Mesh>(null);
  // useFrame((_, delta) => {
  //   if (ref.current && ref.current.rotation) {
  //     (ref.current.rotation as THREE.Euler).y += delta * 0.5;
  //   }
  // });

  const texture = useLoader(TextureLoader, "/earth.jpg");

  return (
    <mesh
      ref={ref}
      onDoubleClick={({ point }) => {
        new TWEEN.Tween(controls.current!.target)
          .to(
            {
              x: point.x,
              y: point.y,
              z: point.z,
            },
            1000
          )
          .easing(TWEEN.Easing.Cubic.Out)
          .start();

        if (camera.current && camera.current.position) {
          new TWEEN.Tween(camera.current.position)
            .to(
              {
                x: -2.6,
                y: 2.0,
                z: 0.05,
              },
              2000
            )
            .easing(TWEEN.Easing.Cubic.Out)
            .start();
        }
      }}
    >
      <sphereGeometry args={[1, 32, 16]} />
      <meshStandardMaterial roughness={1} metalness={0} map={texture} />
    </mesh>
  );
};
