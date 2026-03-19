"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const particleCount = 7000;
const baseColor1 = new THREE.Color(0xffffff);
const baseColor2 = new THREE.Color(0x73a8ff);
const newColor1 = new THREE.Color(0xff2a45);
const newColor2 = new THREE.Color(0x8a2be2);

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes, randomSeeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randomSeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
       const r = 800 * Math.sqrt(Math.random()) + 20; 
       const theta = Math.random() * 2 * Math.PI;
       
       positions[i * 3] = r * Math.cos(theta);
       positions[i * 3 + 1] = r * Math.sin(theta);
       positions[i * 3 + 2] = (Math.random() - 0.5) * 8000;

       randomSeeds[i] = Math.random();
       
       const mixedColor = baseColor1.clone().lerp(baseColor2, randomSeeds[i]);
       colors[i * 3] = mixedColor.r;
       colors[i * 3 + 1] = mixedColor.g;
       colors[i * 3 + 2] = mixedColor.b;

       sizes[i] = Math.random() * 2 + 1;
    }
    return { positions, colors, sizes, randomSeeds };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.0003;
      pointsRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.05;
    }
  });

  useEffect(() => {
    const points = pointsRef.current;
    if (!points) return;

    // To prevent rapid GC, define objects cleanly outside the loop if possible
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(points.position, {
             z: self.progress * 6000,
             duration: 1.5,
             ease: "power2.out",
             overwrite: "auto"
          });
          
          const colorsAttribute = points.geometry.attributes.color as THREE.BufferAttribute;
          if (self.progress > 0.4) {
             const p = Math.min(Math.max((self.progress - 0.4) / 0.4, 0), 1);
             for (let i = 0; i < particleCount; i++) {
                const origMixed = baseColor1.clone().lerp(baseColor2, randomSeeds[i]);
                const newMixed = newColor1.clone().lerp(newColor2, randomSeeds[i]);
                const finalColor = origMixed.clone().lerp(newMixed, p);
                colorsAttribute.setXYZ(i, finalColor.r, finalColor.g, finalColor.b);
             }
             colorsAttribute.needsUpdate = true;
          } else {
             for (let i = 0; i < particleCount; i++) {
                const mixedColor = baseColor1.clone().lerp(baseColor2, randomSeeds[i]);
                colorsAttribute.setXYZ(i, mixedColor.r, mixedColor.g, mixedColor.b);
             }
             colorsAttribute.needsUpdate = true;
          }
        }
      });
    });

    return () => ctx.revert();
  }, [randomSeeds]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial 
        size={2} 
        vertexColors 
        transparent 
        opacity={0.9} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-black">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 4000 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <fogExp2 attach="fog" args={[0x000000, 0.0008]} />
        <Starfield />
      </Canvas>
    </div>
  );
}
