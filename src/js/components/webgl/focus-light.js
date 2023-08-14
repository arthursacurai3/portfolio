import * as THREE from 'three'

export function updateFocusLight(scene, focusLight, object = null){
  if (object !== null) {
    focusLight.position = object
    focusLight.quaternion.copy(object.quaternion)
    const focusLightHelper = new THREE.SpotLightHelper(focusLight)
    focusLightHelper.position.copy(object.position)
    scene.add(focusLightHelper)
  }
}

export function createFocusLight(scene) {

  const focusLight = new THREE.SpotLight(0xFFFFFF)

  focusLight.castShadow = true;
  focusLight.shadow.mapSize.width = 240;
  focusLight.shadow.mapSize.height = 240;
  focusLight.angle = 0.5;
  focusLight.penumbra = 0.8
  focusLight.intensity = 100
  scene.add(focusLight)

  return focusLight
}