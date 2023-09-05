import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { createText } from './text';

const assetLoader = new GLTFLoader()

export const models = []

export function createGlbSocialMedias(fileUrl,name, scene, position, rotation, translateX = 0, translateY = 0, translateZ = 0, text, fontSize){
  let cardParent;
  assetLoader.load(fileUrl.href, function (gltf){
    const model = gltf.scene
    model.position.set(...position)
    model.translateX = translateX
    model.rotation.y = (rotation*Math.PI)/180
    model.scale.set(0.5,0.5,0.5)
    cardParent = new THREE.Object3D()
    cardParent.add(model)

    createText(scene, text,fontSize, name, translateX = 0, translateY = 0, translateZ = 0)
    cardParent.children.forEach(child => {
      child.name = 'social-media'
      child.userData.socialMediaName = name
    })
    models.push(cardParent)
    scene.add(cardParent)
    model.traverse(function(node) {
      if(node.isMesh){
        node.castShadow = true
        node.name = name
        
        node.position.x += translateX
        node.position.y += translateY
        node.position.z += translateZ
      }
    })
    // const axisHelper = new THREE.AxesHelper()
    // model.add(axisHelper)

    // const gridHelper = new THREE.GridHelper(3,3,5,5)
    // model.add(gridHelper)
    // console.log(model)
  }, undefined, function(error){
    console.error(error)
  })
}