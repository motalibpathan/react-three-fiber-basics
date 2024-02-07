import { Box } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { TextureLoader, Vector3Tuple } from "three";
import { HtmlAnnotation } from "./HtmlAnnotation";

interface IRackProps {
  position: Vector3Tuple;
  text?: string;
  type?: "server" | "switch";
}

export const Rack: React.FC<IRackProps> = ({ position, text, type }) => {
  const rack = [0.01, 5, 2];
  const isServer = type === "server";
  const depth = rack[0];
  const height = rack[1];
  const width = rack[2];

  const rightSideWidth = isServer ? width : width - 0.5;
  const poleHeight = height * 0.95;
  const texture = useLoader(TextureLoader, "/rack_pole.png");

  const insideSize = 0.15;

  const [{ color1, color2, opacity }, setColors] = useState({
    color1: "#629e4f",
    color2: "#9fff7f",
    opacity: 1,
  });

  return (
    <mesh
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setColors({
          color1: "#ff0000",
          color2: "#ff8181",
          opacity: 0.3,
        });
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setColors({
          color1: "#629e4f",
          color2: "#9fff7f",
          opacity: 1,
        });
      }}
    >
      {/* Left side */}
      <Box args={[depth, height, width]} position={[0, height / 2, -width / 2]}>
        <meshBasicMaterial
          attach="material"
          color={color1}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Right side */}
      <Box
        args={[depth, height, width]}
        position={[rightSideWidth, height / 2, -width / 2]}
      >
        <meshBasicMaterial
          attach="material"
          color={color1}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Top */}
      <Box
        args={[rightSideWidth, depth, width]}
        position={[rightSideWidth / 2, height, -width / 2]}
      >
        <HtmlAnnotation anchor={[0, height * 13, 0]} text={text || ""} />
        <meshBasicMaterial
          attach="material"
          color={color2}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Bottom */}
      <Box
        args={[rightSideWidth, depth, width]}
        position={[rightSideWidth / 2, 0, -width / 2]}
      >
        <meshBasicMaterial
          attach="material"
          color={color2}
          transparent
          opacity={1}
        />
      </Box>

      {/* should add front and back box with transparent material */}
      {/* front  */}
      <Box
        args={[width, height, depth]}
        position={[width / 2, height / 2, width - 2]}
      >
        <meshBasicMaterial
          attach="material"
          color="red"
          transparent
          opacity={0}
        />
      </Box>
      {/* front pole left */}
      {/* 0, height / 2, -width / 2 */}
      <Box
        args={[width / 20, poleHeight, depth]}
        // position={[-width / 2.3, poleHeight / 2, width / 2.5]}
        position={[insideSize, poleHeight / 2, -insideSize]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>
      {/* front pole right */}
      <Box
        args={[width / 20, poleHeight, depth]}
        // position={[width / 2.3, poleHeight / 2, width / 2.5]}
        position={[rightSideWidth - insideSize, poleHeight / 2, -insideSize]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>

      {/* back pole left */}
      <Box
        args={[width / 20, poleHeight, depth]}
        position={[insideSize, poleHeight / 2, -2 + insideSize]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>
      {/* back pole right */}
      <Box
        args={[width / 20, poleHeight, depth]}
        position={[
          rightSideWidth - insideSize,
          poleHeight / 2,
          -2 + insideSize,
        ]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>

      {/* back  */}
      <Box
        args={[width, height, depth]}
        position={[width / 2, height / 2, -width]}
      >
        <meshBasicMaterial
          attach="material"
          color="red"
          transparent
          opacity={0}
        />
      </Box>
    </mesh>
  );
};
