import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './mapComponent'
import GeolocationComponent from './geolocationComponent'
import ImageUpload from './injuryDetection'

function App() {
  return(
    <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* <MapComponent /> */}
      {/* <GeolocationComponent/> */}
      <ImageUpload/>
    </div>
  )
  
  
}

export default App
