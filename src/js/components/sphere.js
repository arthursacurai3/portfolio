import * as THREE from 'three'

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