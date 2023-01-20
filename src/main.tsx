import React from 'react'
import ReactDOM from 'react-dom/client'
import {Canvas} from '@react-three/fiber'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <h1>Test</h1>
    <Canvas>

      <App position={[-1.2,0,0]}/>
      <App position={[2.2,0,0]}/>
      <App position={[2.2,-3,0]}/>
      <App position={[2.2,3,0]}/>

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

    </Canvas>
  </React.StrictMode>,
)
