import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { createPhysSphere, createSphere } from './components/webgl/sphere';
import { createPhysPlane, createPlane } from './components/webgl/plane';
import { createLight } from './components/webgl/lights';
import { datGuide } from './helpers/dat-gui';
import { models, createGlbSocialMedias } from './components/webgl/social-cards';
import { socialMediaInfos } from '../js/components/webgl/text';
import { createFocusLight } from './components/webgl/focus-light';
import { playing } from './events/body-mutation';
import { carModel, createCar, createCarPhys, loadDone } from './components/webgl/car';
import CannonDebugger from 'cannon-es-debugger';

const facebookUrl = new URL('../assets/facebook.glb', import.meta.url)
const instagramUrl = new URL('../assets/instagram.glb', import.meta.url)
const linkedinUrl = new URL('../assets/linkedin.glb', import.meta.url)
const whatsUrl = new URL('../assets/whats.glb', import.meta.url)
const carUrl = new URL('../assets/car.gltf', import.meta.url)

let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap

renderer.setSize(window.screen.availWidth, window.screen.availHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

export const camera = new THREE.PerspectiveCamera(
  60,
  window.screen.availWidth / window.screen.availHeight,
  0.1,
  1000
)

createLight(scene)

// const axesHelper = new THREE.AxesHelper(10)
// scene.add(axesHelper)

// const planeHelper = new THREE.GridHelper(25,25, 0xffffff)
// planeHelper.rotation.y = -0.5 * Math.PI
// planeHelper.position.y = 0.1
// planeHelper.position.x = -0.5
// scene.add(planeHelper)

// camera.position.z = 5
// camera.position.y = 2
if(window.screen.availWidth > 767){
  camera.position.set(0, 5, 15)
  camera.lookAt(0, 6.5, 0)
} else {
  camera.position.set(0, 5, 20)
  camera.lookAt(0, 9, 0)
}

const threeObjs = {}

// const focusLight = createFocusLight(scene)

const sphereRadius = 1.75
const tangSphereSocialCard = 2.25
const planeLevelY = 2

threeObjs.sphereMesh = createSphere(scene, sphereRadius, [0, planeLevelY, 0])
threeObjs.planeMesh = createPlane(scene)

export function loadSocialCards(){
  createGlbSocialMedias(whatsUrl, 'whats', scene, [tangSphereSocialCard, planeLevelY, 0], 90, 0.15, 0, 0.5, "+55(11)93009-4808")
  createGlbSocialMedias(linkedinUrl, 'linkedin', scene, [0, planeLevelY, -tangSphereSocialCard], 180, 0.25, 0, 0.5, "arthur-sacurai-48169ab4")
  createGlbSocialMedias(facebookUrl, 'facebook', scene, [-tangSphereSocialCard, planeLevelY, 0], 270, 0, 0, 0, "arthur.sacurai")
  createGlbSocialMedias(instagramUrl, 'insta', scene, [0, planeLevelY, tangSphereSocialCard], 360, 0.20, 0, 0.5, "@arthursacurai")
}

loadSocialCards()

// const groupSocialText = new THREE.Group()
// groupSocialText.add([cardParent, textMesh])

// const datGui = datGuide({
//   threeObjs.sphereMesh
// })


let lastObjIntersected = {};
var hightlightObj;

let rotationEnabled = true
const world = new CANNON.World()
const worldParams = {
  gravity: new CANNON.Vec3(0, -9.81, 0),
}

const rayCaster = new THREE.Raycaster()
const mousePosition = new THREE.Vector2()

const timeStep = 1 / 60
const clock = new THREE.Clock()

window.addEventListener('mousemove', (e) => {
  const mousePosX = e.clientX
  const mousePosY = e.clientY

  if (mousePosX > window.screen.availWidth) mousePosX = mousePosX - window.screen.availWidth
  if (mousePosY > window.window.screen.availHeight) mousePosY = mousePosY - window.window.screen.availHeight

  mousePosition.x = (mousePosX / window.screen.availWidth) * 2 - 1
  mousePosition.y = - (mousePosY / window.screen.availHeight) * 2 + 1
})

const cannonDebugger = new CannonDebugger(scene, world)

const actualCarValues = {
  velocity: 0,
  aceleration: 0,
  direction: 1,
  velocityX: 0,
  velocityY: 0,
  velocityZ: 0,
  turn: 0,
}

const carForces = {
  aceleration: 2,
  brake: 5,
  maxVelocity: 50,
  maxReverseVelocity: -5,
  velocityDecrease: 0.00001,
  turn: (actualCarValues.velocity < 1 ? 10 : 10 / actualCarValues.velocity )
}

// preciso saber o angulo em relação ao eixo z que rotaciona em y
// 0° x= 0 z = 1
// max 

function joystick(){
  window.addEventListener('keydown', (e) => {
    console.log({keydownww: e.key})
    if(e.key === 'ArrowUp'){
      if(actualCarValues.direction === 1 && actualCarValues.velocity <= carForces.maxVelocity){
        actualCarValues.velocity += carForces.aceleration
      } else if(actualCarValues.velocity < 0){
        actualCarValues.velocity += carForces.brake
      }
    }
    if(e.key === 'ArrowDown'){
      if(actualCarValues.direction === 1 && actualCarValues.velocity  >= 0){
        actualCarValues.velocity -= carForces.brake
      } else if(actualCarValues.velocity  <= 0 &&  actualCarValues.velocity >= carForces.maxReverseVelocity){
        actualCarValues.velocity += carForces.brake
      }
    }

    if(e.key === 'ArrowLeft' && actualCarValues.velocity !==0){
      worldObjs.carBody.angularVelocity.set(0, carForces.turn, 0)
    }

    if(e.key === 'ArrowRight' && actualCarValues.velocity !==0){
      worldObjs.carBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0) ,carForces.turn * Math.PI )
    }

    worldObjs.carBody.velocity.set(0,0,actualCarValues.velocity)
    console.log(worldObjs.carBody)
  })
}

