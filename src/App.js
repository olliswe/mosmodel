import { Model } from "./Model";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import useSound from "use-sound";

function App() {
  const [play, { stop }] = useSound("https://mrpmodel.vercel.app/skate.mp3");

  return (
    <Canvas
      camera={{ position: [5, 5, 5], zoom: 1 }}
      style={{ cursor: "move", height: "100%" }}
      onPointerDown={() => {
        play();
      }}
      onPointerUp={() => {
        stop();
      }}
      onMouseLeave={() => {
        stop();
      }}
    >
      <OrbitControls autoRotate={true} enableZoom={false} />
      <ambientLight intensity={2} />

      <directionalLight position={[0, 10, 0]} intensity={3} />
      <directionalLight position={[10, -10, 10]} intensity={2} />
      <directionalLight position={[-10, -10, 10]} intensity={1} />

      {/*<OrbitControls />*/}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

export default App;
