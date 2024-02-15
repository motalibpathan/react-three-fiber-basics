import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  OrthographicCamera as OrthographicCameraType,
  PerspectiveCamera as PerspectiveCameraType,
  TextureLoader,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import "./App.css";

import * as THREE from "three";
import { Cuboid, Rack } from "./Rack";
import { Switch } from "./components/Switch";

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
  const orthogonalRef = useRef<OrthographicCameraType | null>(null!);
  const controls = useRef<OrbitControlsImpl | null>(null!);

  // return (
  //   <>
  //     <div
  //       style={{
  //         height: "100vh",
  //         width: "100vw",
  //       }}
  //     >
  //       <Canvas>
  //         <OrthographicCamera
  //           ref={camera}
  //           makeDefault
  //           position={[0, Math.PI / 2, 0]}
  //           zoom={20}
  //         />
  //         <OrbitControls
  //           ref={controls}
  //           target={[0, 1, 0]}
  //           maxPolarAngle={Math.PI / 2}
  //         />
  //         <ambientLight intensity={1} />
  //         <gridHelper args={[50, 50, "black"]} />
  //         <Box args={[3, 3, 3]} position={[0, 0, 0]} />
  //         <Box args={[3, 3, 3]} position={[4, 0, 0]}>
  //           <meshStandardMaterial color="red" />
  //         </Box>
  //         <Box args={[3, 3, 3]} position={[8, 0, 0]}>
  //           <meshStandardMaterial color="green" />
  //         </Box>
  //         <Box args={[3, 3, 3]} position={[-4, 0, 0]}>
  //           <meshStandardMaterial color="blue" />
  //         </Box>
  //         <Box args={[3, 3, 3]} position={[-8, 0, 0]}>
  //           <meshStandardMaterial color="orange" />
  //         </Box>
  //       </Canvas>
  //     </div>
  //   </>
  // );

  const [ortho, set] = useState(false);
  useEffect(() => {
    // const interval = setInterval(() => set((state) => !state), 1000);
    // return () => clearInterval(interval);
  }, []);

  const changeCamera = async () => {
    if (!camera.current) return;

    if (ortho) {
      set((p) => !p);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
      new TWEEN.Tween(camera.current?.position)
        .to(
          {
            x: 5,
            y: 25,
            z: 50,
          },
          1000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
    } else {
      new TWEEN.Tween(camera.current?.position)
        .to(
          {
            x: 0,
            y: 60,
            z: 0,
          },
          1000
        )
        .easing(TWEEN.Easing.Cubic.Out)
        .start();
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
      set((p) => !p);
    }

    // camera.current?.position.set(0, Math.PI / 2, 0);
    // camera.current?.zoom=(14);
    // if (ortho) {
    // } else {
    //   camera.current?.position.set(5, 25, 50);
    // }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <button onClick={changeCamera}>Switch To {ortho ? "3D" : "2D"}</button>
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas>
          <PerspectiveCamera
            ref={camera}
            makeDefault={!ortho}
            position={[5, 25, 50]}
          />
          <OrthographicCamera
            ref={orthogonalRef}
            makeDefault={ortho}
            // left={-200} // Adjust left boundary of view frustum
            // right={200} // Adjust right boundary of view frustum
            // top={200} // Adjust top boundary of view frustum
            // bottom={-200} // Adjust bottom boundary of view frustum
            // near={0.1} // Adjust near plane
            // far={10000} // Adjust far plane
            position={[0, Math.PI / 2, 0]}
            zoom={14}
          />
          <OrbitControls
            ref={controls}
            target={[0, 1, 0]}
            maxPolarAngle={Math.PI / 2}
          />
          <ambientLight intensity={1} />
          <gridHelper args={[50, 50, "black"]} />
          <axesHelper args={[5]} />

          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

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

            {/* <Rack position={[2, 0, 0]} text="AA" type="switch" />
            <Rack position={[0, 0, 0]} text="AB" type="server" />
            <Rack position={[-2.2, 0, 0]} text="AC" type="server" />
            <Rack position={[-4.4, 0, 0]} text="AD" type="server" />
            <Rack position={[-6.6, 0, 0]} text="AE" type="server" />
            <Rack position={[-8.2, 0, 0]} text="AC" type="server" />
            <Rack position={[-10.4, 0, 0]} text="AD" type="server" />
            <Rack position={[-12.6, 0, 0]} text="AE" type="server" /> */}

            {/* <Rack position={[2, 0, 0]} text="AA" type="switch" /> */}
            {/* <Switch position={[2.75, 2, -0.75]} size={[0.01, 0.2, 1.3]} /> */}

            <group position={[-20, 0, 0]}>
              {[...new Array(16)].map((_, index) => (
                <group key={index} position={[index * 2, 0, 0]}>
                  <Rack
                    position={[0, 0, 0]}
                    text={`A${alphabets[index]}`}
                    type="server"
                  />
                  {[
                    ...new Array(parseInt((Math.random() * 10).toString())),
                  ].map((_, ind) => (
                    <Switch
                      key={ind}
                      position={[
                        1,
                        parseInt((Math.random() * 10).toString()) * 0.3,
                        -1,
                      ]}
                      size={[0.01, 0.2, 1.8]}
                    />
                  ))}
                </group>
              ))}
              {/* {[...new Array(16)].map((_, index) => (
                <Switch
                  position={[1, index * 0.3, -1]}
                  size={[0.01, 0.2, 1.8]}
                />
              ))} */}
            </group>

            <group position={[-20, 0, 8]}>
              {[...new Array(14)].map((_, index) => (
                <Rack
                  key={index}
                  position={[index * 2, 0, 0]}
                  text={`B${alphabets[index]}`}
                  type="server"
                />
              ))}
            </group>

            {/* <Switch position={[1, 2.3, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 2.6, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 2.9, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 4, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 3.7, -1]} size={[0.01, 0.2, 1.8]} /> */}

            {/* acs */}
            <group position={[-16, 0, 16]}>
              {[...new Array(3)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 12, 0, 0]}
                  text={`AC ${index + 1}`}
                  type="server"
                  size={[2, 6, 9]}
                />
              ))}
            </group>

            <group position={[-24, 0, 10]} rotation={[0, Math.PI / 2, 0]}>
              {[...new Array(2)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 16, 0, 0]}
                  text={`AC ${index + 3 + 1}`}
                  type="server"
                  size={[2, 6, 9]}
                />
              ))}
            </group>

            <group position={[24, 0, 10]} rotation={[0, Math.PI / 2, 0]}>
              {[...new Array(2)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 16, 0, 0]}
                  text={`AC ${index + 3 + 2 + 1}`}
                  type="server"
                  size={[2, 6, 9]}
                  dimension={ortho ? "2d" : "3d"}
                />
              ))}
            </group>

            {/* ups */}
            <group position={[-16, 0, 24]}>
              {[...new Array(3)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 3.05, 0, 0]}
                  text={`UPS-${alphabets[index]}`}
                  type="server"
                  size={[2, 5, 3]}
                  dimension={ortho ? "2d" : "3d"}
                />
              ))}
            </group>

            {/* ups */}
            <group position={[10, 0, 24]}>
              {[...new Array(3)].map((_, index) => (
                <Cuboid
                  key={index}
                  position={[index * 3.5, 0, 0]}
                  text={`UPS-${alphabets[index + 3]}`}
                  type="server"
                  size={[2, 5, 3]}
                />
              ))}
            </group>

            {/* <Model /> */}
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

          <Light />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;