function animate(time) {
  for (let i = 0; i < models.length; i++) {
    if (models[i] && rotationEnabled) {
      models[i].rotateY(0.01)
    }
  }

  raysIntersections()

  if (hightlightObj) {
    hightlightObj.position.y = 2 + 0.75 * Math.abs(Math.sin(time / 700))
  }

  if (playing && setupReady && loadDone) {
    cannonDebugger.update()

    world.step(timeStep)

    threeObjs.planeMesh.position.copy(worldObjs.groundBody.position)
    threeObjs.planeMesh.quaternion.copy(worldObjs.groundBody.quaternion)

    threeObjs.sphereMesh.position.copy(worldObjs.sphereBody.position)
    threeObjs.sphereMesh.quaternion.copy(worldObjs.sphereBody.quaternion)

    carModel.position.copy(worldObjs.carBody.position)
    carModel.quaternion.copy(worldObjs.carBody.quaternion)
    console.log(actualCarValues.velocity)
  }
  renderer.render(scene, camera)
}

const worldObjs = {}
let setupReady = false

export let orbitControls;

export function setupPhysWorld() {
  world.gravity = worldParams.gravity

  worldObjs.groundBody = createPhysPlane(world)
  worldObjs.groundBody.quaternion.setFromEuler(-0.5 * Math.PI, 0, 0)

  worldObjs.sphereBody = createPhysSphere(world, sphereRadius, [0, planeLevelY, 0])

  setTimeout(() => {
    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.update() //chamar essa função sempre que houver update na posição da camera
    // const followCam = new THREE.Object3D()
    // followCam.position.copy(camera.position)
    // scene.add(followCam)
    // followCam.parent = worldObjs.carBody.threemesh
    // followCam.parent = worldObjs.carBody.threemesh
    createCar(carUrl,scene)
    worldObjs.carBody = createCarPhys(world,scene)
    for(let i = 0; i < models.length; i++){
      models[i].parent.remove(models[i])
      let socialMedia = socialMediaInfos[models[i].children[0].userData.socialMediaName]
      socialMedia.parent.remove(socialMedia)
    }
    setupReady = true
    joystick()
  }, 1500)
}

function raysIntersections() {
  rayCaster.setFromCamera(mousePosition, camera)
  const intersects = rayCaster.intersectObject(scene, true)
  if (intersects && intersects.length > 0) {
    var object = intersects[0].object;
    if (object.parent.name === 'social-media') {
      rotationEnabled = false
      if (!lastObjIntersected.obj) {
        socialMediaInfos[`${object.parent.userData.socialMediaName}`].material.visible = true
        lastObjIntersected.obj = object
        lastObjIntersected.objText = socialMediaInfos[`${object.parent.userData.socialMediaName}`]

        hightlightObj = object.parent
      } else if (object.parent.uuid !== lastObjIntersected.obj.parent.uuid) {
        hightlightObj = object.parent
        socialMediaInfos[`${object.parent.userData.socialMediaName}`].material.visible = true
        if (lastObjIntersected.obj.parent.name === 'social-media') {
          lastObjIntersected.obj.parent.position.y = 2
        }
        lastObjIntersected.objText.material.visible = false
        lastObjIntersected.obj = object
        lastObjIntersected.objText = socialMediaInfos[`${object.parent.userData.socialMediaName}`]
      }
    } else {
      rotationEnabled = true
    }
  }
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
  camera.aspect = window.screen.availWidth / window.screen.availHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.screen.availWidth, window.screen.availHeight)
})