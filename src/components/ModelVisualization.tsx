import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { Suspense, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";

import {
  EquirectangularReflectionMapping,
  Euler,
  PerspectiveCamera as PerspectiveCameraType,
} from "three";

const ModelVisualization = () => {
  const camera = useRef<PerspectiveCameraType | null>(null!);
  const controls = useRef<OrbitControlsImpl | null>(null!);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Canvas
        style={{
          height: "98vh",
          width: "98.2vw",
        }}
      >
        <PerspectiveCamera
          ref={camera}
          makeDefault={true}
          position={[5, 25, 50]}
        />
        <OrbitControls
          ref={controls}
          target={[0, 1, 0]}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={5} />
        {/* <gridHelper args={[100, 100]} /> */}

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
          <Model />
        </group>

        <Light />
        <Tween />
      </Canvas>
    </Suspense>
  );
};

export default ModelVisualization;

export const Model = () => {
  const { scene } = useThree();
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, "/untitled.glb");

  const texture = useLoader(RGBELoader, "/park_parking_1k.hdr");
  texture.mapping = EquirectangularReflectionMapping;
  //   scene.background = texture;
  scene.environment = texture;

  return (
    <group
      position={[0, 0, 0]}
      // onPointerOver={handlePointerOver}
      // onPointerOut={handlePointerOut}
    >
      <primitive ref={modelRef} object={gltf.scene} />
      <Box args={[23, 34, 0.2]} position={[0.5, 18, 5]}>
        <meshPhysicalMaterial
          roughness={0}
          metalness={0}
          transmission={1}
          ior={2.33}
        />
      </Box>

      {/* <mesh position={[20, 20, 20]}>
        <sphereGeometry args={[20, 500, 500]} />
        <meshPhysicalMaterial
          roughness={0}
          metalness={0}
          transmission={1}
          //   color={"red"}
        />
      </mesh> */}
      {/* <mesh>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial
          roughness={0}
          metalness={0.5}
          //   color={"#00ff00"}
          envMap={texture}
        />
      </mesh> */}
    </group>
  );
};

const Light = () => {
  const reactAreaLight = useRef(null);
  useHelper(reactAreaLight, RectAreaLightHelper);

  const euler = new Euler(0, 0, 0, "XYZ");
  euler.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);

  return (
    <>
      <rectAreaLight
        position={[0.5, 18, 4]}
        width={23}
        height={35}
        intensity={15}
        color={"#0000ff"}
        ref={reactAreaLight}
      />
    </>
  );
};

function Tween() {
  useFrame(() => {
    TWEEN.update();
  });
  return null;
}
