import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Instances, Instance, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'

export default function Bubbles() {


    extend({ EffectComposer, RenderPass, UnrealBloomPass })

    function Sphere({ geometry, x, y, z, s, color, int }) {
        const ref = useRef()
        useFrame((state) => {
            ref.current.position.x = x - (state.clock.getElapsedTime() * int) 
            ref.current.position.y = y - state.clock.getElapsedTime() * int
            ref.current.position.z = z - Math.sin((state.clock.getElapsedTime() + int) )
            ref.current.position.x = x + (state.clock.getElapsedTime() * int)

        })
        return (
            <mesh ref={ref} position={[x, y, z]} scale={[s, s, s]} geometry={geometry}>
            <meshStandardMaterial color={color} roughness={0} />
          </mesh>
        )
    }

    function RandomSpheres({ color, amount, startSize }) {
        const [geometry] = useState(() => new THREE.SphereGeometry(startSize, 65, 65), [])
        const data = useMemo(() => {
            return new Array(amount).fill().map((_, i) => ({
                x: Math.random() * 150 - 50,
                y: Math.random() * 150 - 50,
                z: Math.random() * 150 - 150,
                s: Math.random() + 5,
            }))
        }, [])
        return data.map((props, i) => <Sphere key={i} {...props} geometry={geometry} color={color} int={Math.floor(Math.random() * 5)} />)
    }

    function Main({ children }) {
        const scene = useRef()
        const { gl } = useThree()
        const width = window.innerWidth;
        const height = window.innerHeight;
         const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);

        useFrame(() => {
            gl.autoClear = false
            gl.clearDepth()
            gl.render(scene.current, camera)
        }, 2)
        return <scene ref={scene}>{children}</scene>
    }


    return (
        <Canvas linear camera={{ position: [0, 0, 120] }} style={{position: "fixed", zIndex: -2, background: 'linear-gradient(155deg, #ffffff 20%, #a5a3a3)', top: 0 }}>
            <Main>
                {/* <fog attach="fog" args={["rgba(216, 222, 255)", 0, 40]} /> */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    position={[2.5, 8, 5]}
                    intensity={2.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={150}
                    shadow-camera-left={-110}
                    shadow-camera-right={110}
                    shadow-camera-top={110}
                    shadow-camera-bottom={-110}
                />
                <pointLight position={[-10, 0, -20]} color="rgba(255, 144, 225)" intensity={0.5} />
                <pointLight position={[0, -10, 0]} intensity={1.5} />
                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>
                <ContactShadows position={[0, -30, 0]} opacity={0.5} width={130} height={130} blur={2} far={40} />
                <RandomSpheres color="rgba(54, 116, 255)" amount={100} startSize={1} />
                <RandomSpheres color="rgba(54, 255, 182)" amount={150} startSize={1} />
                <RandomSpheres color="rgba(255, 94, 219)" amount={100} startSize={0.5} />
            </Main>
        </Canvas>
    )
}