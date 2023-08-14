import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { createSphere } from './components/webgl/sphere';
import { createPlane } from './components/webgl/plane';
import { createLight } from './components/webgl/lights';
import { datGuide } from './helpers/dat-gui';
import { models, createGlbSocialMedias } from './components/webgl/social-cards';
import { socialMediaInfos } from '../js/components/webgl/text';
import { createFocusLight } from './components/webgl/focus-light';

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

// const planeHelper = new THREE.GridHelper(25,25, 0xffffff)
// planeHelper.rotation.y = -0.5 * Math.PI
// planeHelper.position.y = 0.1
// planeHelper.position.x = -0.5
// scene.add(planeHelper)

// camera.position.z = 5
// camera.position.y = 2
camera.position.set(0, 5, 15)
camera.lookAt(0, 6.5, 0)

// const orbit = new OrbitControls(camera, renderer.domElement)
// orbit.update() //chamar essa função sempre que houver update na posição da camera

const sphereRadius = 1.75
const tangSphereSocialCard = 2.25
const planeLevelY = 2
const sphereMesh = createSphere(scene, sphereRadius, [0, planeLevelY, 0])
const planeMesh = createPlane(scene)

const { cardParent, textMesh } = [
  createGlbSocialMedias(whatsUrl, 'whats', scene, [tangSphereSocialCard, planeLevelY, 0], 90, 0.15, 0, 0.5, "+55(11)93009-4808"),
  createGlbSocialMedias(linkedinUrl, 'linkedin', scene, [0, planeLevelY, -tangSphereSocialCard], 180, 0.25, 0, 0.5, "arthur-sacurai-48169ab4"),
  createGlbSocialMedias(facebookUrl, 'facebook', scene, [-tangSphereSocialCard, planeLevelY, 0], 270, 0, 0, 0, "arthur.sacurai"),
  createGlbSocialMedias(instagramUrl, 'insta', scene, [0, planeLevelY, tangSphereSocialCard], 360, 0.20, 0, 0.5, "@arthursacurai"),
]

const groupSocialText = new THREE.Group()
groupSocialText.add([cardParent, textMesh])
console.log({ groupSocialText })

// const datGui = datGuide({
//   sphereMesh
// })
const focusLight = createFocusLight(scene)

const rayCaster = new THREE.Raycaster()
const mousePosition = new THREE.Vector2()
let lastObjIntersected = {};
var hightlightObj;

window.addEventListener('mousemove', (e) => {
  const mousePosX = e.clientX
  const mousePosY = e.clientY

  if (mousePosX > window.innerWidth) mousePosX = mousePosX - window.innerWidth
  if (mousePosY > window.window.innerHeight) mousePosY = mousePosY - window.window.innerHeight

  mousePosition.x = (mousePosX / window.innerWidth) * 2 - 1
  mousePosition.y = - (mousePosY / window.innerHeight) * 2 + 1
})

const clock = new THREE.Clock()
let rotationEnabled = true

function animate(time) {
  for (let i = 0; i < models.length; i++) {
    if (models[i] && rotationEnabled) {
      models[i].rotateY(0.01)
    }
  }
  if (hightlightObj) {
    hightlightObj.position.y = 2 + 0.75 * Math.abs(Math.sin(time / 700))
  }

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

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})