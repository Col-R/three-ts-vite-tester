import React from 'react'
import './App.css'

import ThreeScene from './components/ThreeScene'

const App = () => {

  return (
    <div>
      <canvas className='webgl'></canvas>
      <ThreeScene />
    </div>
  )
}
export default App;