const Light = () => {
  // const pointLight = useRef();

  // useHelper(spotLight, SpotLightHelper, "teal");
  // useHelper(pointLight, PointLightHelper, 0.5, "hotpink");

  return (
    <>
      <pointLight
        // ref={pointLight}
        color="blue"
        position={[1, 3, -0.5]}
        intensity={5}
      />
    </>
  );
};

export const Model = () => {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, "/diva_24_32.glb");
  // const [defaultMaterial, setDefaultMaterial] = useState(null);

  const rotationInDegrees = [0, -90, 0];
  const rotationInRadians = rotationInDegrees.map(
    (degree) => (degree * Math.PI) / 180
  );

  // const handlePointerOver = () => {
  //   if (modelRef.current) {
  //     modelRef.current.traverse((child) => {
  //       if (child.isMesh) {
  //         // Store the default material before changing
  //         if (!defaultMaterial) {
  //           setDefaultMaterial(child.material.clone());
  //         }

  //         // Example: Change color and opacity on hover
  //         child.material.color.set(0xff0000);
  //         child.material.opacity = 0.7;
  //         child.material.transparent = true;
  //       }
  //     });
  //   }
  // };

  // const handlePointerOut = () => {
  //   if (modelRef.current && defaultMaterial) {
  //     // Restore the default material
  //     modelRef.current.traverse((child) => {
  //       if (child.isMesh) {
  //         child.material.copy(defaultMaterial);
  //       }
  //     });

  //     // Reset the default material
  //     setDefaultMaterial(null);
  //   }
  // };

  return (
    <group
      position={[10, 0, 0]}
      // onPointerOver={handlePointerOver}
      // onPointerOut={handlePointerOut}
    >
      <primitive
        ref={modelRef}
        object={gltf.scene}
        rotation={rotationInRadians}
      />
    </group>
  );
};

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
