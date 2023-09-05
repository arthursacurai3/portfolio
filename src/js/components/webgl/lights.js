import * as THREE from 'three'

export function createLight(scene) {
  const ambientLight = new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  scene.add(directionalLight)
  directionalLight.position.set(0, 5, 6)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2024
  directionalLight.shadow.mapSize.height = 2024

  const spotLight = new THREE.SpotLight(0xFFFFFF)
  scene.add(spotLight);
  spotLight.position.set(0, 100, 30)
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2024;
  spotLight.shadow.mapSize.height = 2024;
  spotLight.angle = 0.1;
  spotLight.penumbra = 0.8
  spotLight.intensity = 10000

  // const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  // scene.add(spotLightHelper)

  return { spotLight, directionalLight, ambientLight }
}