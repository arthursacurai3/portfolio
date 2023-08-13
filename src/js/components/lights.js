import * as THREE from 'three'

export function createLight(scene) {
  const ambientLight = new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  scene.add(directionalLight)
  directionalLight.position.set(0, 20, 22)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 3024
  directionalLight.shadow.mapSize.height = 3024

  const spotLight = new THREE.SpotLight(0xFFFFFF)
  scene.add(spotLight);
  spotLight.position.set(0, 150, 30)
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 5024;
  spotLight.shadow.mapSize.height = 5024;
  spotLight.angle = 0.1;
  spotLight.penumbra = 0.5
  spotLight.intensity = 6000


  return { spotLight, directionalLight, ambientLight }
}