import * as THREE from 'three'

export function createPlane(scene){
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(500,500,20,20),
    new THREE.MeshStandardMaterial({
      color: 0x333333,
      side: THREE.DoubleSide
    })
  )
  planeMesh.rotation.x = -0.5 * Math.PI
  planeMesh.receiveShadow = true
  planeMesh.name = 'plane'
  scene.add(planeMesh)
  return planeMesh
}