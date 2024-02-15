import { Box } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TextureLoader, Vector3Tuple } from "three";
import { HtmlAnnotation } from "./HtmlAnnotation";

interface IRackProps {
  position: Vector3Tuple;
  text?: string;
  type?: "server" | "switch";
  size?: [number, number, number];
  color?: {
    color1: string;
    color2: string;
    opacity: number;
  };
  dimension?: "2d" | "3d";
}

export const Rack: React.FC<IRackProps> = ({ position, text, type, size }) => {
  const rack = size || [0.01, 5, 2];
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

export const Cuboid: React.FC<IRackProps> = ({
  position,
  text,
  size,
  dimension,
}) => {
  const rack = size || [0.01, 5, 2];
  const depth = rack[0];
  const initialHeight = rack[1];
  const width = rack[2];

  const [height, setHeight] = useState(initialHeight);

  const [{ color1, color2, color3, opacity }, setColors] = useState({
    color1: "#8f8f8f",
    color2: "#767676",
    color3: "#c0c0c0",
    opacity: 1,
  });

  useEffect(() => {
    if (dimension === "2d") {
      setHeight(2); // Set the height to 2 when dimension is "2d"
    } else {
      setHeight(initialHeight); // Reset the height when dimension is not "2d"
    }
  }, [dimension, initialHeight]);

  return (
    <mesh
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setColors({
          color1: "#00fffb",
          color2: "#01a0ae",
          color3: "#00b3ff",
          opacity: 0.3,
        });
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setColors({
          color1: "#8f8f8f",
          color2: "#767676",
          color3: "#c0c0c0",
          opacity: 1,
        });
      }}
    >
      {/* Left side */}
      <Box args={[0.01, height, depth]} position={[0, height / 2, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color3}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Right side */}
      <Box args={[0.01, height, depth]} position={[width, height / 2, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color3}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Top */}
      <Box args={[width, 0.01, depth]} position={[width / 2, height, 0]}>
        <HtmlAnnotation anchor={[0, height * 13, 0]} text={text || ""} />
        <meshBasicMaterial
          attach="material"
          color={color2}
          transparent
          opacity={opacity}
        />
      </Box>

      {/* Bottom */}
      <Box args={[width, 0.01, depth]} position={[width / 2, 0, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color2}
          transparent
          opacity={opacity}
          side={2}
        />
      </Box>

      {/* Front & Back */}
      <Box args={[width, height, depth]} position={[width / 2, height / 2, 0]}>
        <meshBasicMaterial
          attach="material"
          color={color1}
          transparent
          opacity={opacity}
        />
      </Box>
    </mesh>
  );
};

import TWEEN from "@tweenjs/tween.js"; // Import TWEEN library

export const CuboidIsolated: React.FC<IRackProps> = ({
  position,
  text,
  size,
  dimension,
}) => {
  const rack = size || [0.01, 5, 2];
  const depth = rack[0];
  const initialHeight = rack[1];
  const width = rack[2];

  const [{ color1, color2, color3, opacity }, setColors] = useState({
    color1: "#8f8f8f",
    color2: "#767676",
    color3: "#c0c0c0",
    opacity: 1,
  });

  const [height] = useState(initialHeight);
  const groupRef = useRef<THREE.Group>(null);

  // useEffect(() => {
  //   // if (dimension === "2d") {
  //   //   setHeight(0.1);
  //   // } else {
  //   //   setHeight(initialHeight);
  //   // }
  // }, [dimension, initialHeight]);

  useEffect(() => {
    if (groupRef.current === null) return;
    if (dimension === "2d") {
      new TWEEN.Tween(groupRef.current?.scale)
        .to({ x: 1, y: 0, z: 1 }, 1000)
        .start();
    } else {
      new TWEEN.Tween(groupRef.current?.scale)
        .to({ x: 1, y: 1, z: 1 }, 1000)
        .start();
    }
  }, [dimension]);

  return (
    <group ref={groupRef}>
      <mesh
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setColors({
            color1: "#00fffb",
            color2: "#01a0ae",
            color3: "#00b3ff",
            opacity: 0.3,
          });
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setColors({
            color1: "#8f8f8f",
            color2: "#767676",
            color3: "#c0c0c0",
            opacity: 1,
          });
        }}
      >
        {/* Left side */}
        <Box args={[0.01, height, depth]} position={[0, height / 2, 0]}>
          <meshBasicMaterial
            attach="material"
            color={color3}
            transparent
            opacity={opacity}
          />
        </Box>

        {/* Right side */}
        <Box args={[0.01, height, depth]} position={[width, height / 2, 0]}>
          <meshBasicMaterial
            attach="material"
            color={color3}
            transparent
            opacity={opacity}
          />
        </Box>

        {/* Top */}
        <Box args={[width, 0.01, depth]} position={[width / 2, height, 0]}>
          <HtmlAnnotation anchor={[0, height * 13, 0]} text={text || ""} />
          <meshBasicMaterial
            attach="material"
            color={color2}
            transparent
            opacity={opacity}
          />
        </Box>

        {/* Bottom */}
        <Box args={[width, 0.01, depth]} position={[width / 2, 0, 0]}>
          <meshBasicMaterial
            attach="material"
            color={color2}
            transparent
            opacity={opacity}
            side={2}
          />
        </Box>

        {/* Front & Back */}
        <Box
          args={[width, height, depth]}
          position={[width / 2, height / 2, 0]}
        >
          <meshBasicMaterial
            attach="material"
            color={color1}
            transparent
            opacity={opacity}
          />
        </Box>
      </mesh>
    </group>
  );
};
