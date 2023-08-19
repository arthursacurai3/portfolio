import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export function createPhysPlane(world){
  const groundBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    type: CANNON.Body.STATIC
  })
  world.addBody(groundBody)
  return groundBody
}

export function createPlane(scene){
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(500,500,20,20),
    new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0,
      reflectivity: 1,
      clearcoat: 1,
      // vertexColors: true,
    })
  )
  planeMesh.rotation.x = -0.5 * Math.PI
  planeMesh.receiveShadow = true
  planeMesh.name = 'plane'
  scene.add(planeMesh)
  return planeMesh
}