import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let startTime = Date.now()

//#region LOADING
const loadingManager = new THREE.LoadingManager();
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

//#endregion LOADING

//#region SCENE & RENDERER

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 4000);
camera.position.set(0,1,3)
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement)
//#endregion SCENE & RENDERER

//#region TEXTURE LOADING

const techdiffuse = new THREE.TextureLoader(loadingManager).load('img/textures/techHex.webp');

//#endregion

//#region MATERIALS

const techMaterial = new THREE.MeshStandardMaterial({
	map: techdiffuse,
	transparent: true,
	roughness: .3,
	opacity: .95,
	// bumpMap: worldbump,
	// bumpScale : .5,
	// precision: "highp",
	side: THREE.TwoPassDoubleSide
})


//#endregion MATERIALS

//#region GEOMETRY
const techgeometry = new THREE.SphereGeometry(1.5, 64, 64)
const sphereTech = new THREE.Mesh(techgeometry, techMaterial)
sphereTech.name = "techsphere"
sphereTech.position.set(0,0, -1);
scene.add(sphereTech)
//#endregion

//#region LIGHTS

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.castShadow = true;
dirLight.position.set(3, 1, 2).normalize();
scene.add(dirLight);

const amblight = new THREE.AmbientLight(0xffffff, 1.0)
scene.add(amblight)

//#endregion

//#region CONTROLS
const usingControl = true
var controls = new OrbitControls(camera, renderer.domElement);
if (usingControl) {

	controls.enableZoom = true;
	controls.enableRotate = true;
	controls.enablePan = true;
	controls.target.set(0, 0, 0);
}

//#endregion


animate()

function animate() {
	const currentTime = Date.now();
	const time = (currentTime - startTime);

	sphereTech.rotation.y = time / -100000;

	if (usingControl) {
		controls.update();
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}