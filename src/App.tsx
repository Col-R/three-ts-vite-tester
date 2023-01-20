import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'
import { Mesh } from 'three'

const App = (props) => {
  const [hovered, hover] = React.useState(false)
  const ref = React.useRef<Mesh>(null!)

  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="techdiffuse" />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
export default App;