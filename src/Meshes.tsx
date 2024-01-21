import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

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
        (ref.current.rotation as THREE.Euler).y += delta *2.0;
        (ref.current.position as THREE.Vector3).z = Math.sin(state.clock.getElapsedTime()) * 2;
  
      }
    });
  
    return (
      <mesh position={position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  };
  
  export const Sphere: React.FC<ICubeProps> = ({position, size, color}) => {
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
  }
  
  
  export const Torus: React.FC<ICubeProps> = ({position, size, color}) => {
    return (
      <mesh position={position}>
        <torusGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  
  
  
  export const TorusKnot: React.FC<ICubeProps> = ({position, size, color}) => {
    return (
      <mesh position={position}>
        <torusKnotGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  