import { Box } from "@react-three/drei";
import { useState } from "react";
import { TextureLoader, Vector3Tuple } from "three";

interface ISwitch {
  position: Vector3Tuple;
  size: Vector3Tuple;
}
export const Switch: React.FC<ISwitch> = ({ position, size }) => {
  const depth = size[0];
  const height = size[1];
  const width = size[2];

  const [{ color1, color2, opacity }] = useState({
    color1: "#4b4f54",
    color2: "#d0c6bc",
    opacity: 1,
  });

  const frontTexture = new TextureLoader().load("/switch_f.png");
  const backTexture = new TextureLoader().load("/switch_b.png");

  return (
    <mesh position={position}>
      {/* Left side */}
      <Box args={[depth, height, width]} position={[-width / 2, height / 2, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color1}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Right side */}
      <Box args={[depth, height, width]} position={[width / 2, height / 2, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color1}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Top */}
      <Box args={[width, depth, width]} position={[0, height, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color2}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Bottom */}
      <Box args={[width, depth, width]} position={[0, 0, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color2}
          transparent
          opacity={opacity}
        />
      </Box>
      {/* front */}
      <Box args={[width, height, depth]} position={[0, height / 2, width / 2]}>
        <meshStandardMaterial map={frontTexture} />
      </Box>
      {/* back */}
      <Box args={[width, height, depth]} position={[0, height / 2, -width / 2]}>
        <meshStandardMaterial map={backTexture} />
      </Box>
    </mesh>
  );
};
