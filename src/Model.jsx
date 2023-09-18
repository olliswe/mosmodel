/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/model.gltf --transform
Files: public/model.gltf [1.62MB] > model-transformed.glb [26.12KB] (98%)
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes } = useGLTF("/model-transformed.glb");
  return (
    <group {...props} dispose={null} scale={0.1}>
      <mesh
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        material-color={"#888888"}
        material-roughness={0.5}
        material-metalness={0.8}
      />
    </group>
  );
}

useGLTF.preload("/model-transformed.glb");
