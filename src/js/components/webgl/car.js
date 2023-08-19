import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'



const loadingManager = new THREE.LoadingManager()
export let loadDone = false
loadingManager.onLoad = ()=> {
  console.log('here')
  loadDone = true
}

export function createCarPhys(world,scene){
  const carBody = new CANNON.Body({
    mass: 50
  })
  const size = 0.45
  const newshape = new CANNON.Box(new CANNON.Vec3(size*2,size,size))
  carBody.addShape(newshape, new CANNON.Vec3(0,size,size*2.5))
  carBody.addShape(newshape, new CANNON.Vec3(0,size,size/2))
  carBody.addShape(newshape, new CANNON.Vec3(0,size,-size*1.5))
  carBody.addShape(newshape, new CANNON.Vec3(0,size,-size*3))
  carBody.addShape(newshape, new CANNON.Vec3(0,size*2.8,-size*2.5))
  carBody.addShape(newshape, new CANNON.Vec3(0,size*2.8,-size))
  carBody.addShape(newshape, new CANNON.Vec3(0,size*1.5,size*0.6))

  // carBody.linearDamping = 1
  world.addBody(carBody)
  
  console.log(carBody)
  return carBody
}

export let carModel;
const assetLoader = new GLTFLoader(loadingManager)
export function createCar(fileUrl, scene){
  let carParent;
  assetLoader.load(fileUrl.href, function (gltf){
    carModel = gltf.scene
    // carModel.scale.set(0.5,0.5,0.5)
    carParent = new THREE.Object3D()
    carParent.add(carModel)

    scene.add(carParent)

    carModel.traverse(function(node) {
      if(node.isMesh){
        node.castShadow = true
        node.receiveShadow = true
      }
    })
    const axisHelper = new THREE.AxesHelper(5)
    carModel.add(axisHelper)

  }, undefined, function(error){
    console.error(error)
  })
}