import { useGLTF } from "@react-three/drei";

export const Floor = () => {
  const { nodes } = useGLTF("/floor.GLB");

  return (
    <group>
      <primitive object={nodes.Default} />
      <primitive object={nodes.mesh} />
    </group>
  );
};
