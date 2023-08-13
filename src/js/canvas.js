import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { createSphere } from './components/sphere';
import { createPlane } from './components/plane';
import { createLight } from './components/lights';
import { datGuide } from './helpers/dat-gui';
import { models, createGlbSocialMedias } from './components/social-cards';
import { mouseHoverIntersections } from './events/hover';
import { createFont } from './components/text';

const facebookUrl = new URL('../assets/facebook.glb', import.meta.url)
const instagramUrl = new URL('../assets/instagram.glb', import.meta.url)
const linkedinUrl = new URL('../assets/linkedin.glb', import.meta.url)
const whatsUrl = new URL('../assets/whats.glb', import.meta.url)

let renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

createLight(scene)

// const axesHelper = new THREE.AxesHelper(10)
// scene.add(axesHelper)

// camera.position.z = 5
// camera.position.y = 2
camera.position.set(0, 5, 15)
camera.lookAt(0, 7, 0)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update() //chamar essa função sempre que houver update na posição da camera

const sphereRadius = 1.75
const tangSphereSocialCard = 2.25
const planeLevelY = 2
const sphereMesh = createSphere(scene, sphereRadius, [0, planeLevelY, 0])
const planeMesh = createPlane(scene)

console.log({ sphereMesh })
console.log(tangSphereSocialCard * Math.cos((45 * Math.PI) / 180))

const socialMediasObjs = [
  createGlbSocialMedias(whatsUrl, 'whats', scene, [tangSphereSocialCard, planeLevelY, 0], 90, 0.15, 0, 0.5),
  createGlbSocialMedias(linkedinUrl, 'linkedin', scene, [0, planeLevelY, -tangSphereSocialCard], 180, 0.25, 0, 0.5),
  createGlbSocialMedias(facebookUrl, 'facebook', scene, [-tangSphereSocialCard, planeLevelY, 0], 270),
  createGlbSocialMedias(instagramUrl, 'insta', scene, [0, planeLevelY, tangSphereSocialCard], 360, 0.20, 0, 0.5),
]

createFont(scene)

console.log(models)
// const faceCard1 = createSocialCards(scene, [-tangSphereSocialCard, planeLevelY, 0], 0xffff00, 90)
// const faceCard2 = createSocialCards(scene, [0, planeLevelY, tangSphereSocialCard], 0x00ff00, 180)
// const faceCard3 = createSocialCards(scene, [tangSphereSocialCard, planeLevelY, 0], 0x0000FF, 270)
// const faceCard4 = createSocialCards(scene, [0, planeLevelY, -tangSphereSocialCard], 0xffffff, 360)

const datGui = datGuide({
  sphereMesh
})

const rayCaster = new THREE.Raycaster()
const mousePosition = new THREE.Vector2()
let lastObjIntersected;

window.addEventListener('mousemove', (e) => {
  const mousePosX = e.clientX
  const mousePosY = e.clientY

  if (mousePosX > window.innerWidth) mousePosX = mousePosX - window.innerWidth
  if (mousePosY > window.window.innerHeight) mousePosY = mousePosY - window.window.innerHeight

  mousePosition.x = (mousePosX / window.innerWidth) * 2 - 1
  mousePosition.y = - (mousePosY / window.innerHeight) * 2 + 1
})


const clock = new THREE.Clock()
let normalizedRotation = 1
function animate(time) {
  for (let i = 0; i < models.length; i++) {
    if (models[i]) {
      models[i].rotateY(0.01)
    }
  }
  // if(normalizedRotation === 360){
  //   normalizedRotation = 1
  // }
  // faceCard.rotation.y = Math.PI / (180/normalizedRotation)
  // normalizedRotation++
  rayCaster.setFromCamera(mousePosition, camera)
  const intersects = rayCaster.intersectObject(scene, true)
  if (intersects && intersects.length > 0) {
    var object = intersects[0].object;

    if (object.parent.name === 'social-media') {
      if (!lastObjIntersected) {
        object.parent.position.y = 2.5
        lastObjIntersected = object
      } else if (object.parent.uuid !== lastObjIntersected.parent.uuid) {
        object.parent.position.y = 2.5
        if (lastObjIntersected.parent.name === 'social-media') {
          lastObjIntersected.parent.position.y = 2
        }
        lastObjIntersected = object
      }
    }
  }
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

// mouseHoverIntersections(scene, camera )


window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})