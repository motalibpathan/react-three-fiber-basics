import { useHelper } from "@react-three/drei";
import { MutableRefObject } from "react";
import * as THREE from "three";

interface CameraHelperProps {
  camera: MutableRefObject<THREE.Object3D>;
}

export const CameraHelper: React.FC<CameraHelperProps> = ({ camera }) => {
  useHelper(camera, THREE.CameraHelper);
  return null;
};
