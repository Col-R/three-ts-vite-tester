import React, { Suspense } from 'react'
import './App.css'
import styled from 'styled-components'

// import ThreeScene from './three/ThreeScene'
import Background from './components/Background';
import Text from './components/Text';
import Fiber_Three from './three/Fiber_Three';

import { Canvas} from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'


const App = () => {

  return (
    <div>
      <Wrapper className="App">
        <Background />
        <Text />

        <Canvas className = 'canvas'>
          
          <OrbitControls enableZoom={true}/>
          <ambientLight intensity={0.5} />
          <directionalLight position = {[-2, 5, 2]} intensity={0.5} color={0xffffff} castShadow={true}/>
            <Suspense fallback={null}>
              <Fiber_Three 
                geometry = {[1.5, 64, 64]}
                roughness={.3}
                opacity={.95}
                transparent={true}
                material={false}
                />
            </Suspense>
          
        </Canvas>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  canvas {
    height: 1000px;
  }
`;

export default App;