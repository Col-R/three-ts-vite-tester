import React, {useRef} from 'react'
import { useFrame, useLoader  } from '@react-three/fiber'
import { Mesh } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import texture from '../assets/techHex.webp'

interface Fiber_ThreeProps {
  geometry: [number, number, number],
  roughness: number,
  opacity: number,
  transparent: boolean,
  material: boolean
}

const Fiber_Three: React.FC<Fiber_ThreeProps> = (props) => {
  const map = useLoader(TextureLoader, texture)
  const ref = useRef<Mesh>(null!)
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    ref.current.rotation.y = time/4;
  })

  return (
    <mesh ref={ref} scale={1}>
      <sphereGeometry args={props.geometry} />
      
      <meshStandardMaterial 
        map={map}
        transparent={props.transparent}
        roughness={props.roughness}
        opacity={props.opacity}
      />

    </mesh>
  )
}

export default Fiber_Three