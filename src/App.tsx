import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { Suspense, useRef } from "react";
import {
  PerspectiveCamera as PerspectiveCameraType,
  TextureLoader,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import "./App.css";

import * as THREE from "three";
import { Rack } from "./Rack";
import { Switch } from "./components/Switch";

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

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas>
          <PerspectiveCamera ref={camera} makeDefault position={[5, 10, 25]} />
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

            <Rack position={[0, 0, 0]} text="AA" type="server" />
            <Rack position={[2, 0, 0]} text="AB" type="switch" />
            <Rack position={[-2.2, 0, 0]} text="AC" type="server" />
            <Rack position={[-4.4, 0, 0]} text="AD" type="server" />
            <Rack position={[-6.6, 0, 0]} text="AE" type="server" />

            <Switch position={[2.75, 2, -0.75]} size={[0.01, 0.2, 1.3]} />
            <Switch position={[1, 2.3, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 2.6, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 2.9, -1]} size={[0.01, 0.2, 1.8]} />

            <Switch position={[1, 4, -1]} size={[0.01, 0.2, 1.8]} />
            <Switch position={[1, 3.7, -1]} size={[0.01, 0.2, 1.8]} />
            <Model />
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

const Model = () => {
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

useGLTF.preload("/diva_24_32.glb");

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
