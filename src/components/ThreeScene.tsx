import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const ThreeScene = () => {
  const loadingManager = new THREE.LoadingManager()
  const [startTime, setStartTime] = useState(Date.now())
  const sceneRef = useRef({camera:null, scene:null, renderer:null});
  // defining this outside of the useEffects so its visible by both
  let sphereTech = new THREE.Mesh();
  const [usingControl, setUsingControl] = useState(true)
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();

  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  useEffect(() => {
    loadingManager.onStart = function (url) {
      console.log(`Started loading: ${url}`)
    }

    loadingManager.onProgress = function (url) {
      console.log(`Progress loading: ${url}`)
    }

    loadingManager.onLoad = function () {
      console.log(`FINISHED LOADING:`)
    }

    loadingManager.onError = function (url) {
      console.error(`Loading Error : ${url}`)
    }

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 4000
    )
    camera.position.set(0, 1, 3)

    // Typescript shenanigans: 
    // Maybe this is the fix?
    //https://www.designcise.com/web/tutorial/how-to-fix-useref-react-hook-cannot-assign-to-read-only-property-typescript-error


    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    
    // sceneRef.current = { camera, scene, renderer }

    const techdiffuse = new THREE.TextureLoader(loadingManager).load(
      'img/textures/techHex.webp'
    )

    const techMaterial = new THREE.MeshStandardMaterial({
      map: techdiffuse,
      transparent: true,
      roughness: 0.3,
      opacity: 0.95,
      side: THREE.TwoPassDoubleSide,
    })

    // GEOMETRY
    const techgeometry = new THREE.SphereGeometry(1.5, 64, 64)
    sphereTech = new THREE.Mesh(techgeometry, techMaterial)
    sphereTech.name = 'techsphere'
    sphereTech.position.set(0, 0, -1)
    scene.add(sphereTech)

    // LIGHTS
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight.castShadow = true
    dirLight.position.set(3, 1, 2).normalize()
    scene.add(dirLight)

    const amblight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(amblight)

    const usingControl = true
    
    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    if (usingControl) {
      controlsRef.current.enableZoom = true
      controlsRef.current.enableRotate = true
      controlsRef.current.enablePan = true
      controlsRef.current.target.set(0, 0, 0)
    }
    
    document.body.appendChild(renderer.domElement)
    // animate()
    
  }, [sceneRef])

  useEffect(() => {

    const { camera, scene} = sceneRef.current

    function animate() {
      const currentTime = Date.now()
      const time = currentTime - startTime
    
      sphereTech.rotation.y = time / -100000
    
      if (usingControl && controlsRef.current) {
        controlsRef.current.update()
      }
    
      rendererRef.render(scene, camera)

      requestAnimationFrame(animate)
    }
    return () => {
    }
    animate()
    }, [startTime])

return <div />
}

export default ThreeScene
