import {
  BBAnchor,
  Box,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { useRef, useState } from "react";
import {
  PerspectiveCamera as PerspectiveCameraType,
  TextureLoader,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import "./App.css";

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

interface ICube {
  position: [number, number, number];
}

interface ICubeProps extends ICube {
  onClick: () => void;
}

export const Cube: React.FC<ICubeProps> = ({ position, onClick }) => {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "/wood.jpg");

  return (
    <mesh ref={ref} position={position || [-2, 0.25, 0]} onClick={onClick}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial roughness={1} metalness={0} map={texture} />
    </mesh>
  );
};

function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
  return null;
}

export const Floor = () => {
  const { nodes } = useGLTF("/floor.GLB");

  return (
    <group>
      <primitive object={nodes.Default} />
      <primitive object={nodes.mesh} />
    </group>
  );
};

interface IHtmlAnnotationProps {
  anchor: THREE.Vector3Tuple;
  text: string;
}

function HtmlAnnotation({ anchor, text }: IHtmlAnnotationProps) {
  return (
    <BBAnchor position={[0, 0, 0]} anchor={anchor}>
      <Html
        distanceFactor={5}
        zIndexRange={[10, 0]}
        unselectable="off"
        center
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "white",
              width: "max-content",
              height: "max-content",
              fontSize: "100px",
              border: "3px solid gray",
              lineHeight: 1,
              borderRadius: "10px",
              padding: "0 10px",
            }}
          >
            {text}
          </div>
        </div>
      </Html>
    </BBAnchor>
  );
}

interface ICabinetProps {
  position: [number, number, number];
  cabinet: [number, number, number];
  text: string;
}

const Cabinet: React.FC<ICabinetProps> = ({ position, cabinet, text }) => {
  const depth = cabinet[0];
  const height = cabinet[1];
  const width = cabinet[2];
  const poleHeight = height * 0.95;
  const texture = useLoader(TextureLoader, "/rack_pole.png");

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
        <HtmlAnnotation anchor={[0, height * 13, 0]} text={text} />
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

      {/* should add front and back box with transparent material */}
      {/* front  */}
      <Box args={[width, height, depth]} position={[0, height / 2, width / 2]}>
        <meshBasicMaterial
          attach="material"
          color="red"
          transparent
          opacity={0}
        />
      </Box>
      {/* front pole left */}
      <Box
        args={[width / 20, poleHeight, depth]}
        position={[-width / 2.3, poleHeight / 2, width / 2.5]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>
      {/* front pole right */}
      <Box
        args={[width / 20, poleHeight, depth]}
        position={[width / 2.3, poleHeight / 2, width / 2.5]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>

      {/* back pole left */}
      <Box
        args={[width / 20, poleHeight, depth]}
        position={[-width / 2.3, poleHeight / 2, -width / 2.5]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>
      {/* back pole right */}
      <Box
        args={[width / 20, poleHeight, depth]}
        position={[width / 2.3, poleHeight / 2, -width / 2.5]}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Box>

      {/* back  */}
      <Box args={[width, height, depth]} position={[0, height / 2, -width / 2]}>
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

const CabinetSwitch: React.FC<ICabinetProps> = ({
  position,
  cabinet,
}) => {
  const depth = cabinet[0];
  const height = cabinet[1];
  const width = cabinet[2];

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

      {/* should add front and back box with transparent material */}
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

const App: React.FC = () => {
  const camera = useRef<PerspectiveCameraType | null>(null!);
  const controls = useRef<OrbitControlsImpl | null>(null!);

  // const [cubes, setCubes] = useState<ICube[]>([{ position: [-2, 0.25, 0] }]);

  // const handleCubeClick = (index: number) => {
  //   if (index === cubes.length - 1) {
  //     setCubes([
  //       ...cubes,
  //       {
  //         position: [-2, (index + 1) * 0.25, 0],
  //       },
  //     ]);
  //   }
  // };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas>
        <PerspectiveCamera ref={camera} makeDefault position={[10, 10, 0]} />
        <OrbitControls
          ref={controls}
          target={[0, 1, 0]}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={1} />
        <gridHelper args={[50, 50, "black"]} />
        <axesHelper args={[5]} />

        <group
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
          }}
        >
          {/* <MoonMesh controls={controls} camera={camera} />
        <EarthMesh controls={controls} camera={camera} />

        {cubes.map((cube, index) => (
          <Cube
            key={index}
            position={cube.position}
            onClick={() => handleCubeClick(index)}
          />
        ))} */}

          <Cabinet position={[0, 0, 0]} cabinet={[0.01, 5, 2]} text="AA" />
          <Cabinet position={[-2.2, 0, 0]} cabinet={[0.01, 5, 2]} text="AB" />
          <Cabinet position={[-4.4, 0, 0]} cabinet={[0.01, 5, 2]} text="AC" />
          <Cabinet position={[-6.6, 0, 0]} cabinet={[0.01, 5, 2]} text="AD" />

          {/* <NetworkSwitch /> */}
          <CabinetSwitch
            position={[-6.6, 2, 0]}
            cabinet={[0.01, 0.2, 1.8]}
            text=" "
          />
          <CabinetSwitch
            position={[-6.6, 2.3, 0]}
            cabinet={[0.01, 0.2, 1.8]}
            text=" "
          />
          <CabinetSwitch
            position={[-6.6, 2.6, 0]}
            cabinet={[0.01, 0.2, 1.8]}
            text=" "
          />
          <CabinetSwitch
            position={[-6.6, 2.9, 0]}
            cabinet={[0.01, 0.2, 1.8]}
            text=" "
          />
        </group>

        <Tween />
      </Canvas>
    </div>
  );
};

export default App;
