import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export function createPhysSphere(world, sphereRadius, position){
  const sphereBody = new CANNON.Body({
    mass: 10,
    shape: new CANNON.Sphere(sphereRadius),
    position: new CANNON.Vec3(...position),
    linearDamping: 0.5,
  })
  world.addBody(sphereBody)

  return sphereBody
}

export function createSphere(scene, sphereRadius, position){
  const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(sphereRadius),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.1,
      envMap: true
    })
  )
  sphereMesh.position.set(...position)
  sphereMesh.castShadow = true
  sphereMesh.receiveShadow = true
  sphereMesh.name = 'sphere'
  scene.add(sphereMesh)
  return sphereMesh
}