import { Model } from "./Model";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

function ZoomIn() {
  const vec = new THREE.Vector3(0, 2, 0);
  return useFrame(({ camera }) => camera.position.lerp(vec, 0.1));
}
function App() {
  const [play, { stop }] = useSound("https://mrpmodel.vercel.app/skate.mp3");
  const [playIntro] = useSound("https://mrpmodel.vercel.app/intro.mp3");
  const [autoRotate, setAutoRotate] = useState(true);
  const orbitControlsRef = useRef();
  const canvasRef = useRef();
  const [zoomIn, setZoomIn] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleEnter = () => {
    setAutoRotate(false);
    setAutoRotate(false);
    if (orbitControlsRef.current) {
      console.log(orbitControlsRef.current);
      orbitControlsRef.current.setAzimuthalAngle(0);
      orbitControlsRef.current.setPolarAngle(0);
      setZoomIn(true);
    }
    setTimeout(() => {
      document.body.style.overflow = "visible";
      document.getElementById("modelcontainer").style.display = "none";
      document.getElementById("mrpmodel").style.display = "none";
    }, 1200);
  };

  return (
    <>
      <Canvas
        camera={{ position: [5, 5, 5], zoom: isMobile ? 0.65 : 1 }}
        ref={canvasRef}
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
        {zoomIn && <ZoomIn />}
        <OrbitControls
          autoRotate={autoRotate}
          enableZoom={false}
          ref={orbitControlsRef}
        />
        <ambientLight intensity={2} />

        <directionalLight position={[0, 10, 0]} intensity={3} />
        <directionalLight position={[10, -10, 10]} intensity={2} />
        <directionalLight position={[-10, -10, 10]} intensity={1} />

        {/*<OrbitControls />*/}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
      <button
        style={{
          position: "absolute",
          top: "60vh",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "0",
          cursor: "pointer",
          textAlign: "center",
          border: "1px solid #babfc3",
          padding: "11px 24px",
          minHeight: 44,
          minWidth: 44,
          color: "#202223",
          background: "rgba(255,255,255,0.3)",
          userSelect: "none",

          borderRadius: 4,
          fontWeight: 500,
          fontSize: 14,
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 0px 0px",
          ...(hover ? { background: "rgba(255,255,255,0.7)" } : {}),
        }}
        onClick={() => handleEnter()}
        onMouseEnter={() => {
          playIntro();
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      >
        ENTER
      </button>
    </>
  );
}

export default App;
