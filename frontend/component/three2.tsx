import * as THREE from 'three'
import { render } from 'react-dom'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'


extend({ EffectComposer, RenderPass, UnrealBloomPass })

function Sphere({ geometry, x, y, z, s, color }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.x = x - state.mouse.x * 2
    ref.current.position.y = y - state.mouse.y * 2
    ref.current.position.z = z + Math.sin((state.clock.getElapsedTime() * s) / 2)
  })
  return (
    <mesh ref={ref} position={[x, y, z]} scale={[s, s, s]} geometry={geometry} color={color} >
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  )
}

function RandomSpheres({color, amount, startSize}) {
  const [geometry] = useState(() => new THREE.SphereGeometry(startSize, 32, 32), [])
  const data = useMemo(() => {
    return new Array(amount).fill().map((_, i) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      s: Math.random() + 10,
    }))
  }, [])
  return data.map((props, i) => <Sphere key={i} {...props} geometry={geometry} color={color} />)
}

function Bloom({ children }) {
  const { gl, camera, size } = useThree()
  const [scene, setScene] = useState()
  const composer = useRef()
  useEffect(() => void scene && composer.current.setSize(size.width, size.height), [size])
  useFrame(() => scene && composer.current.render(), 1)
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
      </effectComposer>
    </>
  )
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
export default function Dots() {
    return(
          <Canvas linear camera={{ position: [0, 0, 120] }}>
    <Main>
      <pointLight />
      <ambientLight />
      <RandomSpheres color="rgba(20, 202, 255)" amount={100} startSize={0.5} />
    </Main>
    <Bloom>
      <ambientLight />
      <RandomSpheres color="rgba(20, 202, 255)" amount={100} startSize={0.5} />
    </Bloom>
  </Canvas>
    )
}
