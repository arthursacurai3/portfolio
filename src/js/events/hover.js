import * as THREE from 'three'
var groupObjects = []

export function mouseHoverIntersections(scene, camera) {
  const rayCaster = new THREE.Raycaster()
  const mousePosition = new THREE.Vector2()
  let lastObjIntersected;

  window.addEventListener('mousemove', (e) => {
    const mousePosX = e.clientX
    const mousePosY = e.clientY

    if (mousePosX > window.innerWidth) mousePosX = mousePosX - window.innerWidth
    if (mousePosY > window.window.innerHeight) mousePosY = mousePosY - window.window.innerHeight

    mousePosition.x = (mousePosX / window.innerWidth) * 2 - 1
    mousePosition.y = - (mousePosY / window.innerHeight) * 2 + 1

    rayCaster.setFromCamera(mousePosition, camera)
    const intersects = rayCaster.intersectObject(scene, true)
    if (intersects && intersects.length > 0) {
      var object = intersects[0].object;

      if (object.parent.name === 'social-media') {
        if(!lastObjIntersected){
          object.parent.position.y = 2.5
          lastObjIntersected = object
        } else if(object.parent.uuid !== lastObjIntersected.parent.uuid){
          object.parent.position.y = 2.5
          if(lastObjIntersected.parent.name === 'social-media'){
            lastObjIntersected.parent.position.y = 2
          }
          lastObjIntersected = object
        }
      }
    }
  })
}

