import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export function createFont(scene){
  const assetLoader = new FontLoader()
  console.log('here')
  assetLoader.load(
    '../../fonts/PoppinsLight_Regular.json', function (font){
      console.log('here2')
      const textGeometry = new TextGeometry('testing Hello World!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      })
      const textMesh = new THREE.Mesh(textGeometry,
        new THREE.MeshPhongMaterial({color: 0xeeeeee}),
        new THREE.MeshPhongMaterial({color: 0xbbbbbb}),
      )

      textMesh.castShadow = true
      console.log({textMesh})
      scene.add(textMesh)
      textMesh.position.y = 5
    }
  )
}