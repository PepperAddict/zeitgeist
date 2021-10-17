import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Instances, Instance, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'

export default function Bubbles() {


    extend({ EffectComposer, RenderPass, UnrealBloomPass })

    function Sphere({ geometry, x, y, z, s, color }) {
        const ref = useRef()
        useFrame((state) => {
            ref.current.position.x = x - state.mouse.x * 2
            ref.current.position.y = y - state.mouse.y * 2
            ref.current.position.z = z - Math.sin((state.clock.getElapsedTime() * s))
        })
        return (
            <mesh ref={ref} position={[x, y, z]} scale={[s, s, s]} geometry={geometry} receiveShadow castShadow>
                <sphereBufferGeometry args={[1, 32, 32]} />
                <meshStandardMaterial roughness={0.1} color={color} />

            </mesh>
        )
    }

    function RandomSpheres({ color, amount, startSize }) {
        const [geometry] = useState(() => new THREE.SphereGeometry(startSize, 25, 25), [])
        const data = useMemo(() => {
            return new Array(amount).fill().map((_, i) => ({
                x: Math.random() * 150 - 50,
                y: Math.random() * 150 - 50,
                z: Math.random() * 150 - 50,
                s: Math.random() + 2,
            }))
        }, [])
        return data.map((props, i) => <Sphere key={i} {...props} geometry={geometry} color={color} />)
    }

    function Main({ children }) {
        const scene = useRef()
        const { gl } = useThree()
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
        useFrame(() => {
            gl.autoClear = false
            gl.clearDepth()
            gl.render(scene.current, camera)
        }, 2)
        return <scene ref={scene}>{children}</scene>
    }


    return (
        <Canvas linear camera={{ position: [0, 0, 120] }}>
            <Main>
                <fog attach="fog" args={["white", 0, 40]} />
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    position={[2.5, 8, 5]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
                <pointLight position={[0, -10, 0]} intensity={1.5} />

                <EffectComposer multisampling={0}>
                    <SSAO samples={131} radius={10} intensity={50} luminanceInfluence={1} color="red" />
                </EffectComposer>
                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>
                <ContactShadows position={[0, -30, 0]} opacity={0.5} width={130} height={130} blur={2} far={40} />
                <RandomSpheres color="white" amount={100} startSize={1} />
                <RandomSpheres color="rgba(255, 144, 225)" amount={50} startSize={1} />
                <RandomSpheres color="rgba(20, 202, 255)" amount={100} startSize={0.5} />
            </Main>
        </Canvas>
    )
}