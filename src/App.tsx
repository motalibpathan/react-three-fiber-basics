import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { Suspense, useRef } from "react";
import {
  PerspectiveCamera as PerspectiveCameraType,
  TextureLoader,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import "./App.css";

import * as THREE from "three";

// const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

const App: React.FC = () => {
  const camera = useRef<PerspectiveCameraType | null>(null!);
  const controls = useRef<OrbitControlsImpl | null>(null!);

  // const [dimension, setDimension] = useState<"2d" | "3d">("3d");
  // const [isolate, setIsolate] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  // const changeDimension = () => {
  //   setDimension((p) => {
  //     setIsolate(p === "2d" ? false : true);
  //     return p === "2d" ? "3d" : "2d";
  //   });
  // };

  // useEffect(() => {
  //   if (groupRef.current === null) return;

  //   if (isolate) {
  //     new TWEEN.Tween(groupRef.current?.scale)
  //       .to({ x: 1, y: 0.01, z: 1 }, 1000)
  //       .start();
  //   } else {
  //     new TWEEN.Tween(groupRef.current?.scale)
  //       .to({ x: 1, y: 1, z: 1 }, 1000)
  //       .start();
  //   }
  // }, [isolate]);

  // useEffect(() => {
  //   const switchBetweenDimension = async () => {
  //     if (camera.current === null) return;
  //     if (controls.current === null) return;

  //     new TWEEN.Tween(controls.current!.target)
  //       .to(
  //         {
  //           x: 0,
  //           y: 1,
  //           z: 0,
  //         },
  //         1000
  //       )
  //       .easing(TWEEN.Easing.Cubic.Out)
  //       .start();

  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     if (dimension === "2d") {
  //       new TWEEN.Tween(camera.current?.position)
  //         .to(
  //           {
  //             x: 0,
  //             y: 60,
  //             z: 0,
  //           },
  //           1000
  //         )
  //         .easing(TWEEN.Easing.Cubic.Out)
  //         .start();
  //     } else {
  //       new TWEEN.Tween(camera.current?.position)
  //         .to(
  //           {
  //             x: 5,
  //             y: 25,
  //             z: 50,
  //           },
  //           1000
  //         )
  //         .easing(TWEEN.Easing.Cubic.Out)
  //         .start();
  //     }
  //   };

  //   switchBetweenDimension();
  // }, [dimension]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        // backgroundColor: "black",
      }}
    >
      {/* <button onClick={changeDimension}>
        Change to {dimension === "2d" ? "3d" : "2d"}
      </button>
      <button onClick={() => setIsolate((p) => !p)}>Isolate</button> */}
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas>
          <PerspectiveCamera
            ref={camera}
            makeDefault={true}
            position={[5, 25, 50]}
          />

          {/* <CuboidIsolated
            position={[12, 0, -5]}
            text={`AC 100`}
            type="server"
            size={[2, 6, 9]}
            dimension={dimension}
          /> */}
          {/* <CameraHelper camera={orthogonalRef} />
          <OrthographicCamera
            ref={orthogonalRef}
            makeDefault={ortho}
            position={[0, Math.PI / 2, 0]}
            zoom={20}
          /> */}
          <OrbitControls
            ref={controls}
            target={[0, 1, 0]}
            maxPolarAngle={Math.PI / 2}
          />

          <ambientLight intensity={4} />

          {/* <gridHelper args={[100, 100, "black"]} /> */}
          <axesHelper args={[5]} />

          {/* <spotLightHelper /> */}

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
            ref={groupRef}
          >
            <group position={[-20, 0, 0]}>
              {/* {[...new Array(16)].map((_, index) => (
                <group key={index} position={[index * 2, 0, 0]}>
                  <Rack
                    position={[0, 0, 0]}
                    text={`A${alphabets[index]}`}
                    type="server"
                  />
                  {[...new Array(3)].map((_, ind) => (
                    <Switch
                      key={ind}
                      position={[1, ind * 0.3, -1]}
                      size={[0.01, 0.2, 1.8]}
                    />
                  ))}
                </group>
              ))} */}
              {/* {[...new Array(16)].map((_, index) => (
                <Switch
                  position={[1, index * 0.3, -1]}
                  size={[0.01, 0.2, 1.8]}
                />
              ))} */}
            </group>

            {/* <group position={[-20, 0, 8]}>
              {[...new Array(14)].map((_, index) => (
                <Rack
                  key={index}
                  position={[index * 2, 0, 0]}
                  text={`B${alphabets[index]}`}
                  type="server"
                />
              ))}
            </group> */}

            {/* <group position={[-16, 0, 16]}>
              {[...new Array(3)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 12, 0, 0]}
                  text={`AC ${index + 1}`}
                  type="server"
                  size={[2, 6, 9]}
                />
              ))}
            </group> */}

            {/* <group position={[-24, 0, 10]} rotation={[0, Math.PI / 2, 0]}>
              {[...new Array(2)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 16, 0, 0]}
                  text={`AC ${index + 3 + 1}`}
                  type="server"
                  size={[2, 6, 9]}
                />
              ))}
            </group> */}

            {/* <group position={[24, 0, 10]} rotation={[0, Math.PI / 2, 0]}>
              {[...new Array(2)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 16, 0, 0]}
                  text={`AC ${index + 3 + 2 + 1}`}
                  type="server"
                  size={[2, 6, 9]}
                  // dimension={false ? "2d" : "3d"}
                />
              ))}
            </group> */}

            {/* ups */}
            {/* <group position={[-16, 0, 24]}>
              {[...new Array(3)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 3.05, 0, 0]}
                  text={`UPS-${alphabets[index]}`}
                  type="server"
                  size={[2, 5, 3]}
                />
              ))}
            </group> */}

            {/* ups */}
            {/* <group position={[10, 0, 24]}>
              {[...new Array(3)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 3.5, 0, 0]}
                  text={`UPS-${alphabets[index + 3]}`}
                  type="server"
                  size={[2, 5, 3]}
                />
              ))}
            </group> */}
          </group>

          {/* <Line
            points={[
              [0, 0, 0], // Start point (X: -2, Y: 0, Z: 0)
              [0, 0, -19], // End point (X: 2, Y: 0, Z: 0)
              [18, 0, -19],
              [18, 0, -19 + 23],
              [18 - 11, 0, -19 + 23],
              [18 - 11, 0, -19 + 23 - 4],
              [18 - 11 - 7, 0, -19 + 23 - 4],
            ]}
            color="blue"
            lineWidth={4}
          /> */}
          <Tween />
          {/* <CircularDollyAnimation camera={camera} /> */}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;

// useGLTF.preload("/diva_24_32.glb");

// const CircularDollyAnimation = ({ camera }) => {
//   useEffect(() => {
//     const animateDolly = () => {
//       const center = new THREE.Vector3(0, 0, 0); // Center of the circle
//       const radius = 10; // Radius of the circle
//       const duration = 5000; // Duration of the animation in milliseconds

//       new TWEEN.Tween({ theta: 0 })
//         .to({ theta: Math.PI * 2 }, duration)
//         .onUpdate(({ theta }) => {
//           const x = center.x + radius * Math.cos(theta);
//           const z = center.z + radius * Math.sin(theta);
//           const y = 15;
//           camera.current.position.set(x, y, z);
//           camera.current.lookAt(center);
//         })
//         .repeat(Infinity)
//         .start();
//     };

//     animateDolly();
//   }, [camera]);

//   useFrame(() => {
//     TWEEN.update();
//   });

//   return null;
// };